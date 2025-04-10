package feishu

import (
	"context"
	"cscd-bds/store/ent"
	"cscd-bds/store/ent/customerprofile"
	"cscd-bds/store/ent/schema/xid"
	"cscd-bds/store/ent/tenderprofile"
	"cscd-bds/store/ent/user"
	"fmt"
	"time"

	larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
	"github.com/larksuite/oapi-sdk-go/v3/event/dispatcher"
	"github.com/larksuite/oapi-sdk-go/v3/event/dispatcher/callback"
	larkws "github.com/larksuite/oapi-sdk-go/v3/ws"
)

func (f *Feishu) StartWSClient(ctx context.Context) {
	eventHandler := dispatcher.NewEventDispatcher("", "").
		// 监听「卡片回传交互 card.action.trigger」
		OnP2CardActionTrigger(func(ctx context.Context, event *callback.CardActionTriggerEvent) (*callback.CardActionTriggerResponse, error) {
			fmt.Printf("[ OnP2CardActionTrigger access ], data: %s\n", larkcore.Prettify(event))

			if ac, ok := event.Event.Action.Value["action"].(string); ok {
				var (
					templateId   string
					templateVars map[string]any
				)
				switch ac {
				case "approve_tender":
					tenderId, ok := event.Event.Action.Value["tender_id"].(string)
					if !ok {
						return nil, fmt.Errorf("tender id is not found")
					}
					approver, err := f.store.User.Query().Where(user.OpenID(event.Event.Operator.OpenID)).Only(ctx)
					if err != nil {
						return nil, err
					}

					tp, err := f.store.TenderProfile.UpdateOneID(xid.ID(tenderId)).SetApprovalStatus(2).SetApprover(approver).SetApprovalDate(time.Now()).Save(ctx)
					if err != nil {
						return nil, err
					}
					if err := f.store.Tender.UpdateOneID(tp.TenderID).ClearPendingProfile().SetActiveProfile(tp).Exec(ctx); err != nil {
						return nil, err
					}

					tpp, err := f.store.TenderProfile.Query().
						Where(tenderprofile.ID(tp.ID)).
						WithTender(func(tq *ent.TenderQuery) {
							tq.WithArea()
						}).
						WithCreatedBy().
						// WithUpdatedBy().
						WithCustomer().
						WithApprover().
						WithFinder().
						Only(ctx)
					if err != nil {
						return nil, err
					}

					templateId = TemplateIdTenderApproved
					templateVars = tenderProfileTemplateVars(tpp)

					chatId := f.GetSalesChatId(tpp.Edges.Tender.Edges.Area)
					go func() {
						ctxx := context.Background()
						if _, err := f.SendGroupMessage(ctxx, TemplateIdTenderApproved, &GroupMessageParams{
							TenderProfile: tpp,
							ChatId:        chatId,
						}); err != nil {
							fmt.Printf("failed to send group message: %v\n", err)
						}
					}()

				case "reject_tender":
					tenderId, ok := event.Event.Action.Value["tender_id"].(string)
					if !ok {
						return nil, fmt.Errorf("tender id is not found")
					}
					approver, err := f.store.User.Query().Where(user.OpenID(event.Event.Operator.OpenID)).Only(ctx)
					if err != nil {
						return nil, err
					}

					tp, err := f.store.TenderProfile.UpdateOneID(xid.ID(tenderId)).SetApprovalStatus(3).SetApprover(approver).SetApprovalDate(time.Now()).Save(ctx)
					if err != nil {
						return nil, err
					}

					tpp, err := f.store.TenderProfile.Query().
						Where(tenderprofile.ID(tp.ID)).
						WithTender(func(tq *ent.TenderQuery) {
							tq.WithArea()
						}).
						WithCreatedBy().
						// WithUpdatedBy().
						WithCustomer().
						WithApprover().
						WithFinder().
						Only(ctx)
					if err != nil {
						return nil, err
					}

					templateId = TemplateIdTenderRejected
					templateVars = tenderProfileTemplateVars(tpp)

					go func() {
						ctxx := context.Background()
						chatId := f.GetSalesChatId(tpp.Edges.Tender.Edges.Area)
						if _, err := f.SendGroupMessage(ctxx, TemplateIdTenderRejected, &GroupMessageParams{
							TenderProfile: tpp,
							ChatId:        chatId,
						}); err != nil {
							fmt.Printf("failed to send group message: %v\n", err)
						}
					}()

				case "approve_customer":
					customerId, ok := event.Event.Action.Value["customer_id"].(string)
					if !ok {
						return nil, fmt.Errorf("customer id is not found")
					}

					approver, err := f.store.User.Query().Where(user.OpenID(event.Event.Operator.OpenID)).Only(ctx)
					if err != nil {
						fmt.Printf("failed to get approver: %v\n", err)
						return nil, err
					}

					profile, err := f.store.CustomerProfile.Query().
						Where(customerprofile.ID(xid.ID(customerId))).
						WithCustomer(func(cq *ent.CustomerQuery) {
							cq.WithActiveProfile()
						}).
						Only(ctx)
					if err != nil {
						return nil, err
					}

					isCreate := profile.Edges.Customer.Edges.ActiveProfile == nil

					cp, err := profile.Update().SetApprovalStatus(2).SetApprover(approver).SetApprovalDate(time.Now()).Save(ctx)
					if err != nil {
						fmt.Printf("failed to update customer profile: %v\n", err)
						return nil, err
					}

					if err := f.store.Customer.UpdateOneID(cp.CustomerID).ClearPendingProfile().SetActiveProfile(cp).Exec(ctx); err != nil {
						fmt.Printf("failed to update customer: %v\n", err)
						return nil, err
					}

					cpp, err := f.store.CustomerProfile.Query().
						Where(customerprofile.ID(cp.ID)).
						WithCustomer(func(tq *ent.CustomerQuery) {
							tq.WithArea()
							tq.WithActiveProfile()
						}).
						WithCreatedBy().
						WithSales().
						WithApprover().
						Only(ctx)
					if err != nil {
						fmt.Printf("failed to get customer profile: %v\n", err)
						return nil, err
					}

					templateId = TemplateIdCustomerFinished
					templateVars = customerProfileTemplateVars(cpp)
					color := ApprovedColor

					var (
						title  string
						result string
					)

					if isCreate {
						title = CreateCustomerApprovedTitle
						result = CreateCustomerApprovedResult
					} else {
						title = UpdateCustomerApprovedTitle
						result = UpdateCustomerApprovedResult
					}

					templateVars["title"] = title
					templateVars["color"] = color
					templateVars["result"] = result

					chatId := f.GetSalesChatId(cpp.Edges.Customer.Edges.Area)
					go func() {
						ctxx := context.Background()
						if _, err := f.SendGroupMessage(ctxx, templateId, &GroupMessageParams{
							CustomerProfile:    cpp,
							ChatId:             chatId,
							CustomerCardTitle:  title,
							CustomerCardColor:  color,
							CustomerCardResult: result,
						}); err != nil {
							fmt.Printf("failed to send group message: %v\n", err)
						}
					}()

				case "reject_customer":
					customerId, ok := event.Event.Action.Value["customer_id"].(string)
					if !ok {
						return nil, fmt.Errorf("customer id is not found")
					}
					approver, err := f.store.User.Query().Where(user.OpenID(event.Event.Operator.OpenID)).Only(ctx)
					if err != nil {
						fmt.Printf("failed to get approver: %v\n", err)
						return nil, err
					}

					profile, err := f.store.CustomerProfile.Query().
						Where(customerprofile.ID(xid.ID(customerId))).
						WithCustomer(func(cq *ent.CustomerQuery) {
							cq.WithActiveProfile()
						}).
						Only(ctx)
					if err != nil {
						return nil, err
					}

					isCreate := profile.Edges.Customer.Edges.ActiveProfile == nil

					cp, err := profile.Update().SetApprovalStatus(3).SetApprover(approver).SetApprovalDate(time.Now()).Save(ctx)
					if err != nil {
						return nil, err
					}
					if err := profile.Edges.Customer.Update().ClearPendingProfile().Exec(ctx); err != nil {
						return nil, fmt.Errorf("failed to approve customer: %w", err)
					}

					cpp, err := f.store.CustomerProfile.Query().
						Where(customerprofile.ID(cp.ID)).
						WithCustomer(func(tq *ent.CustomerQuery) {
							tq.WithArea()
							tq.WithActiveProfile()
						}).
						WithCreatedBy().
						WithApprover().
						WithSales().
						Only(ctx)
					if err != nil {
						return nil, err
					}

					templateId = TemplateIdCustomerFinished
					templateVars = customerProfileTemplateVars(cpp)
					color := RejectedColor

					var (
						title  string
						result string
					)
					if isCreate {
						title = CreateCustomerRejectedTitle
						result = CreateCustomerRejectedResult
					} else {
						title = UpdateCustomerRejectedTitle
						result = UpdateCustomerRejectedResult
					}

					templateVars["title"] = title
					templateVars["color"] = color
					templateVars["result"] = result

					chatId := f.GetSalesChatId(cpp.Edges.Customer.Edges.Area)
					go func() {
						ctxx := context.Background()
						if _, err := f.SendGroupMessage(ctxx, templateId, &GroupMessageParams{
							CustomerProfile:    cpp,
							ChatId:             chatId,
							CustomerCardTitle:  title,
							CustomerCardColor:  color,
							CustomerCardResult: result,
						}); err != nil {
							fmt.Printf("failed to send group message: %v\n", err)
						}
					}()

				}

				return &callback.CardActionTriggerResponse{
					Toast: &callback.Toast{
						Type:    "success",
						Content: "審批成功",
					},
					Card: &callback.Card{
						Type: "template",
						Data: map[string]any{
							"template_id":       templateId,
							"template_variable": templateVars,
						},
					},
				}, nil
			}

			return nil, nil
		})
		// 监听「拉取链接预览数据 url.preview.get」
		// OnP2CardURLPreviewGet(func(ctx context.Context, event *callback.URLPreviewGetEvent) (*callback.URLPreviewGetResponse, error) {
		// 	fmt.Printf("[ OnP2URLPreviewAction access ], data: %s\n", larkcore.Prettify(event))
		// 	return nil, nil
		// })

	// 创建Client
	cli := larkws.NewClient(f.appId, f.appSecret,
		larkws.WithEventHandler(eventHandler),
		larkws.WithLogLevel(larkcore.LogLevelDebug),
	)
	// 建立长连接
	err := cli.Start(ctx)
	fmt.Println(err)
}

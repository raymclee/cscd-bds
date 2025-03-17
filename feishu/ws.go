package feishu

import (
	"context"
	"cscd-bds/store/ent/customer"
	"cscd-bds/store/ent/schema/xid"
	"cscd-bds/store/ent/tender"
	"cscd-bds/store/ent/user"
	"errors"
	"fmt"

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
					if err := f.store.Tender.UpdateOneID(xid.ID(tenderId)).SetApprovalStatus(2).SetApprover(approver).Exec(ctx); err != nil {
						return nil, err
					}

					t, err := f.store.Tender.Query().
						Where(tender.ID(xid.ID(tenderId))).
						WithCreatedBy().
						WithCustomer().
						WithApprover().
						WithFinder().
						Only(ctx)
					if err != nil {
						return nil, err
					}

					templateId = TemplateIdTenderApproved
					templateVars = tenderTemplateVars(t)

					go func() {
						ctxx := context.Background()
						chatId := f.GetSalesChatId(t.Edges.Area)
						if chatId == nil {
							fmt.Printf("failed to get sales chat id: %v\n", errors.New("sales chat id is nil"))
							return
						}
						if _, err := f.SendGroupMessage(ctxx, TemplateIdTenderApproved, &GroupMessageParams{
							Tender: t,
							ChatId: *chatId,
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
					if err := f.store.Tender.UpdateOneID(xid.ID(tenderId)).SetApprovalStatus(3).SetApprover(approver).Exec(ctx); err != nil {
						return nil, err
					}

					t, err := f.store.Tender.Query().
						Where(tender.ID(xid.ID(tenderId))).
						WithCreatedBy().
						WithCustomer().
						WithApprover().
						WithFinder().
						Only(ctx)
					if err != nil {
						return nil, err
					}

					templateId = TemplateIdTenderRejected
					templateVars = tenderTemplateVars(t)

					go func() {
						ctxx := context.Background()
						chatId := f.GetSalesChatId(t.Edges.Area)
						if chatId == nil {
							fmt.Printf("failed to get sales chat id: %v\n", errors.New("sales chat id is nil"))
							return
						}
						if _, err := f.SendGroupMessage(ctxx, TemplateIdTenderRejected, &GroupMessageParams{
							Tender: t,
							ChatId: *chatId,
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
						return nil, err
					}

					cus, err := f.store.ApproveCustomerUpdate(ctx, xid.ID(customerId), approver.ID)
					if err != nil {
						return nil, err
					}
					templateId = TemplateIdCustomerApproved
					templateVars = customerTemplateVars(cus)

					go func() {
						ctxx := context.Background()
						chatId := f.GetSalesChatId(cus.Edges.Area)
						if chatId == nil {
							fmt.Printf("failed to get sales chat id: %v\n", errors.New("sales chat id is nil"))
							return
						}
						if _, err := f.SendGroupMessage(ctxx, TemplateIdCustomerApproved, &GroupMessageParams{
							Customer: cus,
							ChatId:   *chatId,
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
					if err := f.store.Customer.UpdateOneID(xid.ID(customerId)).SetApprovalStatus(3).ClearDraft().SetApprover(approver).Exec(ctx); err != nil {
						fmt.Printf("failed to update customer: %v\n", err)
						return nil, err
					}
					cus, err := f.store.Customer.Query().
						Where(customer.ID(xid.ID(customerId))).
						WithArea().
						WithCreatedBy().
						WithApprover().
						WithSales().
						Only(ctx)
					if err != nil {
						fmt.Printf("failed to get customer: %v\n", err)
						return nil, err
					}
					templateVars = customerTemplateVars(cus)
					templateId = TemplateIdCustomerRejected

					go func() {
						ctxx := context.Background()
						chatId := f.GetSalesChatId(cus.Edges.Area)
						if chatId == nil {
							fmt.Printf("failed to get sales chat id: %v\n", errors.New("sales chat id is nil"))
							return
						}
						if _, err := f.SendGroupMessage(ctxx, TemplateIdCustomerRejected, &GroupMessageParams{
							Customer: cus,
							ChatId:   *chatId,
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

package feishu

import (
	"context"
	"cscd-bds/store/ent/schema/xid"
	"fmt"

	larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
	"github.com/larksuite/oapi-sdk-go/v3/event/dispatcher"
	"github.com/larksuite/oapi-sdk-go/v3/event/dispatcher/callback"
	larkws "github.com/larksuite/oapi-sdk-go/v3/ws"
)

func (f *Feishu) StartWSClient() {
	eventHandler := dispatcher.NewEventDispatcher("", "").
		// 监听「卡片回传交互 card.action.trigger」
		OnP2CardActionTrigger(func(ctx context.Context, event *callback.CardActionTriggerEvent) (*callback.CardActionTriggerResponse, error) {
			fmt.Printf("[ OnP2CardActionTrigger access ], data: %s\n", larkcore.Prettify(event))

			if ac, ok := event.Event.Action.Value["action"].(string); ok {
				var (
					templateId   string
					templateVars = map[string]any{}
				)
				switch ac {
				case "approve_tender":
					tenderId, ok := event.Event.Action.Value["tender_id"].(string)
					if !ok {
						return nil, nil
					}
					approver, err := f.store.User.Get(ctx, xid.ID(event.Event.Operator.OpenID))
					if err != nil {
						return nil, err
					}
					_, err = f.store.Tender.UpdateOneID(xid.ID(tenderId)).SetIsApproved(true).SetApprover(approver).Save(ctx)
					if err != nil {
						return nil, err
					}
					templateId = "templateId"
					templateVars["approver"] = approver.Name

				case "reject_tender":
					templateId = "templateId"
					templateVars["approver"] = "df"

				case "approve_customer":
					customerId, ok := event.Event.Action.Value["customer_id"].(string)
					if !ok {
						return nil, nil
					}
					approver, err := f.store.User.Get(ctx, xid.ID(event.Event.Operator.OpenID))
					if err != nil {
						return nil, err
					}
					_, err = f.store.Customer.UpdateOneID(xid.ID(customerId)).SetIsApproved(true).SetApprover(approver).Save(ctx)
					if err != nil {
						return nil, err
					}
					templateId = "templateId"
					templateVars["approver"] = approver.Name

				case "reject_customer":
					templateId = "templateId"
					templateVars["approver"] = "df"
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
	err := cli.Start(context.Background())
	fmt.Println(err)
}

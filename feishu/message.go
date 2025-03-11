package feishu

import (
	"context"
	"cscd-bds/store/ent"
	"encoding/json"
	"fmt"

	larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
	"golang.org/x/sync/errgroup"
)

type GroupMessageParams struct {
	Tender *ent.Tender
}

func (f *Feishu) SendGroupMessage(ctx context.Context, userIDs []string, tender *ent.Tender) error {
	eg := errgroup.Group{}

	content, err := json.Marshal(map[string]any{
		"type": "template",
		"data": map[string]any{
			"template_id": "AAqBXLd58fBQa",
			"template_variable": map[string]any{
				"tender_id":      tender.ID,
				"created_by":     tender.Edges.CreatedBy.Name,
				"created_by_id":  tender.Edges.CreatedBy.OpenID,
				"area":           tender.Edges.Area.Name,
				"name":           tender.Name,
				"customer":       tender.Edges.Customer.Name,
				"finder":         tender.Edges.Finder.Name,
				"finder_id":      tender.Edges.Finder.OpenID,
				"discovery_date": tender.DiscoveryDate.Format("2006-01-02"),
				"tender_url":     fmt.Sprintf("https://mkm.fefacade.com/portal/tenders/%s", tender.ID),
			},
		},
	})
	if err != nil {
		return err
	}

	for _, id := range userIDs {
		eg.Go(func() error {
			res, err := f.Client.Post(ctx, "/open-apis/im/v1/messages?receive_id_type=chat_id", map[string]any{
				"msg_type":   "interactive",
				"content":    string(content),
				"receive_id": id,
			}, larkcore.AccessTokenTypeTenant)
			if err != nil {
				return err
			}
			if res.StatusCode != 200 {
				return fmt.Errorf("send message error: %v", res.StatusCode)
			}
			return nil
		})

		// req := larkim.NewCreateMessageReqBuilder().
		// 	ReceiveIdType(`open_id`).
		// 	Body(larkim.NewCreateMessageReqBodyBuilder().
		// 		ReceiveId(userID).
		// 		MsgType(larkim.MsgTypeInteractive).
		// 		Content(`{"text":"test content"}`).
		// 		Uuid(`选填，每次调用前请更换，如a0d69e20-1dd1-458b-k525-dfeca4015204`).
		// 		Build()).
		// 	Build()

		// resp, err := f.Client.Im.V1.Message.Create(ctx, req)
		// if err != nil {
		// 	return err
		// }
		// if !resp.Success() {
		// 	return fmt.Errorf("send message error: %v", resp.CodeError)
		// }
		// return nil
	}
	return eg.Wait()
}

package feishu

import (
	"context"
	"cscd-bds/config"
	"cscd-bds/store/ent"
	"encoding/json"
	"fmt"

	larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
)

type ChatMessageParams struct {
	ChatId             string
	TenderProfile      *ent.TenderProfile
	CustomerProfile    *ent.CustomerProfile
	TemplateId         string
	CustomerCardTitle  string
	CustomerCardColor  string
	CustomerCardResult string
}

func (f *Feishu) SendChatMessage(ctx context.Context, params *ChatMessageParams) (string, error) {
	var (
		contentData map[string]any
		tv          map[string]any
	)

	switch {
	case params.TenderProfile != nil:
		tv = tenderProfileTemplateVars(params.TenderProfile)
		// if params.Tender.Edges.UpdatedBy != nil {
		// 	tv["created_by_id"] = params.Tender.Edges.UpdatedBy.OpenID
		// }
		if params.TenderProfile.Developer != nil {
			tv["customer_name"] = params.TenderProfile.Developer
		}
		contentData = map[string]any{
			"template_id":       params.TemplateId,
			"template_variable": tv,
		}
	case params.CustomerProfile != nil:
		tv = customerProfileTemplateVars(params.CustomerProfile)
		if params.CustomerProfile.Edges.CreatedBy != nil {
			tv["created_by_id"] = params.CustomerProfile.Edges.CreatedBy.OpenID
		}
		if params.CustomerCardTitle != "" {
			tv["title"] = params.CustomerCardTitle
		}
		if params.CustomerCardColor != "" {
			tv["color"] = params.CustomerCardColor
		}
		if params.CustomerCardResult != "" {
			tv["result"] = params.CustomerCardResult
		}
		contentData = map[string]any{
			"template_id":       params.TemplateId,
			"template_variable": tv,
		}
	default:
		return "", fmt.Errorf("invalid params")
	}

	content, err := json.Marshal(map[string]any{
		"type": "template",
		"data": contentData,
	})
	if err != nil {
		return "", err
	}

	res, err := f.Client.Post(ctx, "/open-apis/im/v1/messages?receive_id_type=open_id", map[string]any{
		"msg_type":   "interactive",
		"content":    string(content),
		"receive_id": params.ChatId,
	}, larkcore.AccessTokenTypeTenant)
	if err != nil {
		return "", err
	}
	if res.StatusCode != 200 {
		return "", fmt.Errorf("send message error: %v", res.StatusCode)
	}

	var data map[string]any
	if err := json.Unmarshal(res.RawBody, &data); err != nil {
		return "", err
	}

	var msgId string
	if v, ok := data["data"].(map[string]any); ok {
		if vv, ok := v["message_id"].(string); ok {
			msgId = vv
		}
	}

	return msgId, nil
}

type GroupMessageParams struct {
	TenderProfile      *ent.TenderProfile
	CustomerProfile    *ent.CustomerProfile
	ChatId             string
	CustomerCardTitle  string
	CustomerCardColor  string
	CustomerCardResult string
}

func (f *Feishu) SendGroupMessage(ctx context.Context, templateId string, params *GroupMessageParams) (string, error) {
	var (
		contentData map[string]any
		tv          map[string]any
	)

	switch {
	case params.TenderProfile != nil:
		tv = tenderProfileTemplateVars(params.TenderProfile)
		// if params.Tender.Edges.UpdatedBy != nil {
		// 	tv["created_by_id"] = params.Tender.Edges.UpdatedBy.OpenID
		// }
		contentData = map[string]any{
			"template_id":       templateId,
			"template_variable": tv,
		}
	case params.CustomerProfile != nil:
		tv = customerProfileTemplateVars(params.CustomerProfile)
		if params.CustomerProfile.Edges.CreatedBy != nil {
			tv["created_by_id"] = params.CustomerProfile.Edges.CreatedBy.OpenID
		}
		if params.CustomerCardTitle != "" {
			tv["title"] = params.CustomerCardTitle
		}
		if params.CustomerCardColor != "" {
			tv["color"] = params.CustomerCardColor
		}
		if params.CustomerCardResult != "" {
			tv["result"] = params.CustomerCardResult
		}
		contentData = map[string]any{
			"template_id":       templateId,
			"template_variable": tv,
		}
	default:
		return "", fmt.Errorf("invalid params")
	}

	content, err := json.Marshal(map[string]any{
		"type": "template",
		"data": contentData,
	})
	if err != nil {
		return "", err
	}

	res, err := f.Client.Post(ctx, "/open-apis/im/v1/messages?receive_id_type=chat_id", map[string]any{
		"msg_type":   "interactive",
		"content":    string(content),
		"receive_id": params.ChatId,
	}, larkcore.AccessTokenTypeTenant)
	if err != nil {
		return "", err
	}
	if res.StatusCode != 200 {
		return "", fmt.Errorf("send message error: %v", res.StatusCode)
	}

	var data map[string]any
	if err := json.Unmarshal(res.RawBody, &data); err != nil {
		return "", err
	}

	var msgId string
	if v, ok := data["data"].(map[string]any); ok {
		if vv, ok := v["message_id"].(string); ok {
			msgId = vv
		}
	}

	return msgId, nil
}

type UpdateGroupMessageParams struct {
	TemplateId         string
	MsgId              string
	TenderProfile      *ent.TenderProfile
	CustomerProfile    *ent.CustomerProfile
	CustomerCardTitle  string
	CustomerCardColor  string
	CustomerCardResult string
}

func (f *Feishu) UpdateGroupMessage(ctx context.Context, params *UpdateGroupMessageParams) error {
	var contentData map[string]any
	switch {
	case params.TenderProfile != nil:
		contentData = map[string]any{
			"template_id":       params.TemplateId,
			"template_variable": tenderProfileTemplateVars(params.TenderProfile),
		}
	case params.CustomerProfile != nil:
		tv := customerProfileTemplateVars(params.CustomerProfile)
		if params.CustomerCardTitle != "" {
			tv["title"] = params.CustomerCardTitle
		}
		if params.CustomerCardColor != "" {
			tv["color"] = params.CustomerCardColor
		}
		if params.CustomerCardResult != "" {
			tv["result"] = params.CustomerCardResult
		}
		contentData = map[string]any{
			"template_id":       params.TemplateId,
			"template_variable": tv,
		}
	default:
		return fmt.Errorf("invalid params")
	}
	content, err := json.Marshal(map[string]any{
		"type": "template",
		"data": contentData,
	})
	if err != nil {
		return err
	}

	res, err := f.Client.Patch(ctx, "https://open.feishu.cn/open-apis/im/v1/messages/"+params.MsgId, map[string]any{
		"content": string(content),
	}, larkcore.AccessTokenTypeTenant)
	if err != nil {
		return err
	}
	if res.StatusCode != 200 {
		fmt.Printf("update message error: %v\n", res)
		return fmt.Errorf("update message error: %v", res.StatusCode)
	}

	return nil
}

func tenderProfileTemplateVars(tenderProfile *ent.TenderProfile) map[string]any {
	amount := "￥0"
	if tenderProfile.TenderWinAmount != nil && *tenderProfile.TenderWinAmount > 0 {
		amount = fmt.Sprintf("￥%v亿", *tenderProfile.TenderWinAmount/100000000)
	}
	tv := map[string]any{
		"tender_id":       tenderProfile.ID,
		"created_by_ids":  []string{tenderProfile.Edges.CreatedBy.OpenID},
		"created_by_id":   tenderProfile.Edges.CreatedBy.OpenID,
		"created_by_name": tenderProfile.Edges.CreatedBy.Name,
		"tender_name":     tenderProfile.Name,
		"finder_id":       tenderProfile.Edges.Finder.OpenID,
		"finder_name":     tenderProfile.Edges.Finder.Name,
		"discovery_date":  tenderProfile.DiscoveryDate.Format("2006-01-02"),
		"url":             fmt.Sprintf("%s/portal/tenders/%s", config.HostUrl, tenderProfile.TenderID),
		"amount":          amount,
	}

	if tenderProfile.Edges.Customer != nil {
		tv["customer_name"] = tenderProfile.Edges.Customer.Name
	}

	if tenderProfile.Edges.Tender != nil {
		tv["area"] = tenderProfile.Edges.Tender.Edges.Area.Name
	}

	if tenderProfile.Edges.Approver != nil {
		tv["approver_id"] = tenderProfile.Edges.Approver.OpenID
		tv["approver_name"] = tenderProfile.Edges.Approver.Name
	}

	return tv
}

func customerProfileTemplateVars(customerProfile *ent.CustomerProfile) map[string]any {
	tv := map[string]any{
		"customer_id":     customerProfile.ID,
		"created_by_ids":  []string{customerProfile.Edges.CreatedBy.OpenID},
		"created_by_id":   customerProfile.Edges.CreatedBy.OpenID,
		"created_by_name": customerProfile.Edges.CreatedBy.Name,
		"customer_name":   customerProfile.Name,
		"sales_id":        customerProfile.Edges.Sales.OpenID,
		"url":             fmt.Sprintf("%s/portal/customers/%s", config.HostUrl, customerProfile.CustomerID),
	}
	if customerProfile.Edges.Approver != nil {
		tv["approver_id"] = customerProfile.Edges.Approver.OpenID
		tv["approver_name"] = customerProfile.Edges.Approver.Name
	}

	return tv
}

func (f *Feishu) GetLeaderChatId(area *ent.Area) *string {
	if config.IsProd {
		return area.LeaderChatID
	}
	chatId := "oc_8af2e1d869f15821fc3d9bdc6dca80ad"
	return &chatId
}

func (f *Feishu) GetSalesChatId(area *ent.Area) string {
	if config.IsProd && area.SalesChatID != nil {
		return *area.SalesChatID
	}
	chatId := "oc_8af2e1d869f15821fc3d9bdc6dca80ad"
	return chatId
}

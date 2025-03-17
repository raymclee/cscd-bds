package feishu

import (
	"context"
	"cscd-bds/config"
	"cscd-bds/store/ent"
	"encoding/json"
	"fmt"

	larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
)

type GroupMessageParams struct {
	Tender   *ent.Tender
	Customer *ent.Customer
	ChatId   string
}

func (f *Feishu) SendGroupMessage(ctx context.Context, templateId string, params *GroupMessageParams) (string, error) {
	var (
		contentData map[string]any
		tv          map[string]any
	)

	switch {
	case params.Tender != nil:
		tv = tenderTemplateVars(params.Tender)
		if params.Tender.Edges.UpdatedBy != nil {
			tv["created_by_id"] = params.Tender.Edges.UpdatedBy.OpenID
		}
		contentData = map[string]any{
			"template_id":       templateId,
			"template_variable": tv,
		}
	case params.Customer != nil:
		tv = customerTemplateVars(params.Customer)
		if params.Customer.Edges.UpdatedBy != nil {
			tv["created_by_id"] = params.Customer.Edges.UpdatedBy.OpenID
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

func (f *Feishu) UpdateGroupMessage(ctx context.Context, msgId string, tender *ent.Tender) error {

	contentData := map[string]any{
		"template_id":       TemplateIdTenderApproved,
		"template_variable": tenderTemplateVars(tender),
	}
	content, err := json.Marshal(map[string]any{
		"type": "template",
		"data": contentData,
	})
	if err != nil {
		return err
	}

	res, err := f.Client.Patch(ctx, "https://open.feishu.cn/open-apis/im/v1/messages/"+msgId, map[string]any{
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

func tenderTemplateVars(tender *ent.Tender) map[string]any {
	amount := "￥0"
	if tender.TenderWinAmount > 0 {
		amount = fmt.Sprintf("￥%v亿", tender.TenderWinAmount/100000000)
	}
	tv := map[string]any{
		"tender_id":      tender.ID,
		"created_by_id":  tender.Edges.CreatedBy.OpenID,
		"tender_name":    tender.Name,
		"customer_name":  tender.Edges.Customer.Name,
		"finder_id":      tender.Edges.Finder.OpenID,
		"finder_name":    tender.Edges.Finder.Name,
		"discovery_date": tender.DiscoveryDate.Format("2006-01-02"),
		"url":            fmt.Sprintf("%s/portal/tenders/%s", config.HostUrl, tender.ID),
		"amount":         amount,
	}

	if tender.Edges.Area != nil {
		tv["area"] = tender.Edges.Area.Name
	}

	if tender.Edges.Approver != nil {
		tv["approver_id"] = tender.Edges.Approver.OpenID
		tv["approver_name"] = tender.Edges.Approver.Name
	}

	return tv
}

func customerTemplateVars(customer *ent.Customer) map[string]any {
	tv := map[string]any{
		"customer_id":   customer.ID,
		"created_by_id": customer.Edges.CreatedBy.OpenID,
		"customer_name": customer.Name,
		"sales_id":      customer.Edges.Sales.OpenID,
		"url":           fmt.Sprintf("%s/portal/customers/%s", config.HostUrl, customer.ID),
	}
	if customer.Edges.Approver != nil {
		tv["approver_id"] = customer.Edges.Approver.OpenID
		tv["approver_name"] = customer.Edges.Approver.Name
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

func (f *Feishu) GetSalesChatId(area *ent.Area) *string {
	if config.IsProd {
		return area.SalesChatID
	}
	chatId := "oc_8af2e1d869f15821fc3d9bdc6dca80ad"
	return &chatId
}

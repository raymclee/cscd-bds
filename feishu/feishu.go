package feishu

import (
	"context"
	"cscd-bds/session"
	"cscd-bds/store/ent"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	lark "github.com/larksuite/oapi-sdk-go/v3"
	larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
	larkcontact "github.com/larksuite/oapi-sdk-go/v3/service/contact/v3"
	"golang.org/x/sync/errgroup"
)

type Feishu struct {
	Client  *lark.Client
	hc      *http.Client
	session *session.Session
}

func NewFeishu(client *lark.Client, session *session.Session) *Feishu {
	return &Feishu{Client: client, hc: &http.Client{}, session: session}
}

func (f *Feishu) GetFeishuUser(ctx context.Context, openID string, accessToken string) (*larkcontact.User, error) {
	req := larkcontact.NewGetUserReqBuilder().
		UserId(openID).
		Build()

	// 发起请求
	resp, err := f.Client.Contact.User.Get(ctx, req, larkcore.WithUserAccessToken(accessToken))

	// 处理错误
	if err != nil {
		return nil, fmt.Errorf("get feishu user error: %v", err)
	}

	// 服务端错误处理
	if !resp.Success() {
		return nil, fmt.Errorf("get feishu user error: %v", resp.CodeError)
	}
	return resp.Data.User, nil
}

func (f *Feishu) SearchFeishuUser(ctx context.Context, query string) (*[]FeishuUser, error) {
	accessToken, err := f.session.GetAccessToken(ctx)
	if err != nil {
		return nil, err
	}

	// 构建请求URL
	url := fmt.Sprintf("https://open.feishu.cn/open-apis/search/v1/user?query=%s", url.QueryEscape(query))

	// 创建请求
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, fmt.Errorf("创建请求失败: %v", err)
	}

	// 设置请求头
	req.Header.Set("Authorization", fmt.Sprintf("Bearer %s", accessToken))
	req.Header.Set("Content-Type", "application/json")

	// 发送请求
	resp, err := f.hc.Do(req)
	if err != nil {
		return nil, fmt.Errorf("请求失败: %v", err)
	}
	defer resp.Body.Close()

	// 解析响应
	var result FeishuUserResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, fmt.Errorf("解析响应失败: %v", err)
	}

	return &result.Data.Users, nil
}

// 响应结构体
type FeishuUserResponse struct {
	Code int `json:"code"`
	Data struct {
		HasMore bool         `json:"has_more"`
		Users   []FeishuUser `json:"users"`
	} `json:"data"`
	Msg string `json:"msg"`
}

type FeishuUser struct {
	Avatar struct {
		Avatar240    string `json:"avatar_240"`
		Avatar640    string `json:"avatar_640"`
		Avatar72     string `json:"avatar_72"`
		AvatarOrigin string `json:"avatar_origin"`
	} `json:"avatar"`
	DepartmentIds []string `json:"department_ids"`
	Name          string   `json:"name"`
	OpenID        string   `json:"open_id"`
	Email         string   `json:"email"`
}

func (f *Feishu) GetUserInfos(ctx context.Context, userIds []string) ([]*larkcontact.User, error) {
	accessToken, err := f.session.GetAccessToken(ctx)
	if err != nil {
		return nil, err
	}

	req := larkcontact.NewBatchUserReqBuilder().
		UserIdType(`open_id`).
		UserIds(userIds).
		DepartmentIdType(`open_department_id`).
		Build()

	// 发起请求
	resp, err := f.Client.Contact.User.Batch(ctx, req, larkcore.WithUserAccessToken(accessToken))

	// 处理错误
	if err != nil {
		return nil, fmt.Errorf("get user infos error: %v", err)
	}

	// 服务端错误处理
	if !resp.Success() {
		return nil, fmt.Errorf("get user infos error: %v", resp.CodeError)
	}

	var out []*larkcontact.User
	for _, user := range resp.Data.Items {
		fmt.Println("user", user)
		if user.Status.IsFrozen != nil && !*user.Status.IsFrozen {
			out = append(out, user)
		}
	}

	return out, nil
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

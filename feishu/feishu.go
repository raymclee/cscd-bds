package feishu

import (
	"context"
	"cscd-bds/session"
	"cscd-bds/store"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	lark "github.com/larksuite/oapi-sdk-go/v3"
	larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
	larkcontact "github.com/larksuite/oapi-sdk-go/v3/service/contact/v3"
)

type Feishu struct {
	Client    *lark.Client
	hc        *http.Client
	session   *session.Session
	store     *store.Store
	appId     string
	appSecret string
}

func NewFeishu(client *lark.Client, session *session.Session, store *store.Store, appId, appSecret string) *Feishu {
	return &Feishu{Client: client, hc: &http.Client{}, session: session, store: store, appId: appId, appSecret: appSecret}
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

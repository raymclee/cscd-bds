package handler

import (
	"cscd-bds/config"
	"cscd-bds/session"
	"cscd-bds/store/ent/user"
	"fmt"
	"time"

	"github.com/labstack/echo/v4"
	larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
	larkauthen "github.com/larksuite/oapi-sdk-go/v3/service/authen/v1"
)

func (h handler) AuthFeishuCallback(c echo.Context) error {
	var url string
	if config.IsProd {
		url = "https://mkm.fefacade.com"
	} else {
		url = "http://localhost:5173"
	}

	code := c.QueryParam("code")
	if code == "" {
		return c.Redirect(301, url)
	}

	req := larkauthen.NewCreateOidcAccessTokenReqBuilder().
		Body(larkauthen.NewCreateOidcAccessTokenReqBodyBuilder().
			GrantType(`authorization_code`).
			Code(code).
			Build()).
		Build()

	// 发起请求
	resp, err := h.feishu.Authen.OidcAccessToken.Create(c.Request().Context(), req)
	if err != nil {
		fmt.Println(err)
		return c.Redirect(301, url)
	}
	if !resp.Success() {
		fmt.Println(resp.Code, resp.Msg, resp.Data)
		return c.Redirect(301, url)
	}
	userInfo, err := h.feishu.Authen.UserInfo.Get(c.Request().Context(), larkcore.WithUserAccessToken(*resp.Data.AccessToken))
	if err != nil {
		fmt.Println(err)
		return c.Redirect(301, url)
	}
	if !userInfo.Success() {
		fmt.Println(userInfo.Code, userInfo.Msg, userInfo.Data)
		return c.Redirect(301, url)
	}

	fmt.Printf("username: %s, openId: %s\n", *userInfo.Data.EnName, *userInfo.Data.OpenId)

	us, err := h.store.User.Query().
		Where(
			user.Username(*userInfo.Data.EnName),
			user.DisabledEQ(false),
		).
		Only(c.Request().Context())
	if err != nil {
		h.session.Clear(c.Request().Context())
		h.session.RenewToken(c.Request().Context())
		return c.Redirect(301, url)
	}

	if err := h.store.User.UpdateOne(us).SetOpenID(*userInfo.Data.OpenId).SetAvatarURL(*userInfo.Data.AvatarUrl).Exec(c.Request().Context()); err != nil {
		fmt.Println("update openid error: ", err)
	}

	if err := h.session.RenewToken(c.Request().Context()); err != nil {
		return c.Redirect(301, url+"/access-denied")
	}

	u := session.User{
		AccessToken:  *resp.Data.AccessToken,
		ExpiresIn:    time.Now().Add(time.Duration(*resp.Data.ExpiresIn) * time.Second),
		RefreshToken: *resp.Data.RefreshToken,
		Name:         *userInfo.Data.Name,
		Username:     *userInfo.Data.EnName,
		AvatarUrl:    *userInfo.Data.AvatarUrl,
		AvatarThumb:  *userInfo.Data.AvatarThumb,
		AvatarMiddle: *userInfo.Data.AvatarMiddle,
		AvatarBig:    *userInfo.Data.AvatarBig,
		OpenId:       *userInfo.Data.OpenId,
		UnionId:      *userInfo.Data.UnionId,
		Email:        us.Email,
		UserId:       string(us.ID),
		IsAdmin:      us.IsAdmin,
		IsLeader:     us.IsLeader,
	}
	h.session.Put(c.Request().Context(), "user", u)

	return c.Redirect(301, url)
}

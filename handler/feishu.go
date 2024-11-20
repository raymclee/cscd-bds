package handler

import (
	"cscd-bds/config"
	"cscd-bds/session"
	"cscd-bds/store/ent"
	"cscd-bds/store/ent/user"
	"fmt"
	"net/http"
	"time"

	"github.com/labstack/echo/v4"
	larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
	larkauthen "github.com/larksuite/oapi-sdk-go/v3/service/authen/v1"
)

func (h handler) AuthFeishuCallback(c echo.Context) error {
	code := c.QueryParam("code")
	if code == "" {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"message": "code is required",
		})
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
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": err.Error(),
		})
	}
	if !resp.Success() {
		fmt.Println(resp.Code, resp.Msg, resp.Data)
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": "feishu auth failed",
		})
	}
	userInfo, err := h.feishu.Authen.UserInfo.Get(c.Request().Context(), larkcore.WithUserAccessToken(*resp.Data.AccessToken))
	if err != nil {
		fmt.Println(err)
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": err.Error(),
		})
	}
	if !userInfo.Success() {
		fmt.Println(userInfo.Code, userInfo.Msg, userInfo.Data)
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": "feishu auth user info failed",
		})
	}

	fmt.Printf("username: %s, openId: %s\n", *userInfo.Data.EnName, *userInfo.Data.OpenId)

	us, err := h.store.User.Query().Where(user.OpenID(*userInfo.Data.OpenId)).Only(c.Request().Context())
	if err != nil {
		if !ent.IsNotFound(err) {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"message": err.Error(),
			})
		}
		return c.JSON(http.StatusUnauthorized, echo.Map{
			"message": "unauthorized",
		})
	}

	// a, err := h.store.Admin.Query().Where(admin.OpenID(*userInfo.Data.OpenId)).Only(c.Request().Context())
	// if err != nil {
	// 	if !ent.IsNotFound(err) {
	// 		return c.JSON(http.StatusInternalServerError, echo.Map{
	// 			"message": err.Error(),
	// 		})
	// 	}
	// 	return c.JSON(http.StatusUnauthorized, echo.Map{
	// 		"message": "unauthorized",
	// 	})
	// }

	if err := h.session.RenewToken(c.Request().Context()); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"message": err.Error(),
		})
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
		// Email:        *userInfo.Data.Email,
		// UserId: *userInfo.Data.UserId,
		// AdminId:      a.ID.V,
	}
	h.session.Put(c.Request().Context(), "user", u)

	var url string
	if config.IsProd {
		url = "https://mkm.fefacade.com"
	} else {
		url = "http://localhost:5173"
	}
	return c.Redirect(301, url)
}

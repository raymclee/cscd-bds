package session

import (
	"context"
	"encoding/gob"
	"fmt"
	"time"

	"github.com/alexedwards/scs/redisstore"
	"github.com/alexedwards/scs/v2"
	echoSession "github.com/canidam/echo-scs-session"
	"github.com/gomodule/redigo/redis"
	"github.com/labstack/echo/v4"
	lark "github.com/larksuite/oapi-sdk-go/v3"
	larkauthen "github.com/larksuite/oapi-sdk-go/v3/service/authen/v1"
)

func init() {
	gob.Register(User{})
}

type Session struct {
	*scs.SessionManager
	feishu *lark.Client
}

func NewSession(feishu *lark.Client) *Session {
	sessionManager := scs.New()
	sessionManager.Store = redisstore.New(&redis.Pool{
		MaxIdle: 10,
		Dial: func() (redis.Conn, error) {
			return redis.Dial("tcp", ":6379")
		},
	})
	sessionManager.Lifetime = 24 * time.Hour * 7 // 7 days
	return &Session{
		sessionManager,
		feishu,
	}
}

func (s Session) Middlware() echo.MiddlewareFunc {
	return echoSession.LoadAndSave(s.SessionManager)
}

func (s Session) GetSession(ctx context.Context) (User, error) {
	user, ok := s.Get(ctx, "user").(User)
	if !ok {
		return User{}, fmt.Errorf("Unauthorized")
	}
	return user, nil
}

func (s Session) GetAccessToken(ctx context.Context, user User) (string, error) {
	var accessToken = user.AccessToken
	if user.IsExpired() {
		body := larkauthen.
			NewCreateOidcRefreshAccessTokenReqBodyBuilder().
			GrantType("refresh_token").
			RefreshToken(user.RefreshToken).
			Build()
		req := larkauthen.
			NewCreateOidcRefreshAccessTokenReqBuilder().
			Body(body).
			Build()
		res, err := s.feishu.Authen.OidcRefreshAccessToken.Create(ctx, req)
		if err != nil {
			return "", fmt.Errorf("error refreshing access token: %s", err)
		}
		if !res.Success() {
			return "", fmt.Errorf("error refreshing access token: %s", res.Msg)
		}
		accessToken = *res.Data.AccessToken
		if err := s.RenewToken(ctx); err != nil {
			return "", fmt.Errorf("error renewing session: %s", err)
		}
		s.Put(ctx, "user", User{
			AccessToken:  *res.Data.AccessToken,
			ExpiresIn:    time.Now().Add(time.Duration(*res.Data.ExpiresIn) * time.Second),
			RefreshToken: *res.Data.RefreshToken,
			Name:         user.Name,
			Username:     user.Username,
			AvatarUrl:    user.AvatarUrl,
			AvatarThumb:  user.AvatarThumb,
			AvatarMiddle: user.AvatarMiddle,
			AvatarBig:    user.AvatarBig,
			OpenId:       user.OpenId,
			UnionId:      user.UnionId,
			Email:        user.Email,
			UserId:       user.UserId,
			IsAdmin:      user.IsAdmin,
			IsEditor:     user.IsEditor,
			HasMapAccess: user.HasMapAccess,
			// AdminId:      user.AdminId,
		})
	}
	return accessToken, nil
}

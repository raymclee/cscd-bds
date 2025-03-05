package session

import (
	"context"
	"cscd-bds/config"
	"cscd-bds/store"
	"cscd-bds/store/ent/schema/xid"
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
	store  *store.Store
}

func NewSession(feishu *lark.Client, store *store.Store) *Session {
	sessionManager := scs.New()
	sessionManager.Store = redisstore.New(&redis.Pool{
		MaxIdle: 10,
		Dial: func() (redis.Conn, error) {
			return redis.Dial("tcp", ":6379")
		},
	})
	if config.IsProd {
		sessionManager.Cookie.Domain = "*.fefacade.com"
	}
	sessionManager.Lifetime = 24 * time.Hour * 7 // 7 days
	return &Session{
		sessionManager,
		feishu,
		store,
	}
}

func (s Session) Middlware() echo.MiddlewareFunc {
	return echoSession.LoadAndSave(s.SessionManager)
}

func (s Session) GetSession(ctx context.Context) (User, error) {
	su, ok := s.Get(ctx, "user").(User)
	if !ok {
		return User{}, fmt.Errorf("Unauthorized")
	}
	u, err := s.store.User.Get(ctx, xid.ID(su.UserId))
	if err != nil {
		return User{}, fmt.Errorf("session not found")
	}
	return User{
		AccessToken:   su.AccessToken,
		ExpiresIn:     su.ExpiresIn,
		RefreshToken:  su.RefreshToken,
		UserId:        su.UserId,
		Name:          su.Name,
		Username:      su.Username,
		AvatarUrl:     su.AvatarUrl,
		AvatarThumb:   su.AvatarThumb,
		AvatarMiddle:  su.AvatarMiddle,
		AvatarBig:     su.AvatarBig,
		OpenId:        su.OpenId,
		UnionId:       su.UnionId,
		Email:         su.Email,
		IsAdmin:       u.IsAdmin,
		IsSuperAdmin:  u.IsSuperAdmin,
		HasMapAccess:  u.HasMapAccess,
		HasEditAccess: u.HasEditAccess,
	}, nil
}

func (s Session) GetAccessToken(ctx context.Context) (string, error) {
	user, err := s.GetSession(ctx)
	if err != nil {
		return "", err
	}
	var accessToken = user.AccessToken
	if user.IsExpired() {
		fmt.Println(user)
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
			fmt.Println(err)
			return "", fmt.Errorf("error refreshing access token: %s", err)
		}
		if !res.Success() {
			fmt.Println(res)
			return "", fmt.Errorf("error refreshing access token: %s", res)
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
			// AdminId:      user.AdminId,
		})
	}
	return accessToken, nil
}

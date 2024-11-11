package handler

import (
	"cscd-bds/session"
	"cscd-bds/store"

	"github.com/labstack/echo/v4"
	lark "github.com/larksuite/oapi-sdk-go/v3"
)

type handler struct {
	store   *store.Store
	feishu  *lark.Client
	session *session.Session
}

func NewHandler(store *store.Store, feishu *lark.Client, session *session.Session) *handler {
	return &handler{
		store:   store,
		feishu:  feishu,
		session: session,
	}
}

func (h handler) GetSessionHandler(c echo.Context) error {
	s, err := h.session.GetSession(c.Request().Context())
	if err != nil {
		return c.JSON(401, err.Error())
	}
	return c.JSON(200, s)
}

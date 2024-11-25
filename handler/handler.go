package handler

import (
	"cscd-bds/session"
	"cscd-bds/store"

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

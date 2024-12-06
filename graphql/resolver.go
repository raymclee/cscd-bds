package graphql

import (
	"cscd-bds/graphql/generated"
	"cscd-bds/sap"
	"cscd-bds/session"
	"cscd-bds/store"

	"github.com/99designs/gqlgen/graphql"
	lark "github.com/larksuite/oapi-sdk-go/v3"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	store   *store.Store
	feishu  *lark.Client
	session *session.Session
	sap     *sap.Sap
}

func NewSchema(store *store.Store, feishu *lark.Client, session *session.Session, sap *sap.Sap) graphql.ExecutableSchema {
	return generated.NewExecutableSchema(generated.Config{
		Resolvers: &Resolver{
			store:   store,
			feishu:  feishu,
			session: session,
			sap:     sap,
		},
	})
}

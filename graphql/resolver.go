package graphql

import (
	"cscd-bds/amap"
	"cscd-bds/feishu"
	"cscd-bds/graphql/generated"
	"cscd-bds/sap"
	"cscd-bds/session"
	"cscd-bds/store"

	"github.com/99designs/gqlgen/graphql"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	store   *store.Store
	feishu  *feishu.Feishu
	session *session.Session
	sap     *sap.Sap
	amap    *amap.AMap
}

func NewSchema(store *store.Store, f *feishu.Feishu, session *session.Session, sap *sap.Sap, amap *amap.AMap) graphql.ExecutableSchema {
	return generated.NewExecutableSchema(generated.Config{
		Resolvers: &Resolver{
			store:   store,
			feishu:  f,
			session: session,
			sap:     sap,
			amap:    amap,
		},
	})
}

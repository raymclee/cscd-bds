package main

import (
	"cscd-bds/config"
	"cscd-bds/graphql"
	"cscd-bds/handler"
	"cscd-bds/session"
	"cscd-bds/store"
	"cscd-bds/web"
	"net/http"

	"entgo.io/contrib/entgql"
	gqlHandler "github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	lark "github.com/larksuite/oapi-sdk-go/v3"
)

const (
	FEISHU_APP_ID     = "cli_a7bb34cd9b65900c"
	FEISHU_APP_SECRET = "7QgUlxBXSOKYjR7M4KsBzewHcqnPqpvn"
)

func main() {
	e := echo.New()
	e.Use(
		middleware.Recover(),
		middleware.RequestID(),
		middleware.Logger(),
		middleware.CORS(),
	)

	if config.IsProd {
		e.Use(
			middleware.Gzip(),
			middleware.StaticWithConfig(middleware.StaticConfig{
				Skipper:    nil,
				Index:      "index.html",
				HTML5:      true,
				Browse:     false,
				IgnoreBase: false,
				Filesystem: http.FS(web.DistDirFS),
			}))
	}

	lc := lark.NewClient(FEISHU_APP_ID, FEISHU_APP_SECRET)
	s := store.NewStore()
	sm := session.NewSession(lc)
	h := handler.NewHandler(s, lc, sm)
	gs := gqlHandler.NewDefaultServer(graphql.NewSchema(s, lc, sm))
	gs.Use(entgql.Transactioner{TxOpener: s.Client})
	ph := playground.Handler("830商機管理系統", "/graphql")

	publicApiV1 := e.Group("/api/v1", sm.Middlware())
	publicApiV1.GET("/auth/feishu/callback", h.AuthFeishuCallback)

	protected := e.Group("", sm.Middlware(), h.AuthMiddleware())
	protected.Any("/playground", echo.WrapHandler(ph))
	protected.Any("/graphql", echo.WrapHandler(gs))

	projectedApiV1 := protected.Group("/api/v1")
	projectedApiV1.GET("/session", h.GetSessionHandler)

	e.Start(":3000")
}

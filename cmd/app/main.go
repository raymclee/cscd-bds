package main

import (
	"context"
	"cscd-bds/amap"
	"cscd-bds/config"
	"cscd-bds/feishu"
	"cscd-bds/graphql"
	"cscd-bds/handler"
	"cscd-bds/sap"
	"cscd-bds/session"
	"cscd-bds/store"
	"cscd-bds/web"
	"log"
	"net/http"
	"net/url"

	"entgo.io/contrib/entgql"
	gqlHandler "github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	lark "github.com/larksuite/oapi-sdk-go/v3"
	_ "github.com/microsoft/go-mssqldb"
)

const (
	FEISHU_APP_ID     = "cli_a7bb34cd9b65900c"
	FEISHU_APP_SECRET = "7QgUlxBXSOKYjR7M4KsBzewHcqnPqpvn"

	STG_HOST     = "10.1.8.37"
	STG_PORT     = 1433
	STG_USER     = "bi830"
	STG_PASSWORD = "Csci!830"
	STG_DATABASE = "BI_STG_830"
)

func main() {
	ctx := context.Background()

	e := echo.New()
	e.Use(
		middleware.Recover(),
		middleware.RequestID(),
		middleware.Logger(),
		middleware.CORS(),
	)

	lc := lark.NewClient(FEISHU_APP_ID, FEISHU_APP_SECRET)
	s := store.New(true)
	sm := session.NewSession(lc, s)
	f := feishu.NewFeishu(lc, sm, s, FEISHU_APP_ID, FEISHU_APP_SECRET)
	sh := sap.New()
	amap := amap.New("28982eb1a6a3cd956e0e0614c2fb131b")

	// if config.IsProd || config.IsUat {
	go f.StartWSClient(ctx)
	// }

	// stgDb, err := sql.Open("sqlserver", fmt.Sprintf("sqlserver://%s:%s@%s:%d?database=%s&connection+timeout=30", STG_USER, STG_PASSWORD, STG_HOST, STG_PORT, STG_DATABASE))
	// if err != nil {
	// 	fmt.Println(err)
	// 	panic(err)
	// }
	// defer stgDb.Close()

	h := handler.NewHandler(s, f, sm, sh, amap)
	gs := gqlHandler.NewDefaultServer(graphql.NewSchema(s, f, sm, sh, amap))
	gs.Use(entgql.Transactioner{TxOpener: s.Client})
	ph := playground.Handler("远东幕墙市场拓展地图", "/graphql")

	e.GET("/healthz", func(c echo.Context) error {
		return c.String(http.StatusOK, "ok")
	})

	publicApiV1 := e.Group("/api/v1", sm.Middlware())
	publicApiV1.GET("/auth/feishu/callback", h.AuthFeishuCallback)

	// protected := e.Group("", sm.Middlware(), h.AuthMiddleware())
	e.Any("/playground", echo.WrapHandler(ph), sm.Middlware(), h.AuthMiddleware(), h.AdminOnly())
	e.Any("/graphql", echo.WrapHandler(gs), sm.Middlware(), h.AuthMiddleware())
	// protected.Static("/static", "static")
	e.Group("/static", sm.Middlware(), h.AuthMiddleware()).Static("/", "static")

	projectedApiV1 := e.Group("/api/v1", sm.Middlware(), h.AuthMiddleware())
	projectedApiV1.POST("/file/upload", h.UploadFile)
	projectedApiV1.POST("/projects/:code/image", h.UploadProjectImage)
	projectedApiV1.GET("/logout", func(c echo.Context) error {
		if err := sm.Destroy(c.Request().Context()); err != nil {
			return err
		}

		return c.Redirect(http.StatusFound, "/logout")
	})

	bi := e.Group("/webroot/decision", sm.Middlware(), h.AuthMiddleware())
	bi.Use(middleware.ProxyWithConfig(middleware.ProxyConfig{
		Balancer: middleware.NewRandomBalancer([]*middleware.ProxyTarget{
			{
				URL: &url.URL{
					Scheme: "http",
					Host:   "10.148.7.9:8080",
				},
			},
		}),
	}))

	// if config.IsProd || config.IsUat {
	e.Use(middleware.Secure())
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
	// }

	var port string
	if config.IsProd {
		port = ":3000"
	} else if config.IsUat {
		port = ":3001"
	} else {
		port = ":3000"
	}
	log.Fatal(e.Start(port))
}

package web

import (
	"embed"

	"github.com/labstack/echo/v4"
)

var (
	//go:embed all:dist
	dist      embed.FS
	DistDirFS = echo.MustSubFS(dist, "dist")
)

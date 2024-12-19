package handler

import (
	"cscd-bds/amap"
	"cscd-bds/config"
	"cscd-bds/feishu"
	"cscd-bds/sap"
	"cscd-bds/session"
	"cscd-bds/store"
	"fmt"
	"io"
	"os"

	"github.com/labstack/echo/v4"
)

type handler struct {
	store   *store.Store
	feishu  *feishu.Feishu
	session *session.Session
	sap     *sap.Sap
	amap    *amap.AMap
}

func NewHandler(store *store.Store, f *feishu.Feishu, session *session.Session, sap *sap.Sap, amap *amap.AMap) *handler {
	return &handler{
		store:   store,
		feishu:  f,
		session: session,
		sap:     sap,
		amap:    amap,
	}
}

func (h handler) UploadFile(c echo.Context) error {
	form, err := c.MultipartForm()
	if err != nil {
		fmt.Println(err)
		return err
	}
	files := form.File["files"]
	for _, file := range files {
		src, err := file.Open()
		if err != nil {
			fmt.Println(err)
			return err
		}
		defer src.Close()

		// Destination
		dst, err := os.Create(config.FilePath + "tmp/" + file.Filename)
		if err != nil {
			fmt.Println(err)
			return err
		}
		defer dst.Close()

		// Copy
		if _, err = io.Copy(dst, src); err != nil {
			fmt.Println(err)
			return err
		}

	}
	return nil
}

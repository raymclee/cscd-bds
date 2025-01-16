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

func (h handler) UploadProjectImage(c echo.Context) error {
	code := c.Param("code")

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

		dir := fmt.Sprintf("%sprojects/%s", config.FilePath, code)
		if err := os.MkdirAll(fmt.Sprintf("%s/%s", dir, code), 0755); err != nil {
			return fmt.Errorf("failed to create directory: %w", err)
		}
		// Destination
		dst, err := os.Create(dir + "/" + code + ".png")
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

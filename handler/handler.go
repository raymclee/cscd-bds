package handler

import (
	"cscd-bds/config"
	"cscd-bds/sap"
	"cscd-bds/session"
	"cscd-bds/store"
	"fmt"
	"io"
	"os"

	"github.com/labstack/echo/v4"
	lark "github.com/larksuite/oapi-sdk-go/v3"
)

type handler struct {
	store   *store.Store
	feishu  *lark.Client
	session *session.Session
	sap     *sap.Sap
}

func NewHandler(store *store.Store, feishu *lark.Client, session *session.Session, sap *sap.Sap) *handler {
	return &handler{
		store:   store,
		feishu:  feishu,
		session: session,
		sap:     sap,
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

		// Copy
		if _, err = io.Copy(dst, src); err != nil {
			fmt.Println(err)
			return err
		}

	}
	return nil
}

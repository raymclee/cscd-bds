package handler

import (
	"context"
	"cscd-bds/amap"
	"cscd-bds/config"
	"cscd-bds/feishu"
	"cscd-bds/sap"
	"cscd-bds/session"
	"cscd-bds/store"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
	"golang.org/x/sync/errgroup"
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

func (h handler) SendTextMessage(c echo.Context) error {
	eg := errgroup.Group{}

	userIDs := []string{
		"oc_28cc8fc274afd392fde3e5e5c7e19160",
		// "ou_743b55f410fd90d254d4c3da3680f196",
	}

	content, err := json.Marshal(map[string]any{
		"type": "template",
		"data": map[string]any{
			"template_id":       "AAqBXLd58fBQa",
			"template_variable": map[string]any{
				// "tender_id":      tender.ID,
				// "created_by":     tender.Edges.CreatedBy.Name,
				// "created_by_id":  tender.Edges.CreatedBy.OpenID,
				// "area":           tender.Edges.Area.Name,
				// "name":           tender.Name,
				// "customer":       tender.Edges.Customer.Name,
				// "finder":         tender.Edges.Finder.Name,
				// "finder_id":      tender.Edges.Finder.OpenID,
				// "discovery_date": tender.DiscoveryDate.Format("2006-01-02"),
				// "tender_url":     fmt.Sprintf("https://mkm.fefacade.com/portal/tenders/%s", tender.ID),
			},
		},
	})
	if err != nil {
		fmt.Println(err)
		return fmt.Errorf("failed to marshal content: %w", err)
	}

	for _, id := range userIDs {
		eg.Go(func() error {
			res, err := h.feishu.Client.Post(context.Background(), "/open-apis/im/v1/messages?receive_id_type=chat_id", map[string]any{
				"msg_type":   "interactive",
				"content":    string(content),
				"receive_id": id,
			}, larkcore.AccessTokenTypeTenant)
			if err != nil {
				fmt.Println(err)
				return fmt.Errorf("failed to send message: %w", err)
			}
			fmt.Println(res)
			if res.StatusCode != 200 {
				return fmt.Errorf("send message error: %v", res.StatusCode)
			}
			return nil
		})
	}

	return eg.Wait()
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

	if len(files) == 0 {
		return c.NoContent(http.StatusBadRequest)
	}

	for _, file := range files {
		src, err := file.Open()
		if err != nil {
			fmt.Println(err)
			return err
		}
		defer src.Close()

		dir := fmt.Sprintf("%sprojects/%s", config.FilePath, code)
		if err := os.MkdirAll(dir, 0755); err != nil {
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

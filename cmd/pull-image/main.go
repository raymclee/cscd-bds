package main

import (
	"context"
	"cscd-bds/store"
	"cscd-bds/store/ent/tender"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"

	lark "github.com/larksuite/oapi-sdk-go/v3"
	larkauth "github.com/larksuite/oapi-sdk-go/v3/service/auth/v3"
	larkbitable "github.com/larksuite/oapi-sdk-go/v3/service/bitable/v1"
	"golang.org/x/sync/errgroup"
)

const (
	appId          = "cli_a7a2f0c10cf8500c"
	appSecret      = "qlMQfd9IM6yBV1pvDxZDkfU8EQjDCHpH"
	appToken       = "GacIb8hYTa6IhwsGwdQceO8Enid"
	areaTid        = "tblv2YgRcL1S5TYo"
	tenderTid      = "tblX9sLfVNlQdPyS"
	customerTid    = "tbl5pgTgK7hiT7px"
	visitRecordTid = "tblVtjBucJoRQyOp"
	salesTid       = "tblbv3qpmTcwkQYQ"
	competitorTid  = "tbl2a4lE1OVBVOov"
)

var (
	ctx    = context.Background()
	s      *store.Store
	client *lark.Client
)

func main() {
	client = lark.NewClient(appId, appSecret)
	s = store.New(false)

	// fetchArea()
	// fetchSales()
	// fetchCustomer()
	fetchTenderImage()
	// fetchCompetitor()

}

func fetchTenderImage() {
	httpClient := &http.Client{}

	token, err := client.Auth.TenantAccessToken.Internal(ctx,
		larkauth.NewInternalTenantAccessTokenReqBuilder().Body(
			larkauth.NewInternalTenantAccessTokenReqBodyBuilder().AppId(appId).AppSecret(appSecret).Build(),
		).Build(),
	)
	if err != nil {
		log.Fatalln(err)
	}
	var out struct {
		TenantAccessToken string `json:"tenant_access_token"`
	}
	if err := json.Unmarshal(token.RawBody, &out); err != nil {
		log.Fatal(err)
	}

	req := larkbitable.NewListAppTableRecordReqBuilder().AppToken(appToken).TableId(tenderTid).Build()
	resp, err := client.Bitable.AppTableRecord.List(ctx, req)
	if err != nil {
		panic(err)
	}
	if !resp.Success() {
		panic(resp.Error())
	}

	for _, item := range resp.Data.Items {
		var (
			code   string
			photos []interface{}

			images []string
		)

		if f, ok := item.Fields["数据有效"]; ok {
			if v, ok := f.(map[string]interface{}); ok {
				if v, ok := v["text"].(string); ok {
					if v != "✅" {
						continue
					}
				}
			}
		}

		if f, ok := item.Fields["删除标识"]; ok && f != nil {
			continue
		}

		if f, ok := item.Fields["备案编码"]; ok {
			if v, ok := f.(string); ok {
				code = v
			}
		}

		if code == "" {
			continue
		}

		if f, ok := item.Fields["效果图"]; ok {
			ps, ok := f.([]interface{})
			if !ok {
				continue
			}
			photos = ps
		}

		// fmt.Println(code, status, name, estimatedAmount, tenderDate, discoveryDate, prov, cit, distr)

		t, err := s.Tender.Query().Where(tender.Code(code)).Only(ctx)
		if err != nil {
			fmt.Printf("query tender code: %s err: %v\n", code, err)
			continue
		}

		wg := errgroup.Group{}
		for _, photo := range photos {
			fmt.Println("photo", photo)
			wg.Go(func() error {
				// id := xid.New().String()
				p, ok := photo.(map[string]interface{})
				if !ok {
					fmt.Println("photo is not a map")
					return errors.New("photo is not a map")
				}
				url, ok := p["url"].(string)
				if !ok {
					fmt.Println("url is not a string")
					return errors.New("url is not a string")
				}
				name, ok := p["name"].(string)
				if !ok {
					fmt.Println("name is not a string")
					return errors.New("name is not a string")
				}

				req, err := http.NewRequest("GET", url, nil)
				if err != nil {
					fmt.Println("req err", err)
					return errors.New("req err")
				}
				req.Header.Set("Authorization", "Bearer "+out.TenantAccessToken)
				res, err := httpClient.Do(req)
				if err != nil {
					fmt.Println("res err", err)
					return errors.New("res err")
				}
				defer res.Body.Close()

				// splited := strings.Split(name, ".")
				if err := os.MkdirAll(fmt.Sprintf("static/%s", t.ID), 0755); err != nil {
					fmt.Println("mkdir err", err)
					return errors.New("mkdir err")
				}
				file, err := os.Create(fmt.Sprintf("static/%s/%s", t.ID, name))
				if err != nil {
					fmt.Println("create file err", err)
					return errors.New("create file err")
				}
				defer file.Close()

				_, err = io.Copy(file, res.Body)
				if err != nil {
					fmt.Println("copy err", err)
					return errors.New("copy err")
				}
				fmt.Println(name + " Success!")

				images = append(images, fmt.Sprintf("/static/%s/%s", t.ID, name))
				return nil
			})
		}
		if err := wg.Wait(); err != nil {
			fmt.Printf("wg err: %v\n", err)
		}

		if err := t.Update().SetImages(images).Exec(ctx); err != nil {
			fmt.Printf("update err: %v\n", err)
		}

	}
}

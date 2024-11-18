package main

import (
	"context"
	"fmt"

	lark "github.com/larksuite/oapi-sdk-go/v3"
	larkcore "github.com/larksuite/oapi-sdk-go/v3/core"
	larkbitable "github.com/larksuite/oapi-sdk-go/v3/service/bitable/v1"
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
)

func main() {
	ctx := context.Background()
	client := lark.NewClient(appId, appSecret)

	req := larkbitable.NewListAppTableRecordReqBuilder().AppToken(appToken).TableId(tenderTid).Build()
	resp, err := client.Bitable.AppTableRecord.List(ctx, req)
	if err != nil {
		panic(err)
	}
	if !resp.Success() {
		panic(resp.Error())
	}
	fmt.Println(larkcore.Prettify(resp.Data))
}

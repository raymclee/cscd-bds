package main

import (
	"context"
	"cscd-bds/store"
	"cscd-bds/store/ent"
	"cscd-bds/store/ent/schema/enum"
	"cscd-bds/store/ent/schema/zht"
	"cscd-bds/store/ent/user"
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql"
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

var (
	ctx    = context.Background()
	s      *store.Store
	client *lark.Client
)

func main() {
	client = lark.NewClient(appId, appSecret)
	s = store.NewStore()

	// fetchCustomer()

	// fetchSales()

}

func fetchSales() {
	req := larkbitable.NewListAppTableRecordReqBuilder().AppToken(appToken).TableId(salesTid).Build()
	resp, err := client.Bitable.AppTableRecord.List(ctx, req)
	if err != nil {
		panic(err)
	}
	if !resp.Success() {
		panic(resp.Error())
	}
	// fmt.Println(larkcore.Prettify(resp.Data))

	areas, err := s.Area.Query().All(ctx)
	if err != nil {
		panic(err)
	}

	for _, item := range resp.Data.Items {

		if v, ok := item.Fields["删除标识"]; ok && v != nil {
			continue
		}
		if v, ok := item.Fields["重复"]; ok && v != nil {
			continue
		}

		var area *ent.Area
		if a, ok := item.Fields["销售区域"]; ok {
			if v, ok := a.(string); ok {
				for _, a := range areas {
					if a.Name == v {
						area = a
						break
					}
				}
			}
		}

		var leader *ent.User
		if f, ok := item.Fields["销售leader"]; ok {
			if v, ok := f.([]interface{}); ok {
				for _, l := range v {
					if u, ok := l.(map[string]interface{}); ok {
						if username, ok := u["en_name"].(string); ok {
							leader, err = s.User.Query().Where(user.UsernameEQ((username))).Only(ctx)
							if err != nil {
								if ent.IsNotFound(err) {
									var zhtUser zht.User
									if name, ok := u["name"].(string); ok {
										zhtUser.Name = name
									}
									if email, ok := u["email"].(string); ok {
										zhtUser.Email = email
									}
									if username, ok := u["en_name"].(string); ok {
										zhtUser.Username = username
									}
									if openId, ok := u["id"].(string); ok {
										zhtUser.OpenId = openId
									}
									if avatarUrl, ok := u["avatar_url"].(string); ok {
										zhtUser.AvatarUrl = avatarUrl
									}
									if leader, err = s.User.Create().SetOpenID(zhtUser.OpenId).
										SetName(zhtUser.Name).
										SetUsername(zhtUser.Username).
										SetEmail(zhtUser.Email).
										SetAvatarURL(zhtUser.AvatarUrl).
										AddAreas(area).
										Save(ctx); err != nil {
										panic(err)
									}
									break
								}
								panic(fmt.Errorf("query user by username %s failed: %v", username, err))
							}
						}
					}
				}
			}
		}

		if f, ok := item.Fields["销售"]; ok {
			if v, ok := f.([]interface{}); ok {
				for _, l := range v {
					if u, ok := l.(map[string]interface{}); ok {
						var zhtUser zht.User
						if name, ok := u["name"].(string); ok {
							zhtUser.Name = name
						}
						if email, ok := u["email"].(string); ok {
							zhtUser.Email = email
						}
						if username, ok := u["en_name"].(string); ok {
							zhtUser.Username = username
						}
						if openId, ok := u["id"].(string); ok {
							zhtUser.OpenId = openId
						}
						if avatarUrl, ok := u["avatar_url"].(string); ok {
							zhtUser.AvatarUrl = avatarUrl
						}
						q := s.User.Create().
							SetOpenID(zhtUser.OpenId).
							SetName(zhtUser.Name).
							SetUsername(zhtUser.Username).
							SetEmail(zhtUser.Email).
							SetAvatarURL(zhtUser.AvatarUrl).
							AddAreas(area)
						if leader != nil {
							q.SetLeader(leader)
						}
						if err := q.
							OnConflict(sql.DoNothing()).
							Exec(ctx); err != nil {
							fmt.Println(err)
						}
					}
				}
			}
		}
	}
}

func fetchCustomer() {
	req := larkbitable.NewListAppTableRecordReqBuilder().AppToken(appToken).TableId(customerTid).Build()
	resp, err := client.Bitable.AppTableRecord.List(ctx, req)
	if err != nil {
		panic(err)
	}
	if !resp.Success() {
		panic(resp.Error())
	}
	fmt.Println(larkcore.Prettify(resp.Data))

	areas, err := s.Area.Query().All(ctx)
	if err != nil {
		panic(err)
	}

	for _, item := range resp.Data.Items {
		var (
			name                  string
			industry              int
			ownerType             int
			size                  *int
			contactPerson         *string
			contactPersonPosition *string
			contactPersonPhone    *string
			contactPersonEmail    *string
			updatedAt             *time.Time
			createdAt             *time.Time
			createdBy             *ent.User
			area                  *ent.Area
			sales                 *ent.User
		// salesLeader           *zht.User
		// createdBy             *zht.User
		)

		for _, a := range areas {
			if v, ok := item.Fields["地区"]; ok {
				if v, ok := v.(string); ok && v == a.Name {
					area = a
					break
				}
			} else {
				panic("地区字段不存在")
			}
		}

		if v, ok := item.Fields["是否重复客户"]; ok {
			if v != nil {
				continue
			}
		}
		if f, ok := item.Fields["删除标识"]; ok {
			if f != nil {
				continue
			}
		}

		if f, ok := item.Fields["客户名称"]; ok {
			if v, ok := f.(string); ok {
				name = v
			}
		}

		if f, ok := item.Fields["对接人姓名"]; ok {
			if v, ok := f.(string); ok {
				contactPerson = &v
			}
		}

		if f, ok := item.Fields["对接人职位"]; ok {
			if v, ok := f.(string); ok {
				contactPersonPosition = &v
			}
		}

		if f, ok := item.Fields["联系电话"]; ok {
			if v, ok := f.(string); ok {
				contactPersonPhone = &v
			}
		}

		if f, ok := item.Fields["对接人邮箱"]; ok {
			fmt.Printf("%T\n", f)
			if v, ok := f.(string); ok {
				contactPersonEmail = &v
			}
		}

		if f, ok := item.Fields["业主类型"]; ok {
			if v, ok := f.(string); ok {
				var ot enum.OwnerType
				if err := ot.Scan(v); err != nil {
					panic(err)
				}
				ownerType = int(ot)
			}
		}
		if f, ok := item.Fields["行业"]; ok {
			if v, ok := f.(string); ok {
				var in enum.Industry
				if err := in.Scan(v); err != nil {
					panic(err)
				}
				industry = int(in)
			}
		}
		if f, ok := item.Fields["客户规模"]; ok {
			if v, ok := f.(string); ok {
				switch v {
				case "<10":
					s := 1
					size = &s
				case "10-100":
					s := 2
					size = &s
				case "100-1000":
					s := 3
					size = &s
				case "1000-10000":
					s := 4
					size = &s
				case ">10000":
					s := 5
					size = &s
				}
			}
		}

		if f, ok := item.Fields["客户所有人"]; ok {
			if v, ok := f.([]interface{}); ok {
				for _, u := range v {
					if u, ok := u.(map[string]interface{}); ok {
						if username, ok := u["en_name"].(string); ok {
							sales, err = s.User.Query().Where(user.UsernameEQ(username)).Only(ctx)
							if err != nil {
								if ent.IsNotFound(err) {
									var zhtUser zht.User
									if name, ok := u["name"].(string); ok {
										zhtUser.Name = name
									}
									if email, ok := u["email"].(string); ok {
										zhtUser.Email = email
									}
									if username, ok := u["en_name"].(string); ok {
										zhtUser.Username = username
									}
									if openId, ok := u["id"].(string); ok {
										zhtUser.OpenId = openId
									}
									if avatarUrl, ok := u["avatar_url"].(string); ok {
										zhtUser.AvatarUrl = avatarUrl
									}
									if createdBy, err = s.User.Create().SetOpenID(zhtUser.OpenId).
										SetName(zhtUser.Name).
										SetUsername(zhtUser.Username).
										SetEmail(zhtUser.Email).
										SetAvatarURL(zhtUser.AvatarUrl).
										Save(ctx); err != nil {
										panic(err)
									}
								} else {

									panic(fmt.Errorf("query user by username %s failed: %v", username, err))
								}
							}
						}
					}
				}
			}
		}

		if f, ok := item.Fields["创建人"]; ok {
			if v, ok := f.(map[string]interface{}); ok {
				if username, ok := v["en_name"].(string); ok {
					createdBy, err = s.User.Query().Where(user.UsernameEQ(username)).Only(ctx)
					if err != nil {
						if ent.IsNotFound(err) {
							var zhtUser zht.User
							if name, ok := v["name"].(string); ok {
								zhtUser.Name = name
							}
							if email, ok := v["email"].(string); ok {
								zhtUser.Email = email
							}
							if username, ok := v["en_name"].(string); ok {
								zhtUser.Username = username
							}
							if openId, ok := v["id"].(string); ok {
								zhtUser.OpenId = openId
							}
							if avatarUrl, ok := v["avatar_url"].(string); ok {
								zhtUser.AvatarUrl = avatarUrl
							}
							if createdBy, err = s.User.Create().SetOpenID(zhtUser.OpenId).
								SetName(zhtUser.Name).
								SetUsername(zhtUser.Username).
								SetEmail(zhtUser.Email).
								SetAvatarURL(zhtUser.AvatarUrl).
								Save(ctx); err != nil {
								panic(err)
							}
						} else {
							panic(fmt.Errorf("query user by username %s failed: %v", username, err))
						}
					}
				}
			}
		}

		if f, ok := item.Fields["创建时间"]; ok {
			if v, ok := f.(float64); ok {
				t := time.UnixMilli(int64(v))
				createdAt = &t
			}
		}
		if f, ok := item.Fields["最后更新时间"]; ok {
			if v, ok := f.(float64); ok {
				t := time.UnixMilli(int64(v))
				updatedAt = &t
			}
		}

		// fmt.Println(industry, name, larkcore.Prettify(item))

		q := s.Customer.Create().
			SetArea(area).
			SetName(name).
			SetIndustry(int8(industry)).
			SetOwnerType(int8(ownerType)).
			SetNillableContactPerson(contactPerson).
			SetNillableContactPersonPosition(contactPersonPosition).
			SetNillableContactPersonPhone(contactPersonPhone).
			SetNillableContactPersonEmail(contactPersonEmail).
			SetCreatedBy(createdBy)

		if sales != nil {
			q.SetSales(sales)
		}
		if size != nil {
			q.SetSize(int8(*size))
		}
		if createdAt != nil {
			q.SetCreatedAt(*createdAt)
		}
		if updatedAt != nil {
			q.SetUpdatedAt(*updatedAt)
		}
		if err := q.
			SaveX(ctx); err != nil {
			fmt.Println(err)
		}
	}

}

func fetchArea() {
	req := larkbitable.NewListAppTableRecordReqBuilder().AppToken(appToken).TableId(areaTid).Build()
	resp, err := client.Bitable.AppTableRecord.List(ctx, req)
	if err != nil {
		panic(err)
	}
	if !resp.Success() {
		panic(resp.Error())
	}
	fmt.Println(larkcore.Prettify(resp.Data))

	for _, item := range resp.Data.Items {
		var (
			code  string
			name  string
			sales []zht.User
		)

		if f, ok := item.Fields["销售区域"]; ok {
			if v, ok := f.(string); ok {
				name = v
			}
		}

		if f, ok := item.Fields["区域代码"]; ok {
			if v, ok := f.(string); ok {
				code = v
			}
		}

		if f, ok := item.Fields["销售团队成员"]; ok {
			if v, ok := f.(map[string]interface{}); ok {
				if users, ok := v["users"]; ok {
					if u, ok := users.([]interface{}); ok {
						for _, user := range u {
							if u, ok := user.(map[string]interface{}); ok {
								var zhtUser zht.User
								if name, ok := u["name"].(string); ok {
									zhtUser.Name = name
								}
								if email, ok := u["email"].(string); ok {
									zhtUser.Email = email
								}
								if username, ok := u["enName"].(string); ok {
									zhtUser.Username = username
								}
								if openId, ok := u["id"].(string); ok {
									zhtUser.OpenId = openId
								}
								if avatarUrl, ok := u["avatar_url"].(string); ok {
									zhtUser.AvatarUrl = avatarUrl
								}
								sales = append(sales, zhtUser)
							}
						}
					}
				}
			}
		}

		if err := s.Area.Create().SetCode(code).SetName(name).SaveX(ctx); err != nil {
			fmt.Println(err)
		}
	}
}

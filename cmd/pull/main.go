package main

import (
	"context"
	"cscd-bds/store"
	"cscd-bds/store/ent"
	"cscd-bds/store/ent/area"
	"cscd-bds/store/ent/customer"
	"cscd-bds/store/ent/province"
	"cscd-bds/store/ent/schema/enum"
	"cscd-bds/store/ent/schema/geo"
	"cscd-bds/store/ent/schema/zht"
	"cscd-bds/store/ent/tender"
	"cscd-bds/store/ent/user"
	"encoding/json"
	"fmt"
	"log"
	"strconv"
	"strings"
	"time"

	lark "github.com/larksuite/oapi-sdk-go/v3"
	larkauth "github.com/larksuite/oapi-sdk-go/v3/service/auth/v3"
	larkbitable "github.com/larksuite/oapi-sdk-go/v3/service/bitable/v1"
	"github.com/twpayne/go-geom"
	"github.com/twpayne/go-geom/encoding/geojson"
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
	fetchTender()
	fetchVisitRecord()
	// fetchCompetitor()

}

func fetchCompetitor() {
	req := larkbitable.NewListAppTableRecordReqBuilder().AppToken(appToken).TableId(competitorTid).Build()
	resp, err := client.Bitable.AppTableRecord.List(ctx, req)
	if err != nil {
		panic(err)
	}
	if !resp.Success() {
		panic(resp.Error())
	}

	for _, item := range resp.Data.Items {
		fmt.Println(item.Fields)

		var (
			shortName string
			name      string
		)

		if f, ok := item.Fields["简称"]; ok {
			if v, ok := f.(string); ok {
				shortName = v
			}
		}

		if f, ok := item.Fields["企业名称"]; ok {
			if v, ok := f.(string); ok {
				name = v
			}
		}

		if shortName == "" || name == "" {
			continue
		}

		s.Competitor.Create().SetShortName(shortName).SetName(name).Exec(ctx)
	}
}

func fetchVisitRecord() {
	req := larkbitable.NewListAppTableRecordReqBuilder().AppToken(appToken).TableId(visitRecordTid).Build()
	resp, err := client.Bitable.AppTableRecord.List(ctx, req)
	if err != nil {
		panic(err)
	}
	if !resp.Success() {
		panic(resp.Error())
	}
	// fmt.Println(larkcore.Prettify(resp.Data))

	for _, item := range resp.Data.Items {
		if f, ok := item.Fields["删除标识"]; ok && f != nil {
			continue
		}

		var (
			commPeople string
			visitType  int
			date       time.Time
			tend       *ent.Tender
			cust       *ent.Customer
			content    string
			nextStep   *string
			updatedAt  *time.Time
			createdAt  *time.Time
			users      []*ent.User
		)

		if f, ok := item.Fields["沟通对象"]; ok {
			if v, ok := f.(string); ok {
				commPeople = v
			}
		}

		if commPeople == "" {
			continue
		}

		if f, ok := item.Fields["跟进形式"]; ok {
			if v, ok := f.(string); ok {
				if v == "现场拜访" {
					visitType = 1
				}
				if v == "线上会议" {
					visitType = 2
				}
			}
		}

		if f, ok := item.Fields["跟进时间"]; ok {
			if v, ok := f.(float64); ok {
				date = time.UnixMilli(int64(v))
			}
		}

		if f, ok := item.Fields["备案编码"]; ok {
			if v, ok := f.([]interface{}); ok {
				for _, i := range v {
					if i, ok := i.(map[string]interface{}); ok {
						if v, ok := i["text"]; ok {
							if v, ok := v.(string); ok {
								req := larkbitable.NewSearchAppTableRecordReqBuilder().
									AppToken(appToken).
									TableId(tenderTid).
									Body(larkbitable.NewSearchAppTableRecordReqBodyBuilder().
										FieldNames([]string{`备案编码`}).
										Filter(larkbitable.NewFilterInfoBuilder().
											Conjunction(`and`).
											Conditions([]*larkbitable.Condition{
												larkbitable.NewConditionBuilder().
													FieldName(`数据ID`).
													Operator(`is`).
													Value([]string{v[len(v)-3:]}).
													Build(),
											}).
											Build()).
										Build()).
									Build()
								resp, err := client.Bitable.AppTableRecord.Search(ctx, req)
								if err != nil {
									fmt.Println(err)
									continue
								}
								if !resp.Success() {
									fmt.Println(resp.Error())
									continue
								}

								var code string
								for _, item := range resp.Data.Items {
									if f, ok := item.Fields["备案编码"]; ok {
										if v, ok := f.([]interface{}); ok {
											for _, i := range v {
												if i, ok := i.(map[string]interface{}); ok {
													if v, ok := i["text"]; ok {
														if v, ok := v.(string); ok {
															code = v
														}
													}
												}
											}
										}
									}
								}

								tend, err = s.Tender.Query().Where(tender.CodeEQ(code)).Only(ctx)
								if err != nil {
									continue
								}
							}
						}
					}
				}
			}
		}

		if f, ok := item.Fields["沟通内容"]; ok {
			if v, ok := f.(string); ok {
				content = v
			}
		}

		if f, ok := item.Fields["跟进客户"]; ok {
			if v, ok := f.([]interface{}); ok {
				for _, i := range v {
					if i, ok := i.(map[string]interface{}); ok {
						if v, ok := i["text"]; ok {
							if v, ok := v.(string); ok {
								cust, err = s.Customer.Query().Where(customer.NameEQ(v)).Only(ctx)
								if err != nil {
									fmt.Println(err)
									continue
								}
							}
						}
					}
				}
			}
		}

		if f, ok := item.Fields["下一步计划"]; ok {
			if v, ok := f.(string); ok {
				nextStep = &v
			}
		}

		if f, ok := item.Fields["更新时间"]; ok {
			if v, ok := f.(float64); ok {
				t := time.UnixMilli(int64(v))
				updatedAt = &t
				createdAt = &t
			}
		}

		if f, ok := item.Fields["跟进人员"]; ok {
			if v, ok := f.([]interface{}); ok {
				u, err := processUser(v)
				if err != nil {
					fmt.Println(err)
					panic(err)
				}
				if u != nil {
					users = append(users, u)
				}
			}
		}

		if tend == nil || cust == nil {
			continue
		}

		// fmt.Println(commPeople, visitType, date, are, tend, content, nextStep, updatedAt, createdAt, users, cust)
		q := s.VisitRecord.Create().SetCommContent(content).SetCommPeople(commPeople).SetVisitType(visitType).SetDate(date).SetNillableNextStep(nextStep).SetNillableUpdatedAt(updatedAt).SetNillableCreatedAt(createdAt).SetTender(tend).SetCustomer(cust)

		if len(users) > 0 {
			q.AddFollowUpBys(users...)
		}
		if err := q.Exec(ctx); err != nil {
			// panic(err)
			fmt.Println(err)
		}

	}
}

func fetchTender() {
	// httpClient := &http.Client{}

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

	areas, err := s.Area.Query().All(ctx)
	if err != nil {
		panic(err)
	}

	for _, item := range resp.Data.Items {
		var (
			code          string
			name          string
			status        int
			tenderDate    *time.Time
			discoveryDate time.Time
			address       *string
			fullAddress   *string
			contractor    *string

			// photos                               []interface{}
			sizeAndValueRating                   *int
			sizeAndValueRatingOverview           *string
			creditAndPaymentRating               *int
			creditAndPaymentRatingOverview       *string
			timeLimitRating                      *int
			timeLimitRatingOverview              *string
			customerRelationshipRating           *int
			customerRelationshipRatingOverview   *string
			competitivePartnershipRating         *int
			competitivePartnershipRatingOverview *string
			estimatedAmount                      *float64
			prepareToBid                         bool = false
			currentProgress                      *string
			projectCode                          *string
			projectDefinition                    *string
			estimatedProjectStartDate            *time.Time
			estimatedProjectEndDate              *time.Time
			projectType                          *string
			tenderSituations                     *string
			ownerSituation                       *string
			costEngineer                         *string
			biddingInstructions                  *string
			competitorSituation                  *string
			contractForm                         *string
			tenderForm                           *string
			remark                               *string
			tenderingAgency                      *string
			managementCompany                    *string
			designUnit                           *string
			keyProject                           = false
			consultingFirm                       *string
			facadeConsultant                     *string
			biddingDate                          *time.Time
			createdAt                            *time.Time
			updatedAt                            *time.Time
			coordinate                           *geo.GeoJson
			followingSales                       *ent.User
			prov                                 *ent.Province
			cit                                  *ent.City
			distr                                *ent.District
			are                                  *ent.Area
			cust                                 *ent.Customer
			finder                               *ent.User
			createdBy                            *ent.User

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

		if f, ok := item.Fields["商机发现日期"]; ok {
			if v, ok := f.(float64); ok {
				discoveryDate = time.UnixMilli(int64(v))
			}
		}

		if f, ok := item.Fields["商机状态"]; ok && f != nil {
			if v, ok := f.(string); ok {
				var ts enum.TenderStatus
				if err := ts.Scan(v); err != nil {
					panic(err)
				}
				status = int(ts)
			}
		}

		{
			var p, c, d string
			if f, ok := item.Fields["省"]; ok {
				if v, ok := f.([]interface{}); ok {
					for _, i := range v {
						if i, ok := i.(map[string]interface{}); ok {
							if v, ok := i["text"].(string); ok {
								p = v
							}
						}
					}
				}
			}
			if f, ok := item.Fields["市"]; ok {
				if v, ok := f.([]interface{}); ok {
					for _, i := range v {
						if i, ok := i.(map[string]interface{}); ok {
							if v, ok := i["text"].(string); ok {
								c = v
							}
						}
					}
				}
			}
			if f, ok := item.Fields["区"]; ok {
				if v, ok := f.([]interface{}); ok {
					for _, i := range v {
						if i, ok := i.(map[string]interface{}); ok {
							if v, ok := i["text"].(string); ok {
								d = v
							}
						}
					}
				}
			}
			if p != "" && d != "" && c != "" {
				prov, err = s.Province.Query().Where(province.NameEQ(p)).WithCities().WithDistricts().Only(ctx)
				if err != nil {
					panic(err)
				}
				for _, city := range prov.Edges.Cities {
					if city != nil {
						if city.Name == c {
							cit = city
							break
						}
					}
				}
				for _, district := range prov.Edges.Districts {
					if district != nil {
						if district.Name == d {
							distr = district
							break
						}
					}
				}
			}
		}

		if f, ok := item.Fields["竞争合作关系-评分（5分制）"]; ok {
			if v, ok := f.(string); ok {
				v, err := strconv.Atoi(v)
				if err != nil {
					panic(err)
				}
				if v > 0 {
					competitivePartnershipRating = &v
				}
			}
		}

		if f, ok := item.Fields["地理位置"]; ok {
			if v, ok := f.(map[string]interface{}); ok {
				if v, ok := v["address"].(string); ok {
					address = &v
				}
				if v, ok := v["full_address"].(string); ok {
					fullAddress = &v
				}
				if v, ok := v["location"]; ok {
					if v, ok := v.(string); ok {
						coord := strings.Split(v, ",")
						lat, _ := strconv.ParseFloat(coord[0], 64)
						lon, _ := strconv.ParseFloat(coord[1], 64)
						if len(coord) == 2 {
							center, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{lon, lat}).SetSRID(4326))
							if err != nil {
								panic(err)
							}
							coordinate = &geo.GeoJson{Geometry: center}
						}
					}
				}
			}
		}

		if f, ok := item.Fields["当前跟踪人"]; ok {
			if v, ok := f.([]interface{}); ok {
				for _, u := range v {
					followingSales, err = processUser(u)
					if err != nil {
						panic(err)
					}
					if followingSales != nil {
						break
					}
				}
			}
		}

		if f, ok := item.Fields["总包单位"]; ok {
			if v, ok := f.(string); ok {
				contractor = &v
			}
		}

		if f, ok := item.Fields["资信及付款-概述"]; ok {
			if v, ok := f.(string); ok {
				creditAndPaymentRatingOverview = &v
			}
		}

		if f, ok := item.Fields["规模及价值-评分（5分制）"]; ok {
			if v, ok := f.(string); ok {
				v, err := strconv.Atoi(v)
				if err != nil {
					panic(err)
				}
				if v > 0 {
					sizeAndValueRating = &v
				}
			}
		}

		if f, ok := item.Fields["项目主要情况"]; ok {
			if v, ok := f.(string); ok {
				tenderSituations = &v
			}
		}

		if f, ok := item.Fields["预计金额"]; ok {
			if v, ok := f.(string); ok {
				v, err := strconv.ParseFloat(v, 64)
				if err != nil {
					panic(err)
				}
				estimatedAmount = &v
			}
		}

		if f, ok := item.Fields["业主名称"]; ok {
			if v, ok := f.([]interface{}); ok {
				for _, u := range v {
					if u, ok := u.(map[string]interface{}); ok {
						if t, ok := u["text"].(string); ok {
							cust, err = s.Customer.Query().Where(customer.NameEQ(t)).Only(ctx)
							if err != nil {
								if ent.IsNotFound(err) {
									continue
								}
								panic(err)
							}
						}
					}
				}
			}
		}

		if f, ok := item.Fields["中标原则及时限-概述"]; ok {
			if v, ok := f.(string); ok {
				timeLimitRatingOverview = &v
			}
		}

		if f, ok := item.Fields["经纬度"]; ok {
			if v, ok := f.(map[string]interface{}); ok {
				if u, ok := v["text"]; ok {
					if u, ok := u.(string); ok {
						coord := strings.Split(u, ",")
						lat, _ := strconv.ParseFloat(coord[0], 64)
						lon, _ := strconv.ParseFloat(coord[1], 64)
						if len(coord) == 2 {
							center, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{lon, lat}).SetSRID(4326))
							if err != nil {
								panic(err)
							}
							coordinate = &geo.GeoJson{Geometry: center}
						}
					}
				}
			}
		}

		if f, ok := item.Fields["立项/投标说明"]; ok {
			if v, ok := f.(string); ok {
				biddingInstructions = &v
			}
		}

		if f, ok := item.Fields["竞争对手情况"]; ok {
			if v, ok := f.(string); ok {
				competitorSituation = &v
			}
		}

		if f, ok := item.Fields["造价师"]; ok {
			if v, ok := f.(string); ok {
				costEngineer = &v
			}
		}

		if f, ok := item.Fields["业务区域"]; ok {
			if v, ok := f.(string); ok {
				for _, a := range areas {
					if a.Name == v {
						are = a
						break
					}
				}
			}
		} else {
			continue
		}

		if f, ok := item.Fields["商机发现日期"]; ok {
			if v, ok := f.(float64); ok {
				t := time.UnixMilli(int64(v))
				discoveryDate = t
			}
		}

		if f, ok := item.Fields["备注"]; ok {
			if v, ok := f.(string); ok {
				remark = &v
			}
		}

		if f, ok := item.Fields["项目代码"]; ok {
			if v, ok := f.(string); ok {
				projectCode = &v
			}
		}

		if f, ok := item.Fields["客情关系-评分（5分制）"]; ok {
			if v, ok := f.(string); ok {
				v, err := strconv.Atoi(v)
				if err != nil {
					panic(err)
				}
				if v > 0 {
					customerRelationshipRating = &v
				}
			}
		}

		if f, ok := item.Fields["招采形式"]; ok {
			if v, ok := f.(string); ok {
				tenderForm = &v
			}
		}

		if f, ok := item.Fields["资信及付款-评分（5分制）"]; ok {
			if v, ok := f.(string); ok {
				v, err := strconv.Atoi(v)
				if err != nil {
					panic(err)
				}
				if v > 0 {
					creditAndPaymentRating = &v
				}
			}
		}

		if f, ok := item.Fields["项目预计结束日期"]; ok {
			if v, ok := f.(float64); ok {
				t := time.UnixMilli(int64(v))
				estimatedProjectEndDate = &t
			}
		}

		if f, ok := item.Fields["创建日期"]; ok {
			if v, ok := f.(float64); ok {
				t := time.UnixMilli(int64(v))
				createdAt = &t
			}
		}

		if f, ok := item.Fields["合同形式"]; ok {
			if v, ok := f.(string); ok {
				contractForm = &v
			}
		}

		if f, ok := item.Fields["招标日期"]; ok {
			if v, ok := f.(float64); ok {
				t := time.UnixMilli(int64(v))
				tenderDate = &t
			}
		}

		if f, ok := item.Fields["预计项目开始日期"]; ok {
			if v, ok := f.(float64); ok {
				t := time.UnixMilli(int64(v))
				estimatedProjectStartDate = &t
			}
		}

		if f, ok := item.Fields["管理公司"]; ok {
			if v, ok := f.(string); ok {
				managementCompany = &v
			}
		}

		if f, ok := item.Fields["准备投标"]; ok {
			if v, ok := f.(bool); ok {
				prepareToBid = v
			}
		}

		if f, ok := item.Fields["客情关系-概述"]; ok {
			if v, ok := f.(string); ok {
				customerRelationshipRatingOverview = &v
			}
		}

		if f, ok := item.Fields["招标代理"]; ok {
			if v, ok := f.(string); ok {
				tenderingAgency = &v
			}
		}

		if f, ok := item.Fields["竞争合作关系-评分（5分制）"]; ok {
			if v, ok := f.(string); ok {
				v, err := strconv.Atoi(v)
				if err != nil {
					panic(err)
				}
				if v > 0 {
					competitivePartnershipRating = &v
				}
			}
		}

		if f, ok := item.Fields["投标时间"]; ok {
			if v, ok := f.(float64); ok {
				t := time.UnixMilli(int64(v))
				biddingDate = &t
			}
		}

		if f, ok := item.Fields["业主主要情况"]; ok {
			if v, ok := f.(string); ok {
				ownerSituation = &v
			}
		}

		if f, ok := item.Fields["中标原则及时限-评分（5分制）"]; ok {
			if v, ok := f.(string); ok {
				v, err := strconv.Atoi(v)
				if err != nil {
					panic(err)
				}
				if v > 0 {
					timeLimitRating = &v
				}
			}
		}

		if f, ok := item.Fields["创建人"]; ok {
			createdBy, err = processUser(f)
			if err != nil {
				panic(err)
			}
		}

		if f, ok := item.Fields["幕墙顾问"]; ok {
			if v, ok := f.(string); ok {
				facadeConsultant = &v
			}
		}

		if f, ok := item.Fields["竞争合作关系-概述"]; ok {
			if v, ok := f.(string); ok {
				competitivePartnershipRatingOverview = &v
			}
		}

		if f, ok := item.Fields["规模及价值-概述"]; ok {
			if v, ok := f.(string); ok {
				sizeAndValueRatingOverview = &v
			}
		}

		if f, ok := item.Fields["设计单位"]; ok {
			if v, ok := f.(string); ok {
				designUnit = &v
			}
		}

		if f, ok := item.Fields["咨询公司"]; ok {
			if v, ok := f.(string); ok {
				consultingFirm = &v
			}
		}

		if f, ok := item.Fields["重点跟进项目"]; ok {
			if v, ok := f.(bool); ok {
				keyProject = v
			}
		}

		if f, ok := item.Fields["当前进展"]; ok {
			if v, ok := f.(string); ok {
				currentProgress = &v
			}
		}

		if f, ok := item.Fields["项目名称"]; ok {
			if v, ok := f.(string); ok {
				name = v
			}
		}

		if f, ok := item.Fields["项目定义"]; ok {
			if v, ok := f.(string); ok {
				projectDefinition = &v
			}
		}

		if f, ok := item.Fields["项目类型"]; ok {
			if v, ok := f.(string); ok {
				projectType = &v
			}
		}

		if f, ok := item.Fields["商机发现人"]; ok {
			if v, ok := f.([]interface{}); ok {
				for _, u := range v {
					finder, err = processUser(u)
					if err != nil {
						panic(err)
					}
					if finder != nil {
						break
					}
				}
			}
		}

		if are == nil || prov == nil || distr == nil || coordinate == nil || cust == nil {
			continue
		}

		// if f, ok := item.Fields["效果图"]; ok {
		// 	ps, ok := f.([]interface{})
		// 	if !ok {
		// 		continue
		// 	}
		// 	photos = ps
		// }

		// fmt.Println(code, status, name, estimatedAmount, tenderDate, discoveryDate, prov, cit, distr)

		q := s.Tender.Create().
			SetCode(code).
			SetName(name).
			SetStatus(status).
			SetNillableTenderDate(tenderDate).
			SetDiscoveryDate(discoveryDate).
			SetNillableAddress(address).
			SetNillableFullAddress(fullAddress).
			SetNillableContractor(contractor).
			SetNillableSizeAndValueRatingOverview(sizeAndValueRatingOverview).
			SetNillableCreditAndPaymentRatingOverview(creditAndPaymentRatingOverview).
			SetNillableTimeLimitRatingOverview(timeLimitRatingOverview).
			SetNillableCustomerRelationshipRatingOverview(customerRelationshipRatingOverview).
			SetNillableCompetitivePartnershipRatingOverview(competitivePartnershipRatingOverview).
			SetNillableEstimatedAmount(estimatedAmount).
			SetPrepareToBid(prepareToBid).
			SetNillableProjectCode(projectCode).
			SetNillableProjectDefinition(projectDefinition).
			SetNillableEstimatedProjectStartDate(estimatedProjectStartDate).
			SetNillableEstimatedProjectEndDate(estimatedProjectEndDate).
			SetNillableProjectType(projectType).
			SetNillableTenderSituations(tenderSituations).
			SetNillableCostEngineer(costEngineer).
			SetNillableBiddingInstructions(biddingInstructions).
			SetNillableContractForm(contractForm).
			SetNillableTenderForm(tenderForm).
			SetNillableRemark(remark).
			SetNillableTenderingAgency(tenderingAgency).
			SetNillableManagementCompany(managementCompany).
			SetNillableDesignUnit(designUnit).
			SetKeyProject(keyProject).
			SetNillableCurrentProgress(currentProgress).
			SetNillableConsultingFirm(consultingFirm).
			SetNillableFacadeConsultant(facadeConsultant).
			SetNillableBiddingDate(biddingDate).
			SetNillableCreatedAt(createdAt).
			SetNillableUpdatedAt(updatedAt).
			SetGeoCoordinate(coordinate).
			SetArea(are).
			SetProvince(prov).
			SetDistrict(distr).
			SetCustomer(cust).
			SetNillableSizeAndValueRating(sizeAndValueRating).
			SetNillableCreditAndPaymentRating(creditAndPaymentRating).
			SetNillableTimeLimitRating(timeLimitRating).
			SetNillableCustomerRelationshipRating(customerRelationshipRating).
			SetNillableCompetitivePartnershipRating(competitivePartnershipRating)

		if ownerSituation != nil {
			q.SetOwnerSituations(*ownerSituation)
		}
		if competitorSituation != nil {
			q.SetCompetitorSituations(*competitorSituation)
		}
		if finder != nil {
			q.SetFinder(finder)
		}
		if createdBy != nil {
			q.SetCreatedBy(createdBy)
		}

		if followingSales != nil {
			q.AddFollowingSales(followingSales)
		}

		if cit != nil {
			q.SetCity(cit)
		}
		if len(images) > 0 {
			q.SetImages(images)
		}

		if err := q.OnConflictColumns(tender.FieldCode).UpdateNewValues().Exec(ctx); err != nil {
			fmt.Printf("update err: %v\n", err)
		}

		// t, err := s.Tender.Query().Where(tender.Code(code)).Only(ctx)
		// if err != nil {
		// 	fmt.Printf("query tender err: %v\n", err)
		// 	continue
		// }

		// wg := errgroup.Group{}
		// for _, photo := range photos {
		// 	fmt.Println("photo", photo)
		// 	wg.Go(func() error {
		// 		// id := xid.New().String()
		// 		p, ok := photo.(map[string]interface{})
		// 		if !ok {
		// 			fmt.Println("photo is not a map")
		// 			return errors.New("photo is not a map")
		// 		}
		// 		url, ok := p["url"].(string)
		// 		if !ok {
		// 			fmt.Println("url is not a string")
		// 			return errors.New("url is not a string")
		// 		}
		// 		name, ok := p["name"].(string)
		// 		if !ok {
		// 			fmt.Println("name is not a string")
		// 			return errors.New("name is not a string")
		// 		}

		// 		req, err := http.NewRequest("GET", url, nil)
		// 		if err != nil {
		// 			fmt.Println("req err", err)
		// 			return errors.New("req err")
		// 		}
		// 		req.Header.Set("Authorization", "Bearer "+out.TenantAccessToken)
		// 		res, err := httpClient.Do(req)
		// 		if err != nil {
		// 			fmt.Println("res err", err)
		// 			return errors.New("res err")
		// 		}
		// 		defer res.Body.Close()

		// 		// splited := strings.Split(name, ".")
		// 		if err := os.MkdirAll(fmt.Sprintf("static/%s", t.ID), 0755); err != nil {
		// 			fmt.Println("mkdir err", err)
		// 			return errors.New("mkdir err")
		// 		}
		// 		file, err := os.Create(fmt.Sprintf("static/%s/%s", t.ID, name))
		// 		if err != nil {
		// 			fmt.Println("create file err", err)
		// 			return errors.New("create file err")
		// 		}
		// 		defer file.Close()

		// 		_, err = io.Copy(file, res.Body)
		// 		if err != nil {
		// 			fmt.Println("copy err", err)
		// 			return errors.New("copy err")
		// 		}
		// 		fmt.Println(name + " Success!")

		// 		images = append(images, fmt.Sprintf("/static/%s/%s", t.ID, name))
		// 		return nil
		// 	})
		// }
		// if err := wg.Wait(); err != nil {
		// 	fmt.Printf("wg err: %v\n", err)
		// }

		// if err := t.Update().SetImages(images).Exec(ctx); err != nil {
		// 	fmt.Printf("update err: %v\n", err)
		// }

	}
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
								} else {
									panic(fmt.Errorf("query user by username %s failed: %v", username, err))
								}
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
							OnConflictColumns(user.FieldOpenID).
							UpdateNewValues().
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
	// fmt.Println(larkcore.Prettify(resp.Data))

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
			}
		}

		if area == nil {
			continue
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
			SetIndustry(industry).
			SetOwnerType(ownerType).
			SetNillableContactPerson(contactPerson).
			SetNillableContactPersonPosition(contactPersonPosition).
			SetNillableContactPersonPhone(contactPersonPhone).
			SetNillableContactPersonEmail(contactPersonEmail).
			SetCreatedBy(createdBy).
			SetNillableSize(size)

		if sales != nil {
			q.SetSales(sales)
		}
		if createdAt != nil {
			q.SetCreatedAt(*createdAt)
		}
		if updatedAt != nil {
			q.SetUpdatedAt(*updatedAt)
		}
		if err := q.OnConflictColumns(customer.FieldName, customer.FieldAreaID).UpdateNewValues().
			Exec(ctx); err != nil {
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
	// fmt.Println(larkcore.Prettify(resp.Data))

	for _, item := range resp.Data.Items {
		var (
			code      string
			name      string
			sales     []zht.User
			center    *geo.GeoJson
			prIds     []int
			provinces []*ent.Province
		)

		if f, ok := item.Fields["销售区域"]; ok {
			if v, ok := f.(string); ok {
				name = v
			}
		}

		if f, ok := item.Fields["区域代码"]; ok {
			if v, ok := f.(string); ok {
				code = v
				switch code {
				case "HD":
					pt, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{32.688899, 119.008879}).SetSRID(4326))
					if err != nil {
						panic(err)
					}
					center = &geo.GeoJson{Geometry: pt}
					prIds = []int{320000, 310000, 340000, 330000, 410000}
				case "HN":
					pt, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{28.03419, 112.186512}).SetSRID(4326))
					if err != nil {
						panic(err)
					}
					center = &geo.GeoJson{Geometry: pt}
					prIds = []int{
						430000, 350000, 440000, 450000, 360000, 420000, 460000, 710000,
					}
				case "XB":
					pt, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{36.876121, 90.986153}).SetSRID(4326))
					if err != nil {
						panic(err)
					}
					center = &geo.GeoJson{Geometry: pt}
					prIds = []int{
						540000, 650000, 620000, 630000, 510000, 530000, 640000, 610000, 500000, 520000,
					}
				case "HB":
					pt, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{42.021244, 116.136142}).SetSRID(4326))
					if err != nil {
						panic(err)
					}
					center = &geo.GeoJson{Geometry: pt}
					prIds = []int{
						150000, 230000, 220000, 210000, 110000, 130000, 140000, 120000, 370000,
					}
				case "GA":
					pt, err := geojson.Encode(geom.NewPoint(geom.XY).MustSetCoords(geom.Coord{22.385247, 114.183583}).SetSRID(4326))
					if err != nil {
						panic(err)
					}
					center = &geo.GeoJson{Geometry: pt}
					prIds = []int{
						810000, 820000,
					}
				}
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

		provinces, err := s.Province.Query().Where(province.AdcodeIn(prIds...)).All(ctx)
		if err != nil {
			panic(err)
		}
		if err := s.Area.Create().SetCode(code).SetName(name).SetCenter(center).AddProvinces(provinces...).OnConflictColumns(area.FieldCode).UpdateNewValues().Exec(ctx); err != nil {
			fmt.Println(err)
		}
	}
}

func processUser(f interface{}) (*ent.User, error) {
	var us *ent.User
	var err error
	if u, ok := f.(map[string]interface{}); ok {
		if username, ok := u["en_name"].(string); ok {
			us, err = s.User.Query().Where(user.UsernameEQ(username)).Only(ctx)
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
					if us, err = s.User.Create().SetOpenID(zhtUser.OpenId).
						SetName(zhtUser.Name).
						SetUsername(zhtUser.Username).
						SetEmail(zhtUser.Email).
						SetAvatarURL(zhtUser.AvatarUrl).
						Save(ctx); err != nil {
						panic(err)
					}
				}
			}
		}
	}
	return us, err
}

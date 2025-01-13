package main

import (
	"bytes"
	"context"
	"cscd-bds/store"
	"cscd-bds/store/ent/project"
	"cscd-bds/store/ent/projectstaff"
	"database/sql"
	"flag"
	"fmt"
	"io"
	"os"
	"time"

	_ "github.com/SAP/go-hdb/driver"
	_ "github.com/microsoft/go-mssqldb"
)

const (
	STG_HOST     = "10.1.8.37"
	STG_PORT     = 1433
	STG_USER     = "bi830"
	STG_PASSWORD = "Csci!830"
	STG_DATABASE = "BI_STG_830"

	CW_HOST     = "10.106.8.130"
	CW_PORT     = 1433
	CW_USER     = "bi830"
	CW_PASSWORD = "dW@102019"
	CW_DATABASE = "FEHK830"

	BWP_HANA_HOST     = "10.148.7.4"
	BWP_HANA_PORT     = 30044
	BWP_HANA_USER     = "SAPHANADB"
	BWP_HANA_PASSWORD = "Sap2cool"
	BWP_HANA_DATABASE = "SAPHANADB"

	S4P_HANA_HOST     = "10.148.7.17"
	S4P_HANA_PORT     = 30015
	S4P_HANA_USER     = "SAPHANADB"
	S4P_HANA_PASSWORD = "Sap2cool"
	S4P_HANA_DATABASE = "SAPHANADB"
)

var (
	materials = []string{"011", "013", "022", "024"}
)

func main() {
	imgFlag := flag.Bool("image", false, "fetch image")
	workingFlag := flag.Bool("working", false, "fetch working")
	flag.Parse()

	ctx := context.Background()

	stgDb, err := sql.Open("sqlserver", fmt.Sprintf("sqlserver://%s:%s@%s:%d?database=%s&connection+timeout=30", STG_USER, STG_PASSWORD, STG_HOST, STG_PORT, STG_DATABASE))
	if err != nil {
		panic(err)
	}
	defer stgDb.Close()

	err = stgDb.PingContext(ctx)
	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to STG DB")

	cwDb, err := sql.Open("sqlserver", fmt.Sprintf("sqlserver://%s:%s@%s:%d?database=%s&connection+timeout=30", CW_USER, CW_PASSWORD, CW_HOST, CW_PORT, CW_DATABASE))
	if err != nil {
		panic(err)
	}
	defer cwDb.Close()

	err = cwDb.PingContext(ctx)
	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to CW DB")

	bwpHanaDb, err := sql.Open("hdb", fmt.Sprintf("hdb://%s:%s@%s:%d", BWP_HANA_USER, BWP_HANA_PASSWORD, BWP_HANA_HOST, BWP_HANA_PORT))
	if err != nil {
		panic(err)
	}
	defer bwpHanaDb.Close()

	err = bwpHanaDb.PingContext(ctx)
	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to BWP HANA DB")

	s4pHanaDb, err := sql.Open("hdb", fmt.Sprintf("hdb://%s:%s@%s:%d", S4P_HANA_USER, S4P_HANA_PASSWORD, S4P_HANA_HOST, S4P_HANA_PORT))
	if err != nil {
		panic(err)
	}
	defer s4pHanaDb.Close()

	err = s4pHanaDb.PingContext(ctx)
	if err != nil {
		panic(err)
	}
	fmt.Println("Connected to S4P HANA DB")

	s := store.New(false)

	today := time.Now()

	rows, err := stgDb.Query(`
		SELECT 
			jobcode,
			jobname,
			jobmgr,
			owner,
			jzs,
			mcn,
			conslt,
			areas,
			fsdate,
			opdate,
			finishedflag,
			startdate,
			enddate,
			mntyr,
			cntrtsum
		FROM mst_jobbasfil
		where 1=1
		and pk_corp='2837' and finishedflag in ('N','Y')
		AND JOBTYPE='J'
	`)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	for rows.Next() {
		// wg.Go(func() error {

		var (
			jobcode      *string
			jobname      *string
			jobmgr       *string
			owner        *string
			jzs          *string
			mcn          *string
			conslt       *string
			areas        *string
			fsdate       *time.Time
			opdate       *time.Time
			finishedflag string
			startdate    *time.Time
			enddate      *time.Time
			mntyr        *string
			cntrtsum     *float64
		)
		err := rows.Scan(
			&jobcode, &jobname, &jobmgr, &owner, &jzs, &mcn, &conslt, &areas,
			&fsdate, &opdate, &finishedflag, &startdate, &enddate, &mntyr, &cntrtsum,
		)
		if err != nil {
			fmt.Printf("扫描失败: %s\n", err.Error())
		}

		if jobcode == nil {
			continue
		}

		isFinished := finishedflag == "Y"

		p := s.Project.Create().
			SetCode(*jobcode).
			SetNillableName(jobname).
			SetIsFinished(isFinished).
			SetNillableManager(jobmgr).
			SetNillableOwner(owner).
			SetNillableJzs(jzs).
			SetNillableMcn(mcn).
			SetNillableConsultant(conslt).
			SetNillableAreas(areas).
			SetNillableFsDate(fsdate).
			SetNillableOpDate(opdate).
			SetNillableStartDate(startdate).
			SetNillableEndDate(enddate).
			SetNillableMntyr(mntyr).
			SetNillableCje(cntrtsum)

		// 抓取营业额
		{
			var (
				amount *float64
			)
			row := stgDb.QueryRow(`
					select 
						bp.gscfamnt amount
					from (select * from (select *,row_number() over(PARTITION by pk_jobbasfil order by sid desc) rn  from bd_pjpayroll where aprvsts = '1'
					) a where a.rn=1) bp
					inner join mst_jobbasfil mj on mj.pk_jobbasfil=bp.pk_jobbasfil
					and pk_corp='2837' and jobtype='J'
					and finishedflag in ('Y','N')
					where aprvsts = '1' 
					and jobcode = @code
				`, sql.Named("code", jobcode))
			err := row.Scan(&amount)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取营业额失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillableYye(amount)
			}
		}

		// 抓取现金流
		{
			var (
				amount *float64
			)
			row := stgDb.QueryRow(`
				select top 1 cntx * 10000 as amount
				from fi_jobbs_batch_nwty
				where 1=1
				and vtype='N2'
				and corp='2837'
				and job = @code
				order by yr desc, mth desc
			`, sql.Named("code", jobcode))
			err := row.Scan(&amount)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取现金流失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillableXjl(amount)
			}
		}

		// 抓取项目管理费
		{
			var (
				amount *float64
				budget *float64
			)
			row := stgDb.QueryRow(`
				select sum(dyje) from FI_MGNFEE_SUM fs
				left join view_fefacade_jobbasfil_NY vj on fs.XMBH = vj.fijobcode
				where vj.jobcode = @code
			`, sql.Named("code", jobcode))
			err := row.Scan(&amount)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取项目管理费失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillableXmglfLj(amount)
			}

			row = stgDb.QueryRow(`
				SELECT
					sum(A00_BUDGET) as budget
				FROM
					(
					SELECT
						usr00,
						cost_code,
						A00_BUDGET,
						A00_MENGE,
						row_number ( ) OVER ( PARTITION BY USR00, COST_CODE, GJAHR ORDER BY POPER DESC ) rn 
					FROM
						FI_PRCOST_SUM 
					WHERE
						1=1
					) a 
				WHERE
					a.rn= 1 
					and COST_CODE in ('045','048','049')
				and usr00 = @code
			`, sql.Named("code", jobcode))
			err = row.Scan(&budget)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取项目管理费预算失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillableXmglfYs(budget)
			}
		}

		// 抓取設計費
		{
			var (
				amount *float64
			)
			row := stgDb.QueryRow(`
				select 
					SUM(FE1) amount
				from(select 项目代码描述,投标预算
								, ROUND(SUM(远东香港累计汇总),2) FE1
								, ROUND(SUM(远东珠海累计汇总),0) FE2
								, ROUND(SUM(远东深圳累计汇总),2) FE3
								, ROUND(SUM(远东香港累计汇总),2) - FE11 FE11
								, ROUND(SUM(远东珠海累计汇总),2) - FE22 FE22
								, ROUND(SUM(远东深圳累计汇总),2) - FE33 FE33  
						from CostAggregateOfProject_fromSub cf
						inner join mst_jobbasfil mj on mj.jobcode=left(cf.项目代码描述,4) and finishedflag = 'N' and pk_corp='2837'
						left join (select mj.jobcode
														, ROUND(SUM(远东香港累计汇总),2) FE11,ROUND(SUM(远东珠海累计汇总),2) FE22,ROUND(SUM(远东深圳累计汇总),2) FE33 
												from CostAggregateOfProject_fromSub cf
												inner join mst_jobbasfil mj on mj.jobcode=left(cf.项目代码描述,4)
												where 1=1
												AND left([成本代码描述],3) = '060'
												and finishedflag in ('N','Y') and pk_corp='2837'
												GROUP BY mj.jobcode ) lasty on lasty.jobcode = mj.jobcode 
						where 1=1
						AND left([成本代码描述],3) = '060'
						and mj.jobcode = @code
						GROUP BY 项目代码描述,投标预算, FE11, FE22, FE33 ) o 
			`, sql.Named("code", jobcode))
			err := row.Scan(&amount)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取设计费失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillableXmsjf(amount)
			}
		}

		// 抓取VO
		{

			rs, err := stgDb.Query(`
					SELECT 
					change_type,
					sum(total_amount) as total_amount, 
					sum(elv_amount) as elv_amount, 
					sum(elv_quantity) as elv_count,
					count(1) as total_count
					FROM [BI_STG_830].[dbo].[project_changes_v]
					WHERE project_code = @code
					group by project_code,change_type
				`, sql.Named("code", jobcode))
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取VO失败: %s\n", *jobcode, err.Error())
			}
			defer rs.Close()

			for rs.Next() {
				var (
					changeType  string
					totalAmount *float64
					totalCount  int
					elvAmount   *float64
					elvCount    int
				)
				err := rs.Scan(&changeType, &totalAmount, &elvAmount, &elvCount, &totalCount)
				if err != nil {
					fmt.Printf("%s 抓取VO失败: %s\n", *jobcode, err.Error())
				}

				if changeType == "總包變更" {
					p.SetContractorApplyCount(totalCount)
					p.SetNillableContractorApplyAmount(totalAmount)
					p.SetContractorApproveCount(elvCount)
					p.SetNillableContractorApproveAmount(elvAmount)
				} else if changeType == "業主變更" {
					p.SetOwnerApplyCount(totalCount)
					p.SetNillableOwnerApplyAmount(totalAmount)
					p.SetOwnerApproveCount(elvCount)
					p.SetNillableOwnerApproveAmount(elvAmount)
				}

			}

		}

		// 抓取安装进度
		{
			var (
				cfsum      *float64
				efcntrtsum *float64
			)

			row := stgDb.QueryRow(`
					select
					cfsum as cfsum,
					efcntrtsum as efcntrtsum 
					from (select * from (select *,row_number() over(PARTITION by pk_jobbasfil order by sid desc) rn  from bd_pjpayroll where 1=1 
					) a where a.rn=1) bp
					inner join mst_jobbasfil mj on bp.pk_jobbasfil = mj.pk_jobbasfil
					where aprvsts in ( '0','1') AND jobcode = @code;
				`, sql.Named("code", jobcode))

			err := row.Scan(&cfsum, &efcntrtsum)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取安装进度失败: %s\n", *jobcode, err.Error())
			} else {
				if cfsum != nil && efcntrtsum != nil && *efcntrtsum > 0 {
					p.SetInstallProgress(*cfsum / *efcntrtsum * 100)
				} else {
					p.SetInstallProgress(0)
				}
				p.SetNillableEffectiveContractAmount(cfsum)
			}

		}

		// 抓取分判VA
		{

			row := stgDb.QueryRow(`
					select
						va_apply, va_approve
					from 
					(select
					SUM(CAST(FIELD0059 AS FLOAT)) va_apply
					,field0004 jobcode
					from FORMMAIN_51028 fm
					left join formson_57860 fs on CAST(fm.ID as nvarchar)=CAST(fs.FORMMAIN_ID as nvarchar)
					INNER JOIN view_fefacade_jobbasfil VJ ON VJ.JOBCODE=FM.field0004
					where 1=1
					and fm.FINISHEDFLAG = 1
					and APPROVE_DATE>='2021-04-01'
					AND jobcode = @code
					group by field0004)  a
					inner join 
					(select
					SUM(CAST(FIELD0059 AS FLOAT)) va_approve
					,field0004 jobcode
					from FORMMAIN_51028 fm
					left join formson_57860 fs on CAST(fm.ID as nvarchar)=CAST(fs.FORMMAIN_ID as nvarchar)
					INNER JOIN view_fefacade_jobbasfil VJ ON VJ.JOBCODE=FM.field0004
					where 1=1
					and fm.FINISHEDFLAG between 0 and 1
					and APPROVE_DATE>='2021-04-01'
					AND jobcode = @code
					group by field0004) b 
					on a.jobcode=b.jobcode
				`, sql.Named("code", jobcode))

			var (
				vaApply   float64 = 0
				vaApprove float64 = 0
			)

			err := row.Scan(&vaApply, &vaApprove)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取分判VA失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetVaApplyAmount(vaApply)
				p.SetVaApproveAmount(vaApprove)
			}
		}

		{
			rows, err := stgDb.Query(`
					SELECT
						claim_month,
						claim_year,
						claim_amount,
						claim_type
  					FROM [BI_STG_830].[dbo].[project_claims_v] 
					WHERE claim_type <> '肺塵埃稅' 
					AND project_code = @code;
				`, sql.Named("code", jobcode))
			if err != nil {
				fmt.Printf("%s 抓取非法定扣款失败: %s\n", *jobcode, err.Error())
			}
			defer rows.Close()

			var (
				accumulatedStatutoryDeductions          float64 = 0
				accumulatedNonStatutoryDeductions       float64 = 0
				accumulatedStatutoryDeductionsPeriod    float64 = 0
				accumulatedNonStatutoryDeductionsPeriod float64 = 0
			)

			for rows.Next() {
				var (
					claimMonth  *int
					claimYear   *int
					claimAmount *float64
					claimType   string
				)
				err := rows.Scan(&claimMonth, &claimYear, &claimAmount, &claimType)
				if err != nil && err != sql.ErrNoRows {
					fmt.Printf("%s 抓取非法定扣款失败: %s\n", *jobcode, err.Error())
				} else {

					if claimType == "肺塵埃稅" {
						if claimAmount != nil {
							accumulatedStatutoryDeductions += *claimAmount

							if claimMonth != nil && *claimMonth == int(today.Month()) && *claimYear == today.Year() {
								accumulatedStatutoryDeductionsPeriod += *claimAmount
							}
						}
					} else {
						if claimAmount != nil {
							accumulatedNonStatutoryDeductions += *claimAmount

							if claimMonth != nil && *claimMonth == int(today.Month()) && *claimYear == today.Year() {
								accumulatedNonStatutoryDeductionsPeriod += *claimAmount
							}
						}
					}
				}
			}

			p.SetAccumulatedStatutoryDeductions(accumulatedStatutoryDeductions)
			p.SetAccumulatedNonStatutoryDeductions(accumulatedNonStatutoryDeductions)
			p.SetAccumulatedStatutoryDeductionsPeriod(accumulatedStatutoryDeductionsPeriod)
			p.SetAccumulatedNonStatutoryDeductionsPeriod(accumulatedNonStatutoryDeductionsPeriod)
		}

		// 抓取合約總額
		{
			row := stgDb.QueryRow(`
				SELECT
					cntrtsum =
					CASE
						WHEN ccy = 'USD' THEN
						cntrtsum / 7.8 
						WHEN ccy = 'GBP' THEN
						cntrtsum / 10 ELSE cntrtsum 
					END
				FROM
					mst_jobbasfil 
				WHERE
					pk_corp = '2837' 
					AND jobtype = 'J' 
					AND finishedflag IN ( 'Y', 'N' ) 
					AND jobcode = @code
				`, sql.Named("code", jobcode))
			if err != nil {
				fmt.Printf("%s 抓取合約總額失败: %s\n", *jobcode, err.Error())
			}
			defer rows.Close()

			var (
				cntrtsum *float64
			)

			err := row.Scan(&cntrtsum)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取合約總額失败: %s\n", *jobcode, err.Error())
			}
			p.SetNillableTotalContractAmount(cntrtsum)
		}

		// 抓取材料预算百分比
		{
			// rows, err := cwDb.Query(`
			// 	SELECT DISTINCT rlcnt.cost_code,  round( pocnt / a00_menge * 100,0) d
			// 	FROM(SELECT usr00, cost_code, a00_menge
			// 					, row_number ( ) OVER ( PARTITION BY USR00, COST_CODE, GJAHR
			// 															ORDER BY POPER DESC ) rn
			// 			FROM FI_PRCOST_SUM
			// 			WHERE 1=1
			// 			and cost_code in ('011','013','022','024')) as bdgt
			// 	inner join(select jobcode, cost_code, sum(pocnt) pocnt
			// 							, case cost_code when '011' then '鋁板' when '013' then '鐵件'
			// 														when '022' then '鋁材' when '024' then '玻璃'
			// 									end cost_name
			// 					from bd_fezhpocnt
			// 					where cntcode in ('PO','POSAP') and cost_code in ('011','013','022','024')
			// 					group by jobcode, cost_code
			// 							) as rlcnt
			// 							on rlcnt.jobcode = bdgt.usr00 and rlcnt.cost_code = bdgt.cost_code
			// 	inner join dbo.mst_jobbasfil nam on nam.pk_corp = '2837'
			// 			and jobtype='J'
			// 			and nam.jobcode = rlcnt.jobcode
			// 			and nam.finishedflag = 'N'  --in ('N','Y')
			// 	WHERE bdgt.rn= 1
			// 	and usr00 = @code
			// `, sql.Named("code", jobcode))
			// if err != nil {
			// 	fmt.Printf("%s 抓取材料预算百分比失败: %s\n", *jobcode, err.Error())
			// } else {
			// 	defer rows.Close()

			// 	for rows.Next() {
			// 		var (
			// 			costCode   string
			// 			percentage float64
			// 		)

			// 		err := rows.Scan(&costCode, &percentage)
			// 		if err != nil {
			// 			fmt.Printf("%s 抓取材料预算百分比失败: %s\n", *jobcode, err.Error())
			// 		} else {
			// 			switch costCode {
			// 			case "011":
			// 				p.SetAluminumPlateBudgetPercentage(percentage)
			// 			case "013":
			// 				p.SetIronBudgetPercentage(percentage)
			// 			case "022":
			// 				p.SetAluminumBudgetPercentage(percentage)
			// 			case "024":
			// 				p.SetGlassBudgetPercentage(percentage)
			// 			}
			// 		}

			// 	}
			// }

			// SELECT
			// 		cast(sum(djsl) as float) AS djsl
			// FROM
			// 		(
			// 	SELECT
			// 			zgcdh,
			// 			djsl
			// 	FROM
			// 			"_SYS_BIC"."ZMQ_BI.DM.MM/ZCS_DM_MM001_CGGLBB_DDMX_DATE"('PLACEHOLDER' = ('$$STADA$$',
			// 			'20200101'),
			// 			'PLACEHOLDER' = ('$$ENDDA$$',
			// 			'20251231'))
			// 	WHERE
			// 			SJLB = '发单明细'
			// 		AND NOT ( djje = 0
			// 			AND djsl = 0 )
			// 		--AND HBM='CNY'
			// 		AND "GYSBM" NOT IN ('0001011492', '0200531071', '0001011536')
			// 		AND "ZGCDH" = ?
			// 		AND zcbdh = ?
			// UNION ALL
			// 	SELECT
			// 			jobcode AS zgcdh,
			// 			POCNT AS djsl
			// 	FROM
			// 			"ZJK2BW"."BD_FezhPoData"
			// 	WHERE
			// 			CATEGORY = 'NCFD'
			// 		AND NOT ( POMNY = 0
			// 			AND POCNT = 0 )
			// 		AND jobcode = ?
			// 		AND costCode = ?
			// 	) o

			for _, material := range materials {
				row := bwpHanaDb.QueryRow(`
					SELECT 
						CAST(A00_BUDGET as float) as budget
					FROM ZJK2BW.FI_PRCOST_SUM fps
					WHERE USR00 = ?
					AND cost_code = ?
					LIMIT 1
				`, jobcode, material)

				var (
					budget *float64
					djje   *float64
				)
				err := row.Scan(&budget)
				if err != nil && err != sql.ErrNoRows {
					fmt.Printf("%s 抓取材料预算百分比失败: %s\n", *jobcode, err.Error())
				} else {
					if budget != nil && *budget > 0 {
						row = bwpHanaDb.QueryRow(`
							SELECT  sum(djje) AS djje
							FROM (
								select zgcdh, zcbdh as costCode, GYSMC, HBM, djje, djsl--, GYSBM
								from "_SYS_BIC"."ZMQ_BI.DM.MM/ZCS_DM_MM001_CGGLBB_DDMX_DATE"('PLACEHOLDER' = ('$$STADA$$', '20200101'),'PLACEHOLDER' = ('$$ENDDA$$','20251231'))
								WHERE SJLB='发单明细' and not ( djje = 0 and djsl = 0 ) --AND HBM='CNY'
									AND "GYSBM" not in ('0001011492','0200531071','0001011536')
									AND zgcdh = ?
									AND zcbdh = ?
								union all
								select jobcode as zgcdh, costCode, SupplierName as GYSMC
								--, SUPPLIERCODE as GYSBM
									, CCY AS HBM, POMNY as djje, POCNT as djsl
								from "ZJK2BW"."BD_FezhPoData"
								where CATEGORY = 'NCFD' and not ( POMNY = 0 and POCNT = 0 )
								AND jobcode = ?
								AND costCode = ?
								) o
							GROUP BY zgcdh, costCode, HBM
							order by djje desc
						`, jobcode, material, jobcode, material)
						err = row.Scan(&djje)
						if err != nil && err != sql.ErrNoRows {
							fmt.Printf("%s 抓取材料使用量失败: %s\n", *jobcode, err.Error())
						} else {
							if djje != nil {
								switch material {
								case "011":
									p.SetAluminumPlateBudgetPercentage(*djje / *budget * 100)
								case "013":
									p.SetIronBudgetPercentage(*djje / *budget * 100)
								case "022":
									p.SetAluminumBudgetPercentage(*djje / *budget * 100)
								case "024":
									p.SetGlassBudgetPercentage(*djje / *budget * 100)
								}
							}
						}
					}
				}
			}

		}

		// 抓取里程碑
		{
			var year = 2024
			rows, err := stgDb.Query(
				`
					select 
						plan_done_month,
						plan_done_year,
						done_month,
						done_year
					from pg_milestone_v 
					where project_code = @code
					and plan_done_date is not null
					and plan_done_year = @year;
				`,
				sql.Named("code", jobcode),
				sql.Named("year", year),
			)

			if err != nil {
				fmt.Printf("%s 抓取里程碑失败: %s\n", *jobcode, err.Error())
			} else {
				defer rows.Close()

				var (
					milestonePlanYear  int
					milestonePlanMonth int
					milestoneDoneYear  int
					milestoneDoneMonth int
				)

				for rows.Next() {
					var (
						planDoneMonth *int
						planDoneYear  *int
						doneMonth     *int
						doneYear      *int
					)
					err := rows.Scan(&planDoneMonth, &planDoneYear, &doneMonth, &doneYear)
					if err != nil {
						fmt.Printf("%s 抓取里程碑失败: %s\n", *jobcode, err.Error())
					} else {
						milestonePlanYear += 1
						if planDoneMonth != nil && planDoneYear != nil && *planDoneMonth == int(today.Month()) && *planDoneYear == year {
							milestonePlanMonth += 1
						}
						if doneMonth != nil && doneYear != nil && *doneYear == year && *doneMonth == int(today.Month()) {
							milestoneDoneMonth += 1
						}
						if doneYear != nil && *doneYear == year {
							milestoneDoneYear += 1
						}
					}
				}

				p.SetMilestonePlanYear(milestonePlanYear)
				p.SetMilestonePlanMonth(milestonePlanMonth)
				p.SetMilestoneDoneYear(milestoneDoneYear)
				p.SetMilestoneDoneMonth(milestoneDoneMonth)
			}
		}

		if *imgFlag {
			row := cwDb.QueryRow(`
				SELECT 
					img
				FROM [dbo].[BI_XMZTB]
 				where xmbm = @code
			`, sql.Named("code", jobcode))

			var (
				img []byte
			)
			err := row.Scan(&img)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取图片失败: %s\n", *jobcode, err.Error())
			} else {
				err = os.MkdirAll(fmt.Sprintf("static/projects/%s", *jobcode), 0755)
				if err != nil {
					fmt.Printf("%s 创建目录失败: %s\n", *jobcode, err.Error())
				} else {
					out, _ := os.Create(fmt.Sprintf("static/projects/%s/%s.png", *jobcode, *jobcode))
					defer out.Close()

					_, err = io.Copy(out, bytes.NewReader(img))
					if err != nil {
						fmt.Printf("%s 保存图片失败: %s\n", *jobcode, err.Error())
					}
				}
			}
		}

		if err := p.
			OnConflictColumns(project.FieldCode).
			UpdateNewValues().Exec(ctx); err != nil {
			fmt.Printf("%s 保存项目失败: %s\n", *jobcode, err.Error())
		}

		// 地盤人員
		{
			if today.Day() == 21 || *workingFlag {

				pj, err := s.Project.Query().Where(project.Code(*jobcode)).Only(ctx)
				if err != nil {
					fmt.Printf("%s 地盤人員 抓取项目失败: %s\n", *jobcode, err.Error())
					continue
				}

				rows, err := stgDb.Query(
					`
							SELECT jobtitle, whr FROM EM_PROJECT_V
							WHERE jobcode like @code + '%'
						`,
					sql.Named("code", jobcode),
				)
				if err != nil {
					fmt.Printf("%s 抓取地盤人員失败: %s\n", *jobcode, err.Error())
				} else {
					defer rows.Close()

					var (
						staffInstall    float64 = 0
						staffManagement float64 = 0
						staffDesign     float64 = 0
					)

					for rows.Next() {
						var (
							jobtitle *string
							whr      *float64
						)
						err := rows.Scan(&jobtitle, &whr)
						if err != nil {
							fmt.Printf("%s 抓取地盤人員失败: %s\n", *jobcode, err.Error())
						} else {
							if jobtitle != nil && whr != nil {
								switch *jobtitle {
								case "助理/副/安裝經理":
								case "地盤監督/高級地盤監督":
									staffInstall += *whr
								case "助理/副項目總監/總監":
								case "助理/副/項目協調員":
								case "助理/副/項目經理":
									staffManagement += *whr
								case "設計主管":
									staffDesign += *whr
								}
							}
						}
					}

					if err := s.ProjectStaff.Create().
						SetCym(fmt.Sprintf("%s-%d-%d", *jobcode, today.Year(), today.Month())).
						SetInstallation(staffInstall).
						SetManagement(staffManagement).
						SetDesign(staffDesign).
						SetProject(pj).
						OnConflictColumns(projectstaff.FieldCym).
						UpdateNewValues().
						Exec(ctx); err != nil {
						fmt.Printf("%s 保存地盤人員失败: %s\n", *jobcode, err.Error())
					}

					// p.SetStaffInstall(staffInstall)
					// p.SetStaffManagement(staffManagement)
					// p.SetStaffDesign(staffDesign)
				}
			}
		}

	}

}

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
	"path/filepath"
	"strconv"
	"strings"
	"time"

	_ "github.com/SAP/go-hdb/driver"
	_ "github.com/go-sql-driver/mysql"
	_ "github.com/microsoft/go-mssqldb"
	"github.com/xuri/excelize/v2"
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

	BI_HOST     = "10.148.7.9"
	BI_PORT     = 3306
	BI_USER     = "root"
	BI_PASSWORD = "itl@admin"
	BI_DATABASE = "finedb"
)

var (
	materials = []string{"011", "013", "022", "024"}
)

func main() {
	imgFlag := flag.Bool("image", false, "fetch image")
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

	biDb, err := sql.Open("mysql", fmt.Sprintf("root:%s@tcp(%s:%d)/%s", BI_PASSWORD, BI_HOST, BI_PORT, BI_DATABASE))
	if err != nil {
		panic(err)
	}
	defer biDb.Close()

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
		and pk_corp='2837'
		and finishedflag in ('N','Y')
		and jobcode <> 'FTSZZH' and jobcode <> 'FETY' and jobcode <> 'FTZHSH'
		AND JOBTYPE='J'
	`)
	if err != nil {
		panic(err)
	}
	defer rows.Close()

	var f *excelize.File
	wd, _ := os.Getwd()
	entries, err := os.ReadDir(filepath.Join(wd, "smb"))
	if err != nil {
		fmt.Printf("读取excel目录失败: %s\n", err.Error())
	} else {
		var excelFile string
		for _, entry := range entries {
			if strings.HasSuffix(entry.Name(), ".xlsx") {
				excelFile = entry.Name()
				break
			}
		}
		f, _ = excelize.OpenFile(filepath.Join(wd, "smb", excelFile))
		defer func() {
			if err := f.Close(); err != nil {
				fmt.Printf("关闭excel失败: %s\n", err.Error())
			}
		}()
	}

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

		// 抓取生产管理
		{
			// 抓取生产管理面積
			row := s4pHanaDb.QueryRow(`
				select 
					cast( sum( tbmj + zjmj ) as float ) as zmj
				from ztps022
				where usr00 = ?
			`, jobcode)

			var (
				zmj *float64
			)
			err := row.Scan(&zmj)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取生产管理失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillablePmArea(zmj)
			}

			// 抓取生产管理當年計劃
			row = s4pHanaDb.QueryRow(`
				select 
					cast( sum( zyjhsl ) as float ) as zndjh
				from "SAPHANADB"."ZTPP021"
				where 1=1
				and usr00 = ?
			`, jobcode)

			var (
				zndjh *float64
			)
			err = row.Scan(&zndjh)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取生产管理失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillablePmYearTarget(zndjh)
			}

			// 抓取生产管理當年生產
			row = s4pHanaDb.QueryRow(`
				select cast( sum( zmj ) as float ) as yearActual
				from ZTPP_FR_CLBG   -- sap zps014运行结果
				where zmj != 0 and xmbm = ?
				and left( zrq, 4 ) = ?
			`, jobcode, today.Format("YYYY"))

			var (
				yearActual *float64
			)
			err = row.Scan(&yearActual)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取生产管理失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillablePmYearActual(yearActual)
			}

			// 抓取生产管理當月生產
			row = s4pHanaDb.QueryRow(`
				select cast( sum( zmj ) as float ) as monthActual
				from ZTPP_FR_CLBG   -- sap zps014运行结果
				where zmj != 0 and xmbm = ?
				and left( zrq, 6 ) = ?
			`, jobcode, today.Format("YYYYMM"))
			var (
				monthActual *float64
			)
			err = row.Scan(&monthActual)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取生产管理失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillablePmMonthActual(monthActual)
			}

			// 抓取生产管理昨日生產
			row = s4pHanaDb.QueryRow(`
				select 
					cast( sum( zmj ) as float ) as yesterdayActual
				from ZTPP_FR_CLBG   -- sap zps014运行结果
				where zmj != 0 and xmbm = ?
				AND zrq = ?
			`, jobcode, today.Format("YYYYMMDD"))

			var (
				yesterdayActual *float64
			)
			err = row.Scan(&yesterdayActual)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取生产管理失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillablePmYesterday(yesterdayActual)
			}

			// 抓取生产管理累計生產
			row = s4pHanaDb.QueryRow(`
				select 
					cast( sum( zmj ) as float ) as total
				from ZTPP_FR_CLBG   -- sap zps014运行结果
				where zmj != 0 and xmbm = ?
			`, jobcode)

			var (
				total *float64
			)
			err = row.Scan(&total)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取生产管理失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillablePmTotal(total)
			}
		}

		if *imgFlag {
			row := cwDb.QueryRow(`
				SELECT 
					img
				FROM [dbo].[BI_XMZTB]
 				where xmbm = ?
			`, jobcode)

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

		// 抓取單元件
		{
			row := bwpHanaDb.QueryRow(`
				SELECT 
					sum( anzsn ) as dyjljkc -- 累计库存
				from zscmm_dyjgckc_view
				where 1=1
				AND xmbm = ?
			`, jobcode)

			var (
				dyjljkc *float64
			)
			err = row.Scan(&dyjljkc)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取單元件失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillableUnitInventoryTotal(dyjljkc)
			}
		}

		// 抓取項目物料損失金額
		{
			row := s4pHanaDb.QueryRow(`
				SELECT cast( sum( "损失金额" ) as float ) AS total FROM (
					select distinct 
					case when k.zgcdh='' then left(k.zddbh,4) else k.zgcdh end as "项目代号"
					, '工厂补料' as "损失科目", zwlnr as "物料组"
					, k.aedat as "创建日期", k.zddbh as "830订单号", k.lifnr as "供应商编号"
					, case when k.zzzl > 0 then k.zzzl else k.zzmj end as "损失数量"
					, bprme as "数量单位", k.zzje as "损失金额", k.waers as "金额单位"
					from ekko as k inner join ekpo as p on p.ebeln = k.ebeln
					where k.zddbh like '%HBL%' and left(matnr, 9) != '000000008' and p.loekz = ''
					and k.zgcdh = ?
					union all
					select distinct 
					case when k.zgcdh='' then left(k.zddbh,4) else k.zgcdh end as "项目代号"
					, '项目补料' as "损失科目", zwlnr as "物料组"
					, k.aedat as "创建日期", k.zddbh as "830订单号", k.lifnr as "供应商编号"
					, case when k.zzzl > 0 then k.zzzl else k.zzmj end as "损失数量"
					, bprme as "数量单位", k.zzje as "损失金额", k.waers as "金额单位"
					from ekko as k inner join ekpo as p on p.ebeln = k.ebeln
					where k.zddbh like '%SBL%' and left(matnr, 9) != '000000008' and p.loekz = ''
					and k.zgcdh = ?
					union all
					select distinct 
					case when k.zgcdh='' then left(k.zddbh,4) else k.zgcdh end as "项目代号"
					, '设计改版' as "损失科目", zwlnr as "物料组"
					, k.aedat as "创建日期", k.zddbh as "830订单号", k.lifnr as "供应商编号"
					, k.zsjxgsssl as "损失数量", bprme as "数量单位"
					, k.zsjxgssje as "损失金额", k.waers as "金额单位"
					from ekko as k inner join ekpo as p on p.ebeln = k.ebeln
					where k.zsjxgsssl > 0 and left(matnr, 9) != '000000008' and p.loekz = ''
					and k.zgcdh = ?
				)
			`, jobcode, jobcode, jobcode)

			var (
				total *float64
			)
			err = row.Scan(&total)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取項目物料損失金額失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillableMaterialLoss(total)
			}
		}

		// 抓取單元件生產數量
		{
			row := bwpHanaDb.QueryRow(`
				SELECT unit_component_total, unit_component_production, unit_component_installation
				FROM ( SELECT xmbm AS "项目编码", cast(sum(dyjsl) as float) AS unit_component_total
						FROM s42bw.ztps004
						WHERE xmbm = ?
						GROUP BY xmbm ) AS jh
				LEFT JOIN ( SELECT xmbm, cast(SUM(ZRCL) as float) AS unit_component_production 
							FROM s42bw.ZTPP_FR_CLBG
							GROUP BY xmbm ) AS sc ON sc.xmbm = "项目编码"
				LEFT JOIN ( SELECT left(SINGLECODE,4) AS xmbm
								, cast(sum(CASE WHEN LENGTH(AZWCSJ) >= 10 THEN 1 ELSE 0 END) as float) AS unit_component_installation
							FROM s42bw.ZTPS_RFID_LOG
							WHERE LENGTH(ZJSJ) >= 10
								and left(SINGLECODE,4) = ?
							GROUP BY left(SINGLECODE,4)
							) AS az ON az.xmbm = "项目编码"
			`, jobcode, jobcode)

			var (
				unitComponentTotal        *float64
				unitComponentProduction   *float64
				unitComponentInstallation *float64
			)
			err = row.Scan(&unitComponentTotal, &unitComponentProduction, &unitComponentInstallation)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取單元件生產數量失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillableUnitComponentTotal(unitComponentTotal)
				p.SetNillableUnitComponentProduction(unitComponentProduction)
				p.SetNillableUnitComponentInstallation(unitComponentInstallation)
			}
		}

		// 抓取余料库存重量
		{
			rowG2 := bwpHanaDb.QueryRow(`
				select
					cast( sum( desl * zggzl ) as float ) as "designRatedWeight"
				from s42bw.ztpp015 as de
				inner join s42bw.mara on mara.mandt = de.mandt and mara.matnr = de.matnr
				inner join s42bw.ztps004 as pc on pc.mandt = de.mandt and pc.pcbm = de.debh
				WHERE 1=1
				AND LEFT(mara.matkl,2) = '22'
				AND de.MANDT = '800'
				AND LEFT(de.DEBH,4) = ?
			`, jobcode)

			rowF2 := bwpHanaDb.QueryRow(`
				select 
					cast( sum( klsl * klcc * zggmz ) / 1000 as float ) as "processingWeight"
				from s42bw.ztpp017 as klmx
				inner join s42bw.mara on mara.mandt = klmx.mandt and mara.matnr = klmx.idnrk
				WHERE 1=1
				AND LEFT(mara.matkl,2) = '22'
				AND klmx.MANDT = '800'
				AND left(klmx.DEBH, 4) = ?
			`, jobcode)

			var (
				// G2 设计定额重量
				designRatedWeight *float64
				// F2 加工图成型重量
				processingWeight *float64
			)
			err = rowG2.Scan(&designRatedWeight)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取设计定额重量失败: %s\n", *jobcode, err.Error())
			}

			err = rowF2.Scan(&processingWeight)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取加工图成型重量失败: %s\n", *jobcode, err.Error())
			}

			p.SetNillableDesignRatedWeight(designRatedWeight)
			p.SetNillableProcessingWeight(processingWeight)
		}

		// 抓取项目库存重量
		{
			row := bwpHanaDb.QueryRow(`
				SELECT  
					cast( sum( "stock_qty" * zggzl ) as float ) as "itemStockWeight"
				from "S42BW"."nsdm_e_mspr_agg" as agg
				inner join s42bw.mara on mara.mandt = agg.mandt and mara.matnr = agg."matnr"
								and left(mara.matkl,2) = '22'
				inner join s42bw.prps on prps.mandt = agg.mandt and prps.pspnr = agg."pspnr"
				inner join s42bw.proj on proj.mandt = agg.mandt and proj.pspnr = prps.psphi
				where "lbbsa" = '01' and "stock_qty" != 0 and agg.mandt = 800
				--${if(len(项目)==0,"","  and proj.usr00 in ('"+项目+"')")}
				--  and concat(left("gjper_max", 4), right("gjper_max", 2)) >= '${if(len(日期_s)==0,"200001",left(日期_s,6))}'
				--  and concat(left("gjper_max", 4), right("gjper_max", 2)) <= '${if(len(日期_e)==0,format(today(),"yyyyMM"),left(日期_e,6))}'
				AND proj.usr00 = ?
			`, jobcode)

			var (
				itemStockWeight *float64
			)
			err = row.Scan(&itemStockWeight)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取項目物料庫存重量失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillableItemStockWeight(itemStockWeight)
			}
		}

		// 抓取卡板散件庫存
		{
			row := s4pHanaDb.QueryRow(`
				SELECT  
					cast( sum(CASE WHEN LENGTH(zkaban) < 17 THEN 0 ELSE 1 END) as float ) as palletsInStock  --卡板数量
					, cast( sum(menge) as float ) as partsInStock   --散件数量
				from(
				SELECT left(zsgpc,4) AS gcdh,zkaban, sum(menge) AS menge
				FROM ztpp_packing WHERE left(zsgpc,4) = ?
				GROUP BY left(zsgpc,4), zkaban ) a 
			`, jobcode)

			var (
				palletsInStock *float64
				partsInStock   *float64
			)
			err = row.Scan(&palletsInStock, &partsInStock)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取卡板散件庫存失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillablePalletsInStock(palletsInStock)
				p.SetNillablePartsInStock(partsInStock)
			}
		}

		// 抓取散料
		{
			row := bwpHanaDb.QueryRow(`
				select 
					cast( sum( p.psmng ) as float ) as bulkMaterialsTotalOrderQuantity       --订单总数量
					, cast( sum( p.wemng ) as float ) as bulkMaterialsCompletedQuantity       --完成数量
					, cast( sum( p.psmng - p.wemng ) as float ) as bulkMaterialsUncompletedQuantity       --未完成数量
				from s42bw.ztps004 as z
				inner join s42bw.afpo as p on p.ablad = z.pcbm
				inner join s42bw.afko as ko on ko.aufnr = p.aufnr
				inner join s42bw.aufk as k on k.aufnr = p.aufnr
				inner join s42bw.mara as m on m.matnr = p.matnr 
				where not k.loekz = 'X' and left(m.matkl,4) in ('9003','9004')
					and not exists ( select jest.stat from s42bw.jest
									where objnr = k.objnr and stat = 'I0076' and inact = '' )
					AND z.xmbm = ?
				group by z.xmbm
			`, jobcode)

			var (
				bulkMaterialsTotalOrderQuantity  *float64
				bulkMaterialsCompletedQuantity   *float64
				bulkMaterialsUncompletedQuantity *float64
			)
			err = row.Scan(&bulkMaterialsTotalOrderQuantity, &bulkMaterialsCompletedQuantity, &bulkMaterialsUncompletedQuantity)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取散料失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillableBulkMaterialsTotalOrderQuantity(bulkMaterialsTotalOrderQuantity)
				p.SetNillableBulkMaterialsCompletedQuantity(bulkMaterialsCompletedQuantity)
				p.SetNillableBulkMaterialsUncompletedQuantity(bulkMaterialsUncompletedQuantity)
			}
		}

		// 抓取质量分数
		{
			row := stgDb.QueryRow(`
				select TOP 1 task_group_id from transtrack_ranking
				where 1=1
				and project_id<>'169057'
				and task_status<>1 order by task_group_id desc
			`)

			var (
				taskGroupId *int
			)
			err = row.Scan(&taskGroupId)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取质量分数失败: %s\n", *jobcode, err.Error())
			} else {
				row := stgDb.QueryRow(`
				select 
					score 
				from transtrack_ranking
					where 1=1
					and score!=0
					AND TASK_STATUS = 2
					and task_group_id = @id
					and left(project_name, 4) = @code
				`, sql.Named("id", taskGroupId), sql.Named("code", jobcode))

				var (
					score *float64
				)
				err = row.Scan(&score)
				if err != nil && err != sql.ErrNoRows {
					fmt.Printf("%s 抓取质量分数失败: %s\n", *jobcode, err.Error())
				} else {
					p.SetNillableQualityScore(score)
				}
			}
		}

		// 抓取計劃
		{
			rows, err := stgDb.Query(`
				select 
					plan_end_time, 
					actual_end_time 
				from Transtrack_wbs_1
				where left(project_name, 4) = @code
			`, sql.Named("code", jobcode))
			if err != nil {
				fmt.Printf("%s 抓取計劃失败: %s\n", *jobcode, err.Error())
			} else {
				defer rows.Close()

				var (
					planTotalCount        int = 0
					planOverdueCount      int = 0
					planOverdueMonthCount int = 0
					t                         = time.Now().UTC()
				)

				for rows.Next() {
					var (
						planEndTime   time.Time
						actualEndTime time.Time
					)
					err := rows.Scan(&planEndTime, &actualEndTime)
					if err != nil {
						fmt.Printf("%s 抓取計劃失败: %s\n", *jobcode, err.Error())
					} else {
						planTotalCount++

						if planEndTime.Before(t) {
							if actualEndTime.Year() == 1970 {
								planOverdueCount++
								if planEndTime.Month() == t.Month() {
									planOverdueMonthCount++
								}
							}
						}
					}
				}

				p.SetPlanTotalCount(planTotalCount)
				p.SetPlanOverdueCount(planOverdueCount)
				p.SetPlanOverdueMonthCount(planOverdueMonthCount)
			}
		}

		// 抓取加工圖完成數量
		{
			row := biDb.QueryRow(`
				select 
					count(1) as approvedQuantity
				from plm_bi_bom_info
				where project_code = ?
			`, jobcode)

			var (
				processingDiagramFinishCount *int
			)
			err = row.Scan(&processingDiagramFinishCount)
			if err != nil && err != sql.ErrNoRows {
				fmt.Printf("%s 抓取加工圖完成數量失败: %s\n", *jobcode, err.Error())
			} else {
				p.SetNillableProcessingDiagramFinishCount(processingDiagramFinishCount)
			}
		}

		if err := p.
			OnConflictColumns(project.FieldCode).
			UpdateNewValues().Exec(ctx); err != nil {
			fmt.Printf("%s 保存项目失败: %s\n", *jobcode, err.Error())
		}

		// 地盤人員
		{
			if f == nil {
				continue
			}

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

				{

					rows, err := f.GetRows("TSD_2024_12")
					if err != nil {
						fmt.Printf("%s 读取excel失败: %s\n", *jobcode, err.Error())
					} else {
						for _, row := range rows {
							if len(row) > 5 {
								if row[0] != "00005222" && row[0] != "00014912" {
									site := row[4]
									percent := row[5]
									if strings.HasPrefix(site, *jobcode) {
										p, _ := strconv.ParseFloat(strings.ReplaceAll(percent, "%", ""), 64)
										staffDesign += p / 100
									}
								}
							}
						}
					}

				}

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
							case "助理/副/安裝經理", "地盤監督/高級地盤監督":
								staffInstall += *whr
							case "助理/副項目總監/總監", "助理/副/項目協調員", "助理/副/項目經理":
								staffManagement += *whr
							}
						}
					}
				}

				var cym string
				var createdAt time.Time
				bm := time.Date(today.Year(), today.Month(), 1, 0, 0, 0, 0, time.Local)
				if bm.Sub(today).Hours() >= 21*24 {
					cym = fmt.Sprintf("%s-%s-%s", *jobcode, bm.Format("2006"), bm.Format("01"))
					createdAt = time.Now()
				} else {
					y := time.Date(today.Year(), today.Month()-1, today.Day(), 0, 0, 0, 0, time.Local).Format("2006")
					m := time.Date(today.Year(), today.Month()-1, today.Day(), 0, 0, 0, 0, time.Local).Format("01")
					cym = fmt.Sprintf("%s-%s-%s", *jobcode, y, m)
					createdAt = time.Date(today.Year(), today.Month()-1, today.Day(), 0, 0, 0, 0, time.Local)
				}

				if err := s.ProjectStaff.Create().
					SetCym(cym).
					SetCreatedAt(createdAt).
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

package main

import (
	"context"
	"cscd-bds/store"
	"cscd-bds/store/ent/project"
	"database/sql"
	"fmt"
	"time"

	_ "github.com/microsoft/go-mssqldb"
)

const (
	STG_HOST     = "10.1.8.37"
	STG_PORT     = 1433
	STG_USER     = "bi830"
	STG_PASSWORD = "Csci!830"
	STG_DATABASE = "BI_STG_830"
)

func main() {
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

	s := store.New(false)

	// success := 0
	// q := s.Operation.Create()

	today := time.Now()

	// wg := errgroup.Group{}

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
			mntyr
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
		)
		err := rows.Scan(
			&jobcode, &jobname, &jobmgr, &owner, &jzs, &mcn, &conslt, &areas,
			&fsdate, &opdate, &finishedflag, &startdate, &enddate, &mntyr,
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
			SetNillableMntyr(mntyr)

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
			if err != nil {
				fmt.Printf("抓取营业额失败: %s\n", err.Error())
			} else {
				p.SetNillableYye(amount)
			}
		}

		// 抓取成交额
		{

			// 	var (
			// 		total float64
			// 	)

			// 	row := stgDb.QueryRow(`
			// 	SELECT sum(suscntrtsum) / 10000 as total FROM mst_jobbasfil mj
			// 		where pk_corp='2837' and jobtype='J' and finishedflag = 'M3'
			// 		and zbyr = @year
			// `, sql.Named("year", year))

			// 	err := row.Scan(&total)
			// 	if err != nil {
			// 		fmt.Printf("抓取成交额失败: %s\n", err.Error())
			// 	} else {
			// 		p.SetCje(total)
			// 		// success++
			// 	}
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
			if err != nil {
				fmt.Printf("抓取VO失败: %s\n", err.Error())
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
					fmt.Printf("抓取VO失败: %s\n", err.Error())
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
				cfsum      float64
				efcntrtsum float64
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
			if err != nil {
				fmt.Printf("抓取安装进度失败: %s\n", err.Error())
			} else {
				if efcntrtsum > 0 {
					p.SetInstallProgress(cfsum / efcntrtsum * 100)
				} else {
					p.SetInstallProgress(0)
				}
				p.SetEffectiveContractAmount(cfsum)
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
			if err != nil {
				fmt.Printf("抓取分判VA失败: %s\n", err.Error())
			}
			defer rows.Close()

			var (
				vaApply   float64 = 0
				vaApprove float64 = 0
			)

			err := row.Scan(&vaApply, &vaApprove)
			if err != nil {
				fmt.Printf("抓取分判VA失败: %s\n", err.Error())
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
				fmt.Printf("抓取非法定扣款失败: %s\n", err.Error())
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
				if err != nil {
					fmt.Printf("抓取非法定扣款失败: %s\n", err.Error())
				}

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
				fmt.Printf("抓取合約總額失败: %s\n", err.Error())
			}
			defer rows.Close()

			var (
				cntrtsum float64
			)

			err := row.Scan(&cntrtsum)
			if err != nil {
				fmt.Printf("抓取合約總額失败: %s\n", err.Error())
			}
			p.SetTotalContractAmount(cntrtsum)
		}

		if err := p.
			OnConflictColumns(project.FieldCode).
			UpdateNewValues().Exec(ctx); err != nil {
			panic(err)
		}

		// if success > 0 {
		// 	if err := p.Exec(ctx); err != nil {
		// 		panic(err)
		// 	}
		// }
		// return nil
		// })
	}

	// if err := wg.Wait(); err != nil {
	// 	fmt.Println(err)
	// }
}

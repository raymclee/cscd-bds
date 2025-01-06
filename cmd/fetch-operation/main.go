package main

import (
	"context"
	"cscd-bds/store"
	"database/sql"
	"fmt"

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

	success := 0
	q := s.Operation.Create()

	// today := time.Now()
	year := 2024

	// 抓取成交额
	{
		var (
			budget float64
			total  float64
		)

		row := stgDb.QueryRow(`
			select
				600000 budget,
				(SELECT sum(suscntrtsum) / 10000 FROM mst_jobbasfil mj 
					where pk_corp='2837' and jobtype='J' and finishedflag = 'M3'
					and zbyr = @year
         		) as total
		`, sql.Named("year", year))

		err := row.Scan(&budget, &total)
		if err != nil {
			fmt.Printf("抓取成交额失败: %s\n", err.Error())
		} else {
			q.SetCjeYs(budget).SetCjeLj(total)
			success++
		}
	}

	// 抓取营业额
	{
		var (
			budget float64
			total  float64
		)

		row := stgDb.QueryRow(`
			select top 1 537500 as budget, income as total
			from bd_income_yr
			where 1=1
			and yr=@year
			order by mth desc
		`, sql.Named("year", year))

		err := row.Scan(&budget, &total)
		if err != nil {
			fmt.Printf("抓取营业额失败: %s\n", err.Error())
		} else {
			q.SetYyeYs(budget).SetYyeLj(total)
			success++
		}
	}

	// 抓取现金流
	{
		var (
			budget float64
			total  float64
		)

		row := stgDb.QueryRow(`
			select 50000 as budget, jyyw-jyyw0 as total
			from fi_cpbsdtl_yr
			where 1=1
			and pk_corp='2837'
			and ccy='HKD'
			and ym like @year
		`, sql.Named("year", fmt.Sprintf("%d-11%%", year)))

		err := row.Scan(&budget, &total)
		if err != nil {
			fmt.Printf("抓取现金流失败: %s\n", err.Error())
		} else {
			q.SetXjlYs(budget).SetXjlLj(total)
			success++
		}
	}

	// 抓取项目管理费
	{
		// var (
		// 	budget int
		// 	total  int
		// )

		// row := stgDb.QueryRow(`
		// 	select 100000 as 预算, 100000 as 累计
		// 	from bd_income_yr
		// 	where 1=1
		// 	and yr=@year
		// `, sql.Named("year", year))

		// err := row.Scan(&budget, &total)
		// if err != nil {
		// 	fmt.Printf("抓取项目管理费失败: %s\n", err.Error())
		// } else {
		// 	q.SetXmglfYs(budget).SetXmglfLj(total)
		// 	success++
		// }
	}

	if success > 0 {
		if _, err := q.Save(ctx); err != nil {
			fmt.Printf("保存数据失败: %s\n", err.Error())
		}
	}

}

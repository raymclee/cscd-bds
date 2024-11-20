package main

import (
	"context"
	"cscd-bds/store"
	"cscd-bds/store/ent/area"
	"cscd-bds/store/ent/province"
)

func main() {
	ctx := context.Background()
	s := store.NewStore()

	{
		provs, err := s.Province.Query().
			Where(
				province.AdcodeIn(
					320000, 310000, 340000, 330000, 410000,
				)).
			All(ctx)
		if err != nil {
			panic(err)
		}

		if err := s.Area.Update().
			Where(area.CodeEQ("HD")).
			AddProvinces(provs...).
			Exec(ctx); err != nil {
			panic(err)
		}
	}

	{
		provs, err := s.Province.Query().
			Where(
				province.AdcodeIn(
					430000, 350000, 440000, 450000, 360000, 420000, 460000, 710000,
				)).
			All(ctx)
		if err != nil {
			panic(err)
		}

		if err := s.Area.Update().
			Where(area.CodeEQ("HN")).
			AddProvinces(provs...).
			Exec(ctx); err != nil {
			panic(err)
		}
	}

	{
		provs, err := s.Province.Query().
			Where(
				province.AdcodeIn(
					540000, 650000, 620000, 630000, 510000, 530000, 640000, 610000, 500000, 520000,
				)).
			All(ctx)
		if err != nil {
			panic(err)
		}

		if err := s.Area.Update().
			Where(area.CodeEQ("XB")).
			AddProvinces(provs...).
			Exec(ctx); err != nil {
			panic(err)
		}
	}

	{
		provs, err := s.Province.Query().
			Where(
				province.AdcodeIn(
					150000, 230000, 220000, 210000, 110000, 130000, 140000, 120000, 370000,
				)).
			All(ctx)
		if err != nil {
			panic(err)
		}

		if err := s.Area.Update().
			Where(area.CodeEQ("HB")).
			AddProvinces(provs...).
			Exec(ctx); err != nil {
			panic(err)
		}
	}

	{
		provs, err := s.Province.Query().
			Where(
				province.AdcodeIn(
					810000, 820000,
				)).
			All(ctx)
		if err != nil {
			panic(err)
		}

		if err := s.Area.Update().
			Where(area.CodeEQ("GA")).
			AddProvinces(provs...).
			Exec(ctx); err != nil {
			panic(err)
		}
	}
}

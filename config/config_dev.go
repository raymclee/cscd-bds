package config

func init() {
	DatabaseUrl = "postgresql://postgres:postgres@localhost:5432/cscd_bds?sslmode=disable"
	IsProd = false
}

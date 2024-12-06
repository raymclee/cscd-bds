package config

func init() {
	DatabaseUrl = "postgresql://postgres:postgres@localhost:5432/cscd_bds?sslmode=disable"
	IsProd = false
	FilePath = "static/"

	HanaPort = 30044
	HanaHost = "10.148.7.4"
	HanaUsername = "SAPHANADB"
	HanaPassword = "Sap2cool"
	HanaDatabase = "SAPHANADB"
}

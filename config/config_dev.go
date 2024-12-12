package config

func init() {
	DatabaseUrl = "postgresql://postgres:postgres@localhost:5432/cscd_bds?sslmode=disable"
	IsProd = false
	FilePath = "static/"

	HanaPort = 30071
	HanaHost = "10.148.8.9"
	HanaUsername = "SAPHANADB"
	HanaPassword = "Sap2cool"
	HanaDatabase = "SAPHANADB"
}

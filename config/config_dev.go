package config

func init() {
	DatabaseUrl = "postgresql://postgres:postgres@localhost:5432/cscd_mkm?sslmode=disable"
	IsProd = false
	IsUat = false
	IsDev = true
	FilePath = "static/"
	HostUrl = "http://localhost:5173"

	HanaPort = 30071
	HanaHost = "10.148.8.9"
	HanaUsername = "SAPHANADB"
	HanaPassword = "Sap2cool"
	HanaDatabase = "SAPHANADB"
}

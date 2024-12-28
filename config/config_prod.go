//go:build prod

package config

func init() {
	DatabaseUrl = "postgresql://postgres:~!Wbvxwet=JdgcKB@localhost:5432/cscd_mkm"
	IsProd = true
	IsUat = false
	FilePath = "/home/itadmin/static/"

	HanaPort = 30015
	HanaHost = "10.148.7.17"
	HanaUsername = "SAPHANADB"
	HanaPassword = "Sap2cool"
	HanaDatabase = "SAPHANADB"
}

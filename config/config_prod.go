//go:build prod

package config

func init() {
	DatabaseUrl = "postgresql://postgres:~!Wbvxwet=JdgcKB@localhost:5432/cscd_bds"
	IsProd = true
	FilePath = "/home/itadmin/static/"

	HanaPort = 30044
	HanaHost = "10.148.7.4"
	HanaUsername = "SAPHANADB"
	HanaPassword = "Sap2cool"
	HanaDatabase = "SAPHANADB"
}

//go:build uat

package config

func init() {
	DatabaseUrl = "postgresql://postgres:~!Wbvxwet=JdgcKB@localhost:5432/cscd_mkm_uat"
	IsProd = false
	IsUat = true
	HostUrl = "https://mkm.uat.fefacade.com"

	HanaPort = 30071
	HanaHost = "10.148.8.9"
	HanaUsername = "SAPHANADB"
	HanaPassword = "Sap2cool"
	HanaDatabase = "SAPHANADB"
}

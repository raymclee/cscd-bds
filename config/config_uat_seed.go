//go:build uatseed

package config

func init() {
	DatabaseUrl = "postgresql://postgres:~!Wbvxwet=JdgcKB@10.106.189.11:5432/cscd_mkm_uat"
	IsProd = false
	IsUat = true
	HostUrl = "https://mkm.uat.fefacade.com"

	HanaPort = 30071
	HanaHost = "10.148.8.9"
	HanaUsername = "SAPHANADB"
	HanaPassword = "Sap2cool"
	HanaDatabase = "SAPHANADB"
}

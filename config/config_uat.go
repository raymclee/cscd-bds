//go:build uat

package config

func init() {
	DatabaseUrl = "postgresql://postgres:~!Wbvxwet=JdgcKB@10.106.189.10:5432/cscd_bds"
	IsProd = false

	HanaPort = 30044
	HanaHost = "10.148.7.4"
	HanaUsername = "SAPHANADB"
	HanaPassword = "Sap2cool"
	HanaDatabase = "SAPHANADB"
}

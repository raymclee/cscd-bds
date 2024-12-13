//go:build seed

package config

func init() {
	DatabaseUrl = "postgresql://postgres:~!Wbvxwet=JdgcKB@10.106.189.10:5432/cscd_bds_uat"
	IsProd = false
	IsUat = false
}

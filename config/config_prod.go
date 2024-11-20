//go:build prod

package config

func init() {
	DatabaseUrl = "postgresql://postgres:~!Wbvxwet=JdgcKB@localhost:5432/cscd_bds"
	IsProd = true
}

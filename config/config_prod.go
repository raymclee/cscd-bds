//go:build prod

package config

import "os"

func init() {
	DatabaseUrl = "postgresql://postgres:~!Wbvxwet=JdgcKB@localhost:5432/cscd_bds"
	IsProd = os.Getenv("production") != ""
}

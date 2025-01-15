package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

func main() {

	wd, err := os.Getwd()
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(wd)

	entries, err := os.ReadDir(filepath.Join(wd, "smb"))
	if err != nil {
		fmt.Println(err)
	}
	for _, entry := range entries {
		if strings.HasSuffix(entry.Name(), ".xlsx") {
			fmt.Println(entry.Name())
		}
	}
}

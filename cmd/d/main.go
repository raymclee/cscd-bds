package main

import (
	"fmt"
	"time"
)

func main() {

	be := time.Date(2024, 4, 20, 23, 59, 59, 0, time.UTC)

	fmt.Println(be.Before(time.Now()))

}

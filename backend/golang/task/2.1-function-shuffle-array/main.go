package main

import (
	"fmt"
	"math/rand"
)

func shuffleSlice(slice []interface{}) []interface{} {
	for i := range slice {
		j := i + rand.Intn(len(slice)-i)
		slice[i], slice[j] = slice[j], slice[i]
	}

	return slice
}

func main() {
	mySlice := []interface{}{1, 2, 3, 4, 5, 6, 7, 8, 9, 10}
	shuffled := shuffleSlice(mySlice)

	fmt.Printf("%v\n", shuffled)
}

package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
	cards := NewDeck()
	cards.Print()
}

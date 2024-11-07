package main

import (
	"fmt"

	"github.com/stanleychukwu17/devops-assignments/blob/main/backend/golang/task/0-deck-of-cards-application/deck"
)

func main() {

	cards := deck.NewDeck()
	// cards.Print()
	cards.Shuffle()
	fmt.Println("All cards: ")
	cards.Print()

	user1Card, remainingCards := deck.DrawCard(5, cards)
	user2Card, _ := deck.DrawCard(5, remainingCards)

	fmt.Printf("user1Card: %#v \n", user1Card)
	fmt.Printf("user2Card: %#v \n", user2Card)

	cardName := "my-cards.txt"
	deck.SaveToFile(cardName, cards)
	deck.LoadDeckFromFile(cardName)
}

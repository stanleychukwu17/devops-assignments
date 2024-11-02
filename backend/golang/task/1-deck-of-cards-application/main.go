package main

func main() {
	cards := NewDeck()
	// cards.Print()
	cards.Shuffle()
	// cards.Print()

	// user1Card, remainingCards := DrawCard(5, cards)
	// user2Card, _ := DrawCard(5, remainingCards)

	cardName := "my-cards.txt"
	SaveToFile(cardName, cards)
	LoadDeckFromFile(cardName)
}

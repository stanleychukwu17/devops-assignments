package main

import (
	"fmt"
)

type Deck []string

func NewDeck() Deck {
	cards := Deck{}

	ranks := []string{"Ace", "Jack", "Queen", "King"}
	suits := []string{"Spades", "Hearts", "Diamonds", "Clubs"}

	for _, rank := range ranks {
		for _, suit := range suits {
			cards = append(cards, rank+" of "+suit)
		}
	}

	return cards
}

func (d Deck) Print() {
	for i, card := range d {
		fmt.Printf("%d: %s\n", i, card)
	}
}

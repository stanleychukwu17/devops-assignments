package main

import (
	"fmt"
	"math/rand"
)

type Deck []string

func NewDeck() *Deck {
	cards := Deck{}

	ranks := []string{"Ace", "Jack", "Queen", "King"}
	suits := []string{"Spades", "Hearts", "Diamonds", "Clubs"}
	// suits := []string{"Spades", "Hearts", "1", "2", "3", "4", "5", "Diamonds", "Clubs"}

	for _, rank := range ranks {
		for _, suit := range suits {
			cards = append(cards, rank+" of "+suit)
		}
	}

	return &cards
}

func (d Deck) Print() {
	for i, card := range d {
		fmt.Printf("%d: %s\n", i, card)
	}
}

func (d *Deck) Shuffle() {
	for i := range *d {
		j := i + rand.Intn(len(*d)-i)
		(*d)[i], (*d)[j] = (*d)[j], (*d)[i]
	}
}

func DrawCard(handSize int, cards *Deck) (*Deck, *Deck) {
	// Dereference cards to get the actual slice
	userCut := (*cards)[:handSize]
	remainingCards := (*cards)[handSize:]

	return &userCut, &remainingCards
}

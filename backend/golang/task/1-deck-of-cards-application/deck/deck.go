package deck

import (
	"fmt"
	"io/fs"
	"math/rand"
	"os"
	"strings"
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
		fmt.Printf("%d: %s\t", i, card)
	}
	fmt.Println("\n ")
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

func SaveToFile(filename string, cards *Deck) {
	var permission fs.FileMode = 0644

	cardsToSliceOfString := []string(*cards) // converts first to a slice of string
	joinCard := strings.Join(cardsToSliceOfString, "~")
	contentToSave := []byte(joinCard)

	err := os.WriteFile(filename, contentToSave, permission)
	if err != nil {
		fmt.Println(err)
	}
}

func LoadDeckFromFile(filename string) *Deck {
	content, err := os.ReadFile(filename)
	if err != nil {
		fmt.Printf("error: %v \n", err)
	}

	toString := string(content)
	toSlice := strings.Split(toString, "~")
	toDeck := Deck(toSlice)

	return &toDeck
}

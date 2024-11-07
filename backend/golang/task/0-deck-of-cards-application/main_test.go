package main

import (
	"testing"

	"github.com/stanleychukwu17/devops-assignments/blob/main/backend/golang/task/0-deck-of-cards-application/deck"
	"github.com/stretchr/testify/require"
)

func TestMain(t *testing.T) {
	runTheCards()

	cards := deck.NewDeck()

	require.Equal(t, 16, len(*cards))
	require.IsType(t, deck.Deck{}, *cards)
}

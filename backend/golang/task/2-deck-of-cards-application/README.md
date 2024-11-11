## Combine both arrays to make of the "deck of cards"
```go
ranks := []string{"Ace", "Jack", "Queen", "King"}
suits := []string{"Spades", "Hearts", "Diamonds", "Clubs"}
```
    use a for loop to combine "ranks" & "suits"

## List of methods to create
- **NewDeck**:  
    Let this function create and return a new deck.

- **Print**:  
    This prints out all of the cards available
  
- **ShuffleDeck**:  
    This function randomly shuffles the cards in the deck.
  
- **DrawCard**:  
    This function removes and returns the top card from the deck.

- **SaveToFile**:  
    saves the current slice of cards into a text file (.txt)

- **LoadFromFile**:  
    loads a list of cards from a text file and converts it into a slice of deck

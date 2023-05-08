Black
This is a React component for a game of Blackjack. The component contains several functions, hooks and state variables to manage game logic, state and user interactions.

Functions
Black()
This is the main function for the component. It contains all of the logic for the game, hooks and state variables.

getRandomCards(numCards)
This function is used to generate a random set of cards from the deck of cards. It takes in a parameter 
numCards
 which is the number of cards to be generated.

makeBet()
This function prompts the user to enter a bet amount. It then sets the state variable 
bet
 with the value of the bet.

newGame()
This function is used to start a new game. It calls 
makeBet()
 to get the bet amount and then sets the necessary state variables and calls the 
dealCards()
 function.

dealCards()
This function is used to deal the cards to the player and dealer. It calls 
getRandomCards()
 to generate a set of cards and sets the state variables for the player and dealer cards.

hit()
This function is used when the player chooses to hit. It calls 
getRandomCards()
 to generate a random card and sets the state variables for the player and dealer cards.

stay()
This function is used when the player chooses to stay. It sets the state variable 
turn
 to the dealer and then calls the 
determineWinner()
 function.

determineWinner(dealerPoints)
This function is used to determine the winner of the game. It takes in a parameter 
dealerPoints
 which is the total points of the dealer. It then sets the state variable 
winner
 with the result of the game.

setBalanceUser(token, balance)
This function is used to update the user's balance in the database. It takes in two parameters 
token
 and 
balance
 which is the user's token and the new balance.
import './Black.css';
import React, { useState, useEffect } from 'react';
import Header from './Components/Header/Header';
import Cards from './Components/Cards/Cards';
import { deckOfCards } from './Helpers/Data';
import win from "./Sound/win.mp3";
import loss from "./Sound/loss.mp3";
import feature from "./Sound/feature.mp3";

function Black() {
  const [winner, setWinner] = useState();
  const [playerPoints, setPlayerPoints] = useState(0);
  const [dealerPoints, setDealerPoints] = useState(0);
  const [playerCards, setPlayerCards] = useState([]);
  const [dealerCards, setDealerCards] = useState([]);
  const [turn, setTurn] = useState();
  const [cards] = useState(deckOfCards);
  const [player, setPlayer] = useState();
  const [balance, setUserBalance] = useState();
  const [gameStarted, setGameStarted] = useState(false);
  const [bet, setBet] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('/api/data/getuser');
      const userData = await response.json();
      setPlayer(userData.result.nickname);
      setUserBalance(userData.result.balance);
      setToken(userData.result.token);
    };
    getUser();
  }, [])

  useEffect(() => {
    if (playerCards.length === 0 && gameStarted) {
      dealCards();
    }
  }, [playerCards, gameStarted])

  function playWin() {
    const winMusic = new Audio(win)
    winMusic.volume = 0.4;
    winMusic.play()
  }

  function playLoss() {
    const lossMusic = new Audio(loss)
    lossMusic.volume = 0.3;
    lossMusic.play()
  }

  function playFeature() {
    const featureMusic = new Audio(feature)
    featureMusic.volume = 0.5;
    featureMusic.play()
  }

  const getRandomCards = (numCards) => {
    const randomCards = [];
    for (let i=0; i<numCards; i++) {
      const nonSelectedCards = cards.filter((card) => !card.isSelected);
      const randomCard = nonSelectedCards[Math.floor(Math.random() * (Math.floor(nonSelectedCards.length) - 0) + 0)];
      randomCard.isSelected = true;
      randomCards.push(randomCard);
    }
    return randomCards;
  }

  const makeBet = () => {
    const bets = prompt("Add your bet.");
    const betValue = Number(bets);
    if (betValue > 0) {
      setBet(betValue);
      return betValue;
    } else {
      alert("To start the game, you need to place a valid bet!")
    }
  }

  const newGame = () => {
    const lastBet = makeBet();
    if (lastBet > 0){
      setGameStarted(true);
      setTurn(player);
      setWinner();
      setPlayerPoints(0);
      setDealerPoints(0);
      setPlayerCards([]);
      setDealerCards([]);
      cards.forEach((card) => {
        card.isSelected = false
      });
      dealCards();
    } else {
      return;
    }
  }

  const dealCards = () => {
    const [card1, card2, card3] = getRandomCards(3);
    setPlayerCards(p => [...p, card1, card2]);
    setDealerCards(p => [...p, card3]);
    setPlayerPoints(card1.value + card2.value);
    setDealerPoints(card3.value);
    if (card1.value + card2.value === 21) {
      setWinner(player);
    }
  }

  const hit = () => {
    const [randomCard] = getRandomCards(1);
    if (turn === player) {
      setPlayerCards(p => [...p, randomCard]);
      setPlayerPoints(playerPoints + randomCard.value);
    } else {
      setDealerCards(p => [...p, randomCard]);
      setDealerPoints(dealerPoints + randomCard.value);
    }
  }

  const stay = () => {
    setTurn('Dealer');

    let points = dealerPoints;
    while (points < 17) {
      const [randomCard] = getRandomCards(1);
      setDealerCards(p => [...p, randomCard]);
      points += randomCard.value;
      if (points > 16) {
        setDealerPoints(points);
        determineWinner(points);
        return;
      }
    }
  }

  const determineWinner = (dealerPoints) => {
      if ((playerPoints > dealerPoints) && playerPoints <= 21) {
        setWinner(player);
        setUserBalance(balance + bet);
      } else if ((dealerPoints > playerPoints) && dealerPoints <= 21) {
        setWinner('Dealer');
        setUserBalance(balance - bet);
      } else if (playerPoints > 21 && dealerPoints <= 21) {
        setWinner('Dealer');
        setUserBalance(balance - bet);
      } else if (dealerPoints > 21 && playerPoints <= 21) {
        setWinner(player);
        setUserBalance(balance + bet);
      } else if (playerPoints === dealerPoints || (playerPoints && dealerPoints > 21)) {
        setWinner('Tie')
      }
    }

  useEffect(() => {
    async function plusBalanceUser (token, balance) {
      await fetch('/api/data/plusbalance', {
        method: "POST",
        body: JSON.stringify({
          token: token,
          balance: balance
        }),
        headers: {
            "Content-type": "application/json"
        }
      })
    }

    async function minusBalanceUser (token, balance) {
      await fetch('/api/data/minusbalance', {
        method: "POST",
        body: JSON.stringify({
          token: token,
          balance: balance
        }),
        headers: {
            "Content-type": "application/json"
        }
      })
    }
    if (winner) {
      if (winner === player) {
        plusBalanceUser(token, bet)
        playWin()
      } else if (winner === 'Dealer') {
        minusBalanceUser(token, bet)
        playLoss()
      } else if (winner === 'Tie') {
        playLoss()
        return;
      }
    }
  },[winner])

  return (
    <div className="Black">
      <Header
        balance ={((balance * 100) / 100).toFixed(2)}
        player={player}
        turn={turn}
        winner={winner}
        newGame={newGame}
      />
      <section className="Black-body">
        <div>
          <Cards
            cards={dealerCards}
          />
          <div className='player_name'>{player}</div>
          <Cards
            cards={playerCards}
          />
        </div>
        <div>
          <button className="profile-btn" onClick={() => {hit(); playFeature()}} disabled={!gameStarted}>Hit</button>
          <button className="profile-btn" onClick={() => {stay(); playFeature()}} disabled={!gameStarted}>Stay</button>
        </div>
      </section>
    </div>
  );
}

export default Black;
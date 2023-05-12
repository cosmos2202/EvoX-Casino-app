import './SlotMachinies.css';
import { useNavigate } from "react-router-dom";
import React, {useState, useEffect} from 'react';
import fruit from "./sound/fruit.mp3";
import button from "./sound/button.mp3";
import Win from "./sound/win.mp3";

const SlotMachinies = () => {

    const [user, setUser] = useState();
    const navigate = useNavigate();
    const [spin, setSpin] = useState(false);
    const [ring1, setRing1] = useState();
    const [ring2, setRing2] = useState();
    const [ring3, setRing3] = useState();
    const [price, setPrice] = useState();
    const [input, setInput] = useState();
    const [realBet, setRealBet] = useState();
    const [jackpot, setJackpot] = useState();
    const [balance, setBalance] = useState();
    const [token, setToken] = useState(); 
    const [winning, setWinning] = useState(); 
    
    useEffect(() => {
      (async () => {
        const response = await fetch('/api/data/getuser');
        const userData = await response.json();
        setUser(userData.result.nickname);
        setBalance(userData.result.balance);
        setToken(userData.result.token);
        setJackpot(userData.result.jackpot_slots)
      })();
    }, []);
    
    useEffect(() => {
        win()
    }, [ring3])

    function row1() {
        if (!spin) {
        return (
            <>
            <div className="ringEnd">🍓</div>
            <div className="ringEnd">🍇</div>
            <div className="ringEnd">🍊</div>
            <div className="ringEnd">🥭</div>
            </>
                )
        } else if (spin && ring1 === undefined) {
        return (
            <>
            <div className="ringMoving">🍓</div>
            <div className="ringMoving">🍇</div>
            <div className="ringMoving">🍊</div>
            <div className="ringMoving">🥭</div>
            </>
                )
        } else if (ring1 >= 1 && ring1 <= 50 ) {
        return (
            <>
            <div className="ringEnd">🍓</div>
            <div className="ringEnd">🍇</div>
            <div className="ringEnd">🍊</div>
            <div className="ringEnd">🥭</div>
            </>
                )  
        } else if (ring1 > 50 && ring1 <= 75) {
            return (
                <>
                <div className="ringEnd">🍇</div>
                <div className="ringEnd">🍊</div>
                <div className="ringEnd">🥭</div>
                <div className="ringEnd">🍓</div>
                </>
                    )  
            } else if (ring1 > 75 && ring1 <= 95) {
                return (
                    <>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    <div className="ringEnd">🍇</div>
                    </>
                        )  
                } else if (ring1 > 95 && ring1 <= 100) {
                    return (
                        <>
                        <div className="ringEnd">🥭</div>
                        <div className="ringEnd">🍓</div>
                        <div className="ringEnd">🍇</div>
                        <div className="ringEnd">🍊</div>
                        </>
                            )  
                    }
    }

    function row2() {
        if (!spin) {
        return (
            <>
            <div className="ringEnd">🥭</div>
            <div className="ringEnd">🍓</div>
            <div className="ringEnd">🍇</div>
            <div className="ringEnd">🍊</div>
            </>
                )
        } else if (spin && ring2 === undefined) {
        return (
            <>
            <div className="ringMoving">🍓</div>
            <div className="ringMoving">🍇</div>
            <div className="ringMoving">🍊</div>
            <div className="ringMoving">🥭</div>
            </>
                )
        } else if (ring2 >= 1 && ring2 <= 50 ) {
            return (
                <>
                <div className="ringEnd">🍓</div>
                <div className="ringEnd">🍇</div>
                <div className="ringEnd">🍊</div>
                <div className="ringEnd">🥭</div>
                </>
                    )  
            } else if (ring2 > 50 && ring2 <= 75) {
                return (
                    <>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    </>
                        )  
                } else if (ring2 > 75 && ring2 <= 95) {
                    return (
                        <>
                        <div className="ringEnd">🍊</div>
                        <div className="ringEnd">🥭</div>
                        <div className="ringEnd">🍓</div>
                        <div className="ringEnd">🍇</div>
                        </>
                            )  
                    } else if (ring2 > 95 && ring2 <= 100) {
                        return (
                            <>
                            <div className="ringEnd">🥭</div>
                            <div className="ringEnd">🍓</div>
                            <div className="ringEnd">🍇</div>
                            <div className="ringEnd">🍊</div>
                            </>
                                )  
                        }

    }

    function row3() {
        if (!spin) {
        return (
            <>
            <div className="ringEnd">🥭</div>
            <div className="ringEnd">🍓</div>
            <div className="ringEnd">🍇</div>
            <div className="ringEnd">🍊</div>
            </>
                )
        } else if (spin && ring3 === undefined) {
        return (
            <>
            <div className="ringMoving">🍓</div>
            <div className="ringMoving">🍇</div>
            <div className="ringMoving">🍊</div>
            <div className="ringMoving">🍋</div>
            <div className="ringMoving">🍍</div>
            <div className="ringMoving">🥭</div>
            </>
                )
        } else if (ring3 >= 1 && ring3 <= 50 ) {
            return (
                <>
                <div className="ringEnd">🍓</div>
                <div className="ringEnd">🍇</div>
                <div className="ringEnd">🍊</div>
                <div className="ringEnd">🥭</div>
                </>
                    )  
            } else if (ring3 > 50 && ring3 <= 75) {
                return (
                    <>
                    <div className="ringEnd">🍇</div>
                    <div className="ringEnd">🍊</div>
                    <div className="ringEnd">🥭</div>
                    <div className="ringEnd">🍓</div>
                    </>
                        )  
                } else if (ring3 > 75 && ring3 <= 95) {
                    return (
                        <>
                        <div className="ringEnd">🍊</div>
                        <div className="ringEnd">🥭</div>
                        <div className="ringEnd">🍓</div>
                        <div className="ringEnd">🍇</div>
                        </>
                            )  
                    } else if (ring3 > 95 && ring3 <= 100) {
                        return (
                            <>
                            <div className="ringEnd">🥭</div>
                            <div className="ringEnd">🍓</div>
                            <div className="ringEnd">🍇</div>
                            <div className="ringEnd">🍊</div>
                            </>
                                )  
                        }
    }

    function playFruit() {
        const fruitMusic = new Audio(fruit)
        fruitMusic.volume = 0.4;
        fruitMusic.play()
      }
  
    function playButton() {
        const buttonMusic = new Audio(button)
        buttonMusic.volume = 0.3;
        buttonMusic.play()
      }
   
    function playWin() {
        const winMusic = new Audio(Win)
        winMusic.volume = 0.4;
        winMusic.play()
      }
  
   function rand() {
     setRing1(Math.floor(Math.random() * (100 - 1) + 1))
     setTimeout(() => setRing2(Math.floor(Math.random() * (100 - 1) + 1)), 1000)
     setTimeout(() => setRing3(Math.floor(Math.random() * (100 - 1) + 1)), 2000)
   }
   
   function play() {
     if (ring3 > 1 || !spin) {
       if (input <= balance && input >= 0.1) {
        playFruit()
         setRealBet(input)
         setSpin(true)
         setRing1()
         setRing2()
         setRing3()
         setBalance(balance - input)
         minusBalanceUser(token, input)
         setJackpot(jackpot + (input / 2))
         setJackpotAmount(token, jackpot + (input / 2))
         setTimeout(rand, 1500)
       } else {
         setPrice(10)
       }
     }
   }
   
   function win() {
     if (ring1 <= 50 && ring2 <= 50 && ring3 <= 50 && ring1 !== undefined) {
       setPrice(1)
       setBalance(balance + (realBet * 4))
       setWinning(realBet * 4)
     } else if (ring1 > 50 && ring1 <= 75 && ring2 > 50 && ring2 <= 75 && ring3 > 50 && ring3 <= 75 && ring1 !== undefined) {
       setPrice(2)
       setBalance(balance + (realBet * 6))
       setWinning(realBet * 6)
     } else if (ring1 > 75 && ring1 <= 95 && ring2 > 75 && ring2 <= 95 && ring3 > 75 && ring3 <= 95 && ring1 !== undefined) {
       setPrice(3)
       setBalance(balance + (realBet * 8))
       setWinning(realBet * 8)
     } else if (ring1 > 95 && ring1 <= 100 && ring2 > 95 && ring2 <= 100 && ring3 > 95 && ring3 <= 100 && ring1 !== undefined) {
       setPrice(4)
       setBalance(balance + jackpot)
       setWinning(jackpot)
       setJackpot(0)
       setJackpotAmount(token, 0)
     } else {
       setPrice(0)
     } 
   }
   
   function premio() {
     if (price === 1 && ring3 > 1) {
       return (
         <p className="priceInd">{"🍇 X4 You've won " + (realBet * 4) + "EvoX"}</p>
       )
     } else if (price === 2 && ring3 > 1) {
       return (
         <p className="priceInd">{"🍊 X6 You've won " + (realBet * 6) + "EvoX"}</p>
       )
     } else if (price === 3 && ring3 > 1) {
       return (
         <p className="priceInd">{"🥭 X8 You've won " + (realBet * 8) + "EvoX"}</p>
       )
     } else if (price === 4 && ring3 > 1) {
       return (
         <p className="priceInd">{"🍓 Jackpot! You've won: " + (jackpot) + "EvoX"}</p>
       )
     } else if (price === 0 && ring3 > 1) {
       return (
         <p className="priceInd">😧 ¡So close! But no luck...</p>
       )
     } else if (price === 10) {
       return (
         <p className="priceInd">🥶 <span style={{color: `red`}}>Not enough funds</span> </p>
       )
     }
   }

   useEffect(() => {
    if(price > 0 && price < 5) {
      plusBalanceUser(token, winning);
      playWin();
    } 
   }, [price])

    function numChecker(e) {
            const value = e.target.value;
            const regex = /^[0-9.]+$/;
            if (value.match(regex) && parseInt(value) >= 0) {
                setInput(value);
            }
        }

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

    async function setJackpotAmount(token, jackpotAmount) {
      await fetch('/api/data/setjackpot', {
        method: 'POST',
        body: JSON.stringify({
          token: token,
          jackpot: jackpotAmount
        }),
        headers: {
          'Content-type': 'application/json',
        },
      });
    }

    return (
        <div className="fullSlot">
            <h1 className="casinoName">EvoX Casino</h1>
            <h1 className="price">{"Jackpot: " + ((jackpot * 100) / 100).toFixed(2) + " EvoX"}</h1>
            <div className="slot">
                <div className="row">
                    {row1()}
                </div>
                <div className="row">
                    {row2()}
                </div>
                <div className="row">
                    {row3()}
                </div>
            </div>
            <h1 className="price">
                {premio()}
            </h1>
            <div className="slotFoot">
                <input type="number" onChange={(e) => numChecker(e)} className="betInput" placeholder="set bet"></input>
                <button className="spinButton" onClick={() => {play(); playButton()}}>Spin</button>
            </div>
            <h1 className="price">Available cash: {((balance * 100) / 100).toFixed(2)} EvoX</h1>
            <button onClick={() => {navigate("/user")}} className="buyMoreButton">back to profile</button>
        </div>  
    )
}

export default SlotMachinies;

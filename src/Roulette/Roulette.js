import React from "react";
import './roulette.css';
import Context from './components/Context'
import BetBoard from './components/BetBoard'
import LastNumbers from './components/LastNumbers'
import Chips from './components/Chips'
import Balance from './components/Balance'
import Board from './components/Board';
import Confetti from './components/Confetti';
import ProfileBtn from "./components/ProfileBtn";

function Roulette() {

  return (
    <div className="roulette">
      <Context>
        <Balance />
        <ProfileBtn />
        <UpperContainer />
        <BottomContainer />
      </Context>
    </div>
  );
}

const UpperContainer = () => {
  return (
    <div className='upper-container'>
      <Board />
      <Confetti />
    </div>
  )
}

const BottomContainer = () => {
  return (
    <div className='bottom-conteiner'>
      <LastNumbers />
      <BetBoard />
      <Chips />
    </div>
  )
}

export default Roulette;
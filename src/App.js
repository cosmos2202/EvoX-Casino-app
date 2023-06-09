import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Fon from "./res/Fon/Fon";
import Logo from "./res/Logo/Logo"
import Withdraw from "./res/Withdraw/Withdraw";
import Roulette from "./Roulette/Roulette";
import SlotMachinies from "./SlotMachinies/SlotMachinies";
import Black from "./Black/Black";
import Main from "./res/pages/Setup/Main";
import Login from "./res/pages/Setup/Login";
import Registration from "./res/pages/Setup/Registration";
import User from "./res/pages/User/User";
import BackgroundMelody from './Roulette/sound/Fon.mp3';
import Baccarat from './Baccarat/Baccarat';
import RollDice from "./RollDice/RollDice";
import Poker from "./Poker/Poker";
import DoubleMarquee from "./res/DoubleMarquee/DoubleMarquee";
import { Chess as Self } from "./Chess/Chess"; 

function App() {
  const Chess = (Self);
  return (
    <div className="App">
      <Fon />
      <Logo />
      <DoubleMarquee />
      <BackgroundMusic/>
      <Router>
        <Suspense fallback={<></>}>
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/withdraw" element={<Withdraw />} />
            <Route exact path="/auth" element={<Login />} />
            <Route exact path="/registration" element={<Registration />} />
            <Route exact path="/user" element={<User />} />
            <Route exact path="/roulette" element={<Roulette />} />
            <Route exact path="/slotmachinies" element={<SlotMachinies />} />
            <Route exact path="/black" element={<Black />} />
            <Route exact path="/baccarat" element={<Baccarat />} />
            <Route exact path="/rolldice" element={<RollDice />} />
            <Route exact path="/poker" element={<Poker />} />
            <Route exact path="/chess" element={<Chess />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
}

const BackgroundMusic = () => {
  const BackgroundMusic = new Audio(BackgroundMelody);
  BackgroundMusic.volume = 0.2;
  BackgroundMusic.loop = true;
  BackgroundMusic.play();
}

export default App;
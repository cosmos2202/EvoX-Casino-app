import './Header.css';
import { useNavigate } from 'react-router-dom';
import feature from "../../Sound/feature.mp3";

const Header = (props) => {
  const navigate = useNavigate();

  function playFeature() {
    const featureMusic = new Audio(feature)
    featureMusic.volume = 0.5;
    featureMusic.play()
  }

  return (
    <div className="App-header">
      <button className="profile-btn" onMouseUp={() => {navigate('/user'); playFeature()}}>{props.player}</button>
      <div>
        <div>Your Balance: {props.balance} EvoX</div>
        <div>Turn: {props.turn}</div>
        <div>Winner: {props.winner}</div>
      </div>
      <button className="profile-btn" onClick={() => {props.newGame(); playFeature()}}>New Game</button>
    </div>
  )
}

export default Header;
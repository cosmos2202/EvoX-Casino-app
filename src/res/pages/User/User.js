import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './user.css';
import feature from "../../../Black/Sound/feature.mp3";
import Rules from "../../Rules/Rules";
import { generalRules } from "../../Rules/generalRules";

const checkBlockchainTransactions = async () => {
  await fetch('/api/data/getbalance');
};

function User() {

    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [userAddress, setUserAddress] = useState();
    const [userBalance, setUserBalance] = useState();

   useEffect(() => {
      const getUser = async () => {
        const response = await fetch('/api/data/getuser');
        const userData = await response.json();
        setUser(userData.result.nickname);
        setUserAddress(userData.result.useraddress);
        setUserBalance(userData.result.balance);
      };
      getUser();
   }, [])
   
   function copyToClipboard(text) {
     let textArea = document.createElement("textarea");
     textArea.value = text;
     document.body.appendChild(textArea);
     textArea.select();
     document.execCommand("Copy");
     document.body.removeChild(textArea);
   }

   function ExitProfile(){
    document.cookie.split(";").forEach(c => document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`));
    navigate('/')
   };

   function playFeature() {
    const featureMusic = new Audio(feature)
    featureMusic.volume = 0.5;
    featureMusic.play()
  }

  async function Send() {
    const url = `evox:action=send&address=${userAddress}&comment=''&hide_sender=true&hide_receiver=true`
    window.open(url,'_blank');
    alert('Please continue in your EvoX GUI Wallet')
  }

    return (
        <div className="user-page">
            <div className="profile-data">
                <div>
                    <h1>Hello {user}!</h1>
                </div>
                <div className="user-balance">
                    <h1>Balance: {((userBalance * 100) / 100).toFixed(2)} EvoX</h1>
                </div>
                <div className="deposit">
                    <h1>Your address for adding funds to your balance: </h1>
                    <p className="mobile_disable">{userAddress}</p>
                    <button 
                      className="profile-btn" 
                      onMouseUp={() => {copyToClipboard(userAddress); playFeature()}}
                    >Copy Address</button>
                    <button 
                      className="profile-btn mobile_disable" 
                      onMouseUp={() => {Send(); playFeature()}}
                    >Go to Wallet</button>
                    <button className="profile-btn">
                      <Rules
                        modalTitle={"General Rules"}
                        modalBody={generalRules}
                      />
                    </button>
                    <button className="profile-btn mobile_disable" onMouseUp={() => {navigate('/withdraw'); playFeature()}}>Withdraw</button>
                    <button className="profile-btn" onClick={ExitProfile}>Exit Profile</button>
                </div>
            </div>
            <div>
                <h2>Available games</h2>    
                <button className="select_game_btn mobile_disable" onMouseUp={() => {navigate('/roulette'); playFeature()}}>
                  <img className="btn_img" src={require("./img/roulette.png")} title="Roulette" alt=""></img>
                  Roulette
                </button>
                <button className="select_game_btn" onMouseUp={() => {navigate('/slotmachinies'); playFeature()}}>
                  <img className="btn_img" src={require("./img/slot-machine.png")} title="Slot Machine" alt=""></img>
                  &nbsp;&nbsp;Slots
                </button>
                <button className="select_game_btn" onMouseUp={() => {navigate('/black'); playFeature()}}>
                  <img className="btn_img" src={require("./img/blackjack.png")} title="Blackjack" alt=""></img>
                  Blackjack
                </button>
                <button className="select_game_btn" onMouseUp={() => {navigate('/baccarat'); playFeature()}}>
                  <img className="btn_img" src={require("./img/baccarat.png")} title="Baccarat" alt=""></img>
                  Baccarat
                </button>
                <button className="select_game_btn" onMouseUp={() => {navigate('/chess'); playFeature()}}>
                  <img className="btn_img" src={require("./img/chess.png")} title="Chess" alt=""></img>
                  &nbsp;&nbsp;Chess
                </button>
                <button className="select_game_btn mobile_disable" onMouseUp={() => {navigate('/rolldice'); playFeature()}}>
                  <img className="btn_img" src={require("./img/craps.png")} title="Craps" alt=""></img>
                  Craps
                </button>
                <button className="select_game_btn" onMouseUp={() => {navigate('/poker'); playFeature()}}>
                  <img className="btn_img" src={require("./img/poker.png")} title="Poker" alt=""></img>
                  Poker
                </button>  
            </div>
            <p style={{paddingTop: "50px"}}>For all questions and suggestions, please contact the appropriate <a href="https://discord.gg/erYnAQf">discord</a> #games.</p>
        </div>
    );
}
checkBlockchainTransactions();
export default User;
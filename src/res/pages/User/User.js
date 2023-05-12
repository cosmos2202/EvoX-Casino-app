import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './user.css';
import feature from "../../../Black/Sound/feature.mp3"

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
                    <p>{userAddress}</p>
                    <button 
                      className="profile-btn" 
                      onMouseUp={() => {copyToClipboard(userAddress); playFeature()}}
                    >Copy Address</button>
                    <button 
                      className="profile-btn" 
                      onMouseUp={() => {Send(); playFeature()}}
                    >Go to Wallet</button>
                </div>
            </div>
            <div>    
                <button className="profile-btn" onMouseUp={() => {navigate('/roulette'); playFeature()}}>Roulette</button>
                <button className="profile-btn" onMouseUp={() => {navigate('/slotmachinies'); playFeature()}}>Slot Machinies</button>
                <button className="profile-btn" onMouseUp={() => {navigate('/black'); playFeature()}}>Blackjack</button>
                <button className="profile-btn" onMouseUp={() => {navigate('/baccarat'); playFeature()}}>Baccarat</button>
                <button className="profile-btn" onMouseUp={() => {navigate('/withdraw'); playFeature()}}>Withdraw</button>
                <button className="profile-btn" onClick={ExitProfile}>Exit Profile</button>
            </div>
            <p>For all questions and suggestions, please contact the appropriate <a href="https://discord.gg/erYnAQf">discord</a> #casino.</p>
        </div>
    );
}
checkBlockchainTransactions();
export default User;
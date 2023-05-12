import './baccarat.css';
import {Box, Card} from "@mui/material";
import { shades } from './theme';
import { useState, useEffect } from 'react';
import Chip from './components/chips';
import { chipImages } from './components/chips';
import { cardImages, backside } from './components/cardImages';
import BetArea from './components/BetArea';
import { useSpring, animated } from "react-spring";
import CountingGrids from './components/countingrow';
import { useNavigate } from "react-router-dom";
import win from "./Sound/win.mp3";
import loss from "./Sound/loss.mp3";
import feature from "./Sound/feature.mp3";
import card from "./Sound/card_delivery.mp3";

var playerhit = false;
var betmemory = [];

const markergridcols = 20;
const markergridrows = 6;
var deck = [...cardImages, ...cardImages, ...cardImages];

const initGridParams = (cols, color, rows) =>{
  var params = [];
  for (var i =0; i < cols; i++){
    var rpara = [];
    for(var x = 0; x<rows; x++){
      rpara.push({
        "c": color,
        "o": 1,
        "occupied": false
      });
    }
    params.push(rpara);
  }
  return params; 
}

function Baccarat() {

  const navigate = useNavigate();
  const [playercards, setplayercards] = useState([backside, backside]);
  const [playerhitcard, setplayerhitcard] = useState(backside);
  const [bankerhitcard, setbankerhitcard] = useState(backside);
  const [bankercards, setbankercards] = useState([backside, backside]);
  const [playerscore, setpscore] = useState(0);
  const [bankerscore, setbscore] = useState(0);
  const [gameprompt, setgp] = useState("");
  const [playerhitturncount, setphitturncount] = useState(0);
  const [trc, settrc] = useState(0);
  const [ptc1, setptc1] = useState(0);
  const [ptc2, setptc2] = useState(0);
  const [btc1, setbtc1] = useState(0);
  const [btc2, setbtc2] = useState(0);
  const [triggerhits, setth] = useState(0);
  const [triggerend, setend] = useState(0);
  const [isp1animating, animatep1] = useState(false);
  const [isp2animating, animatep2] = useState(false);
  const [isb1animating, animateb1] = useState(false);
  const [isb2animating, animateb2] = useState(false);
  const [isp3animating, animatep3] = useState(false);
  const [isb3animating, animateb3] = useState(false);
  const [promptcolor, setcolor] = useState(shades.neutral[100]);
  const [betvalueplayer,  setbvplayer] = useState({"val": 0, "chipsrc": "", "opac": 0, "color": "", "anim": ""});
  const [betvaluebanker, setbvbanker] = useState({"val": 0, "chipsrc": "", "opac": 0, "color": "", "anim": ""});
  const [betvaluetie, setbvtie] = useState({"val": 0, "chipsrc": "", "opac": 0, "color": "", "anim": ""});
  const [chipselected, setchipselected] = useState(null);
  const [balance, setBalance] = useState();
  const [roundStarted, setroundstart] = useState(false);
  const [gridparams, setgridparams] = useState(initGridParams(markergridcols, shades.primary[300], markergridrows));
  const [gridlocator, setglocator] = useState([0, 0, 1]);
  const [winmemory, setwinmem] = useState([]);
  const [token, setToken] = useState();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch('/api/data/getuser');
      const userData = await response.json();
      setBalance(userData.result.balance);
      setToken(userData.result.token);
    };
    getUser();
  }, [])

  useEffect(()=>{
    if(roundStarted){
      setTimeout(()=>{
        dealplayerfirstcard();
      }, 500);
    }
  }, [trc]);

  useEffect(()=>{
    if(roundStarted){
      setTimeout(()=>{
        dealplayersecondcard();
      }, 500);
    }
  }, [ptc1]);

  useEffect(()=>{
    if(roundStarted){
      setTimeout(()=>{
        dealbankerfirstcard();
      }, 500);
    }
  }, [ptc2]);

  useEffect(()=>{
    if(roundStarted){
      setTimeout(()=>{
        dealbankersecondcard();
      }, 500);
    }
  }, [btc1]);

  useEffect(()=>{
    if(roundStarted){
      setTimeout(()=>{
        evaluatenaturalwin();
      }, 50);
    }
  },[btc2]);

  useEffect(()=>{
    if(roundStarted){
      setTimeout(()=>{
        dealPlayerHits();
      }, 400);
    }
  }, [triggerhits]);

  useEffect(()=>{
    if(roundStarted){
      setTimeout(()=>{
        dealBankerHits();
      }, 500);
    }
  }, [playerhitturncount]);

  useEffect(()=>{
    if(roundStarted){
      setTimeout(()=>{
        endRound();
      }, 200);
    }
  }, [triggerend]);

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

  function playCard() {
    const cardMusic = new Audio(card)
    cardMusic.volume = 0.4;
    cardMusic.play()
  }

  const startRound = () => {
    setcolor(shades.neutral[100]);
    setgp("");
    setpscore(0);
    setbscore(0);
    setplayercards([backside, backside]);
    setplayerhitcard(backside);
    setbankercards([backside, backside]);
    setbankerhitcard(backside);
    animatep1(false);
    animatep2(false);
    animatep3(false);
    animateb1(false);
    animateb2(false);
    animateb3(false);
    setroundstart(true);
    betmemory = [];
    settrc(trc + 1);
  }

  const endRound = () => {
      let wmem = winmemory;
      let bounty = 0;
  
      if (playerscore > bankerscore) {
        advanceglocator("p");
        wmem.push("p");
        updateGridSingle(gridlocator[0], gridlocator[1], shades.blueish[200], true);
        setgp("Player Wins");
        setcolor(shades.blueish[200]);
        if (betvalueplayer.val > 0) {
          bounty += betvalueplayer.val * 2;
          setbvplayer({
            val: betvalueplayer.val * 2,
            chipsrc: betvalueplayer.chipsrc,
            opac: 1,
            color: betvalueplayer.color,
            anim: "chiptoplayer"
          });
        }
        if (betvaluebanker.val > 0) {
          setbvbanker({
            val: betvaluebanker.val,
            chipsrc: betvaluebanker.chipsrc,
            opac: 1,
            color: betvaluebanker.color,
            anim: "chiptobanker"
          });
        }
        if (betvaluetie.val > 0) {
          setbvtie({
            val: betvaluetie.val,
            chipsrc: betvaluetie.chipsrc,
            opac: 1,
            color: betvaluetie.color,
            anim: "chiptobanker"
          });
        }
        if(balance + bounty > balance) playWin();
        else playLoss();
        setTimeout(() => {
          setBalance(balance + bounty);
          plusBalanceUser( token, bounty);
        }, 600);
      }
  
      if (bankerscore > playerscore) {
        advanceglocator("b");
        wmem.push("b");
        updateGridSingle(gridlocator[0], gridlocator[1], shades.secondary[200], true);
        setgp("Banker Wins");
        setcolor(shades.secondary[200]);
        if (betvaluebanker.val > 0) {
          bounty = betvaluebanker.val * 2;
          setbvbanker({
            val: bounty,
            chipsrc: betvaluebanker.chipsrc,
            opac: 1,
            color: betvaluebanker.color,
            anim: "chiptoplayer"
          });
          setTimeout(() => {
            setBalance(balance + bounty);
            plusBalanceUser( token, bounty);
          }, 600);
        }
        if (betvalueplayer.val > 0) {
          playLoss();
          setbvplayer({
            val: betvalueplayer.val,
            chipsrc: betvalueplayer.chipsrc,
            opac: 1,
            color: betvalueplayer.color,
            anim: "chiptobanker"
          });
        }
        if (betvaluetie.val > 0) {
          playLoss();
          setbvtie({
            val: betvaluetie.val,
            chipsrc: betvaluetie.chipsrc,
            opac: 1,
            color: betvaluetie.color,
            anim: "chiptobanker"
          });
        }
        if(balance + bounty > balance) playWin();
        else playLoss();
      }
  
      if (playerscore === bankerscore) {
        advanceglocator(1);
        updateGridSingle(gridlocator[0], gridlocator[1], shades.neutral[100], true);
        setgp("Tie");
        setcolor(shades.neutral[100]);
        if (betvaluetie.val > 0) {
          bounty += betvaluetie.val * 6;
          setbvtie({
            val: betvaluetie.val * 6,
            chipsrc: betvaluetie.chipsrc,
            opac: 1,
            color: betvaluetie.color,
            anim: "chiptoplayer"
          });
        }
        if (betvaluebanker.val > 0) {
          bounty += betvaluebanker.val;
          setbvbanker({
            val: betvaluebanker.val,
            chipsrc: betvaluebanker.chipsrc,
            opac: 1,
            color: betvaluebanker.color,
            anim: "chiptoplayer"
          });
        }
        if (betvalueplayer.val > 0) {
          bounty += betvalueplayer.val;
          setbvplayer({
            val: betvalueplayer.val,
            chipsrc: betvalueplayer.chipsrc,
            opac: 1,
            color: betvalueplayer.color,
            anim: "chiptoplayer"
          });
        }
        if(balance + bounty > balance) playWin();
        else playLoss();
        setTimeout(() => {
          setBalance(balance + bounty);
          plusBalanceUser( token, bounty);
        }, 600);
      }
  
      setwinmem(wmem);
  
      setTimeout(() => {
        setbvplayer({
          val: 0,
          chipsrc: "",
          opac: 0,
          color: "",
          anim: ""
        });
  
        setbvtie({
          val: 0,
          chipsrc: "",
          opac: 0,
          color: "",
          anim: ""
        });
  
        setbvbanker({
          val: 0,
          chipsrc: "",
          opac: 0,
          color: "",
          anim: ""
        });
  
        setroundstart(false);
      }, 1500);
    }
 
  const advanceglocator = (currentwin) =>{
    var wmm = winmemory;
    var gloc = gridlocator;
    if(wmm.length === 0){
      return;
    }
    if(wmm[wmm.length-1] === currentwin || currentwin === 1){
      if(gloc[1] + 1 < markergridrows && !gridparams[gloc[0]][gloc[1]+1].occupied){
        gloc[1] = gloc[1] + 1;
      }else{
        if(gloc[2]<markergridcols){
          gloc[0] = gloc[0] + 1;
        }else{
          shiftGrid();
          if(gloc[2]-1 >= 0){
            gloc[2] = gloc[2] - 1;
          }else{
            gloc[2] = 0;
          }
        }
      }
    }else{
      if(gloc[2] < markergridcols){
        gloc[0] = gloc[2];
        gloc[2] = gloc[2] + 1;
        gloc[1] = 0;
      }else{
        shiftGrid();
        gloc[1] = 0;
      }      
    }
    setglocator(gloc);
  }

  const dealplayerfirstcard = () =>{
    if(deck.length < 6){
      deck = [...cardImages, ...cardImages, ...cardImages];
    }
    var d = [];
    var x = Math.floor(Math.random()*deck.length);
    d.push(deck[x]);
    d.push(backside);
    deck.splice(x, 1);
    setpscore(d[0].val);
    setplayercards(d);
    animatep1(true);
    setptc1(ptc1 + 1);
    playCard();
  }

  const dealplayersecondcard = () => {
    var d = playercards;
    var score = playerscore;
    var x = Math.floor(Math.random()*deck.length);
    d[1] = deck[x];
    score += deck[x].val;
    deck.splice(x, 1);
    if(score > 9){
      score -= 10;
    }
    setpscore(score);
    setplayercards(d);
    animatep2(true);
    setptc2(ptc2+1);
    playCard();
  }

  const dealbankerfirstcard = () => {
    var d = [];
    var x = Math.floor(Math.random()*deck.length);
    d.push(deck[x]);
    d.push(backside);
    deck.splice(x, 1);
    setbscore(d[0].val);
    setbankercards(d);
    animateb1(true);
    setbtc1(btc1 + 1);
    playCard();  
  }

  const dealbankersecondcard = () => {
    var d = bankercards;
    var score = bankerscore;
    var x = Math.floor(Math.random()*deck.length);
    d[1] = deck[x];
    score += deck[x].val;
    deck.splice(x, 1);
    if(score > 9){
      score -= 10;
    }
    setbscore(score);
    setbankercards(d);
    animateb2(true);
    setbtc2(btc2+1);
    playCard();
  }

  const evaluatenaturalwin = () =>{
    if(playerscore > 7 || bankerscore > 7){
      setend(triggerend + 1);
    }else{
      setth(triggerhits + 1);
    }
  }



  const dealPlayerHits = () =>{
    if(playerscore < 6){
      var i = Math.floor(Math.random()*deck.length);
      var score = playerscore;
      setplayerhitcard(deck[i]);
      score += deck[i].val;
      deck.splice(i, 1);
      if(score > 9){
        score -= 10;
      }
      playerhit = true;
      setpscore(score);
      animatep3(true);
      setphitturncount(playerhitturncount + 1);
      playCard();
    }
    if(playerscore > 5){
      playerhit = false;
      setphitturncount(playerhitturncount + 1);
    }
  }

  const hitbankerhelper = () =>{
    var i = Math.floor(Math.random()*deck.length);
    var score = bankerscore;
    setbankerhitcard(deck[i]);
    score += deck[i].val;
    deck.splice(i,1);
    if(score>9){
      score -= 10;
    }
    setbscore(score);
    animateb3(true);
    setend(triggerend + 1);
    playCard();
  }

  const dealBankerHits = () =>{
    if(bankerscore < 8){
      if(playerscore > 5 && !playerhit){
        if(bankerscore < 6){
          hitbankerhelper();
        }else{
          setend(triggerend+1);
        }
      }
      if(playerhit){
        if(playerhitcard.val === 8){
          if(bankerscore < 3){
            hitbankerhelper();
          }else{
            setend(triggerend+1);
          }
        }
        if(playerhitcard.val < 8 && playerhitcard.val > 5){
          if(bankerscore < 7){
            hitbankerhelper();
          }else{
            setend(triggerend+1);
          }
        }
        if(playerhitcard.val === 4 || playerhitcard.val === 5){
          if(bankerscore < 6){
            hitbankerhelper();
          }else{
            setend(triggerend+1);
          }
        }
        if(playerhitcard.val === 2 || playerhitcard.val === 3){
          if(bankerscore < 5){
            hitbankerhelper();
          }else{
            setend(triggerend+1);
          }
        }
        if(playerhitcard.val === 9 || playerhitcard.val === 0){
          if(bankerscore < 4){
            hitbankerhelper();
          }else{
            setend(triggerend+1);
          }
        }
      }
    }else{
      setend(triggerend + 1);
    }  
  }

 const dealCards = () => {
    const bets = betvalueplayer.val + betvaluebanker.val + betvaluetie.val
    if ((bets) === 0) {
       return;
    } else {
       startRound();
       playFeature();
       setBalance(balance - bets);
       minusBalanceUser(token, bets);
    }
 }

  const selectChip = (value) => {
    setchipselected(value);
  }

  const makeBet = (setbet, currentbet) => {
    if(!roundStarted){
      if(chipselected != null && balance >= chipselected.val){
        var b = currentbet.val + chipselected.val;
        betmemory.push({"refundval": chipselected.val, "chipsrc": currentbet.chipsrc, "opac": currentbet.opac, "color": currentbet.color, "method":setbet, "currentval": currentbet.val});
        setbet({"val": b, "chipsrc": chipselected.src, "opac": 1, "color": chipselected.fontcolor, "anim": ""});
      }
    }  
  }

  const clearBets = () => {
    if(betvalueplayer.val > 0){
      setbvplayer({
        "val": 0, 
        "chipsrc":"",
        "opac": 0,
        "color": "",
        "anim": ""     
      });  
    }
    if(betvaluebanker.val > 0){
      setbvbanker({
        "val": 0, 
        "chipsrc":"",
        "opac": 0,
        "color": "",
        "anim": ""     
      });  
    }
    if(betvaluetie.val > 0){
      setbvtie({
        "val": 0, 
        "chipsrc":"",
        "opac": 0,
        "color": "",
        "anim": ""     
      });
    }
    playFeature();
  }

  const undoBets = () => {
    if(!roundStarted){
      if(betmemory.length !== 0){
        var mem = betmemory.pop();
        mem.method({"val": mem.currentval, "chipsrc": mem.chipsrc, "opac": mem.opac, "color": mem.color, "anim": ""});
      }
    }
    playFeature();
  }

  const updateGridSingle = (col, row, color, occupancy) =>{
    var p = [...gridparams];
    p[col][row].c = color;
    p[col][row].occupied = occupancy;
    setgridparams(p);
  }

  const shiftGrid = () =>{
    
    var newgrid = [...gridparams];
    
    for( var x = 0; x < newgrid.length; x++){
      for(var y = 0; y < newgrid[x].length; y++){
        if(x+1 < newgrid.length){
          newgrid[x][y].c = newgrid[x+1][y].c;
          newgrid[x][y].o = newgrid[x+1][y].o;
          newgrid[x][y].occupied = newgrid[x+1][y].occupied;
        }else{
          newgrid[x][y].c = shades.primary[300];
          newgrid[x][y].o = 1;
          newgrid[x][y].occupied = false;
        }
      }
    }
    setgridparams(newgrid);
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
  
  return (
    <Box position = "relative">
      <div className="Baccarat" style = {{maxWidth: '500px', marginTop: '-100px', marginBottom: '5px'}}>
      <Box 
        display = "flex" 
        alignItems = "center" 
        marginTop = "95px"
        justifyContent = "center" 
        color = {promptcolor}
        height = "20px"
      >
        <h4>
          {gameprompt}
        </h4>
      </Box>
      
      <div 
        className = "card-grid"
      >
        <Box 
          display = "flex"
          margin = "auto"
          width = "60%"
          alignItems = "center"
          justifyContent = "space-between"          
        >
          <Box color = {shades.blueish[200]} display = "flex" height = "30px" alignItems = "center">
            <h4>Player</h4>
          </Box>
          <Box color = {shades.secondary[200]} display = "flex" height = "40px" alignItems = "center">
            <h4>Banker</h4>
          </Box>
        </Box>
      </div>
      <Box 
        id = "scores"
        display = "flex"
        margin = "auto"
        height = "40px"
        width = "60%"
        justifyContent = "space-between"
        columnGap = "10px"
      >
        <Box color = {shades.neutral[100]} display = "flex" alignItems = "center" height = "50px">
          <h3>{playerscore}</h3>
        </Box>
        <Box color = {shades.neutral[100]} display = "flex" alignItems = "center" height = "50px" marginTop={'-25px'}>
          <h3>Balance: {((balance * 100) / 100).toFixed(2)} EvoX</h3>
        </Box>
        <Box color = {shades.neutral[100]} display = "flex" alignItems = "center" height = "50px">
          <h3>{bankerscore}</h3>
        </Box>
      </Box>
      <div id = "cardshere">
        <Box
          display = "flex"
          margin = "auto"
          width = "90%"
          alignItems = "center"
          justifyContent = "center"
          columnGap = "30px"
        >
          <Box 
            justifyContent="space-between" 
            columnGap = "5px"
            display = "flex"
            alignItems = "center"
          >
            <img className = {isp1animating ? "flyin":"notflyin"} width = "45%" src = {playercards[0].src} alt='' />
            <img className = {isp2animating ? "flyin":"notflyin"} width = "45%" src = {playercards[1].src} alt='' />
          </Box>  
          <Box
            justifyContent="space-between" 
            columnGap = "5px"
            display = "flex"
            alignItems = "center"
          >
            <img className = {isb1animating ? "flyin":"notflyin"} width = "45%" src = {bankercards[0].src} alt='' />
            <img className = {isb2animating ? "flyin":"notflyin"} width = "45%" src = {bankercards[1].src} alt='' />
          </Box>
        </Box>
        <Box
          display = "flex"
          margin = "auto"
          width = "80%"
          alignItems = "top"
          justifyContent= "space-between"
          columnGap="10px"
        >
          <img className = {isp3animating ? "rotate90flyin" : "notflyin"} width = "23%" src = {playerhitcard.src} alt='' />
          <img className = {isb3animating ? "rightin" : "notflyin"} width = "23%" src = {bankerhitcard.src} alt='' />
        </Box>
      </div>
      <Box display = "flex" justifyContent = "center" height = "30px" margin = "auto" alignItems = "center" paddingBottom= "0px">
        <h4 style={{color: 'white'}}> --------  BET  -------- </h4>
      </Box>
      <Box
        display = "flex"
        margin = "auto"
        width = "90%"
        justifyContent = "space-between"
        columnGap = "5px"
      >
        <Box
          width = "50%"
          onClick = {() => makeBet(setbvplayer, betvalueplayer, playFeature())}
        >
          <BetArea
            tcolor = {shades.blueish[200]}
            title = "Player"
            chipsrc = {betvalueplayer.chipsrc}
            betvalue = {betvalueplayer.val}
            betcolor = {betvalueplayer.color}
            opac = {betvalueplayer.opac}
            anim = {betvalueplayer.anim}
          ></BetArea>
        </Box>
        <Box 
          width = "50%"
          onClick = {()=> makeBet(setbvtie, betvaluetie, playFeature())}
        >
          <BetArea
            tcolor = {shades.neutral[300]}
            title = "Tie"
            chipsrc = {betvaluetie.chipsrc}
            betvalue = {betvaluetie.val}
            betcolor = {betvaluetie.color}
            opac = {betvaluetie.opac}
            anim = {betvaluetie.anim}
          ></BetArea>
        </Box>
        <Box 
          width = "50%"
          onClick = {()=> makeBet(setbvbanker, betvaluebanker, playFeature())}
        >
          <BetArea
            tcolor = {shades.secondary[200]}
            title = "Banker"
            chipsrc = {betvaluebanker.chipsrc}
            betvalue = {betvaluebanker.val}
            betcolor = {betvaluebanker.color}
            opac = {betvaluebanker.opac}
            anim = {betvaluebanker.anim}
          ></BetArea>
        </Box>
      </Box>
      <Box
        height = "40px"
        display = "flex"
        margin = "auto"
        paddingTop = "15px"
        paddingBottom = "0px"
        width = "90%"
        justifyContent="space-between"
        columnGap = "15px"
      >
        <Box 
          onClick = {() => {selectChip(chipImages[3]); playFeature()}}
          className = {roundStarted ? "chipgoaway":"chipcomeback"}
        >
          <Chip 
            chipvalue = {chipImages[3].val} 
            urlsrc = {chipImages[3].src}
            color = {shades.primary[300]}
            isSelected = {chipselected === chipImages[3]}
          ></Chip>
        </Box>
        <Box 
          onClick = {() => {selectChip(chipImages[4]); playFeature()}}
          className = {roundStarted ? "chipgoaway":"chipcomeback"}
        >
          <Chip 
            chipvalue = {chipImages[4].val} 
            urlsrc = {chipImages[4].src}
            color = {shades.neutral[100]}
            isSelected = {chipselected === chipImages[4]}
          ></Chip>
        </Box>
        <Box 
          onClick = {() => {selectChip(chipImages[1]); playFeature()}}
          className = {roundStarted? "chipgoaway":"chipcomeback"}
        >
          <Chip 
            chipvalue = {chipImages[1].val} 
            urlsrc = {chipImages[1].src}
            color = {shades.neutral[100]}
            isSelected = {chipselected === chipImages[1]}
          ></Chip>
        </Box>
        <Box 
          onClick = {() => {selectChip(chipImages[0]); playFeature()}}
          className = {roundStarted? "chipgoaway":"chipcomeback"}
        >
          <Chip 
            chipvalue = {chipImages[0].val} 
            urlsrc = {chipImages[0].src}
            color = {shades.neutral[100]}
            isSelected = {chipselected === chipImages[0]}
          ></Chip>
        </Box>
        <Box 
          onClick = {() => {selectChip(chipImages[2]); playFeature()}}
          className = {roundStarted? "chipgoaway":"chipcomeback"}
        >
          <Chip 
            chipvalue = {chipImages[2].val} 
            urlsrc = {chipImages[2].src}
            color = {shades.primary[300]}
            isSelected = {chipselected === chipImages[2]}
          ></Chip>
        </Box>
        <Box 
          onClick = {() => {selectChip(chipImages[5]); playFeature()}}
          className = {roundStarted? "chipgoaway":"chipcomeback"}
        >
          <Chip 
            chipvalue = {chipImages[5].val} 
            urlsrc = {chipImages[5].src}
            color = {shades.primary[300]}
            isSelected = {chipselected === chipImages[5]}
          ></Chip>
        </Box>
        <Box 
          onClick = {() => {selectChip(chipImages[6]); playFeature()}}
          className = {roundStarted? "chipgoaway":"chipcomeback"}
        >
          <Chip 
            chipvalue = {chipImages[6].val} 
            urlsrc = {chipImages[6].src}
            color = {shades.primary[300]}
            isSelected = {chipselected === chipImages[6]}
          ></Chip>
        </Box>
        <Box 
          onClick = {() => {selectChip(chipImages[7]); playFeature()}}
          className = {roundStarted? "chipgoaway":"chipcomeback"}
        >
          <Chip 
            chipvalue = {chipImages[7].val} 
            urlsrc = {chipImages[7].src}
            color = {shades.primary[300]}
            isSelected = {chipselected === chipImages[7]}
          ></Chip>
        </Box>
        <Box 
          onClick = {() => {selectChip(chipImages[8]); playFeature()}}
          className = {roundStarted? "chipgoaway":"chipcomeback"}
        >
          <Chip 
            chipvalue = {chipImages[8].val} 
            urlsrc = {chipImages[8].src}
            color = {shades.primary[300]}
            isSelected = {chipselected === chipImages[8]}
          ></Chip>
        </Box>
      </Box>
      <Box display="flex" justifyContent="center" height = "40px" marginTop = "30px">
      </Box>
      <Box width = "90%" display = "flex" justifyContent = "space-between" margin = "auto" alignContent="center">
        <Box width = "50%" margin = "auto" className = {roundStarted ? "chipgoaway":"chipcomeback"}>
          <button onClick = {clearBets} style = {{fontWeight: "normal", border: "1px solid whitesmoke"}}>
            <h5 style = {{margin: "0px 0px"}}>Clear</h5>
          </button>
        </Box>
        <Box width = "50%" margin = "auto" className = {roundStarted ? "chipgoaway":"chipcomeback"}>
          <button onClick = {dealCards} style = {{padding: "16px 16px"}}>
            <h5 style = {{margin: "0px 0px"}}>DEAL</h5>
          </button>
        </Box>

        <Box width = "50%" margin = "auto" className = {roundStarted ? "chipgoaway":"chipcomeback"}>
          <button onClick = {undoBets} style = {{fontWeight: "normal", border: "1px solid whitesmoke"}}>
            <h5 style = {{margin: "0px 0px"}}>Undo</h5>
          </button>
        </Box>
        <Box width = "50%" margin = "auto" className = {roundStarted ? "chipgoaway":"chipcomeback"}>
          <button onClick={() => navigate('/user')} style = {{fontWeight: "normal", border: "1px solid whitesmoke"}}>
            <h5 style = {{margin: "0px 0px"}}>Back to Profile</h5>
          </button>
        </Box>
        
      </Box>
      <Box display = "flex" margin = "10px 20px" width = "90%" justifyContent = "space-between">
        <CountingGrids
          params = {gridparams} 
        ></CountingGrids>
      </Box>
      
    </div>
    </Box>
    
  );
}

export default Baccarat;

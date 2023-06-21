import Marquee from 'react-double-marquee';
import React, { useState } from 'react';
import './DoubleMarquee.css';

export default function DoubleMarquee() {

    const [winners, setWinners] = useState();

    setInterval(() => {
      const getWinners = async () => {
        const response = await fetch('/api/data/getwinners');
        const winnerData = await response.json();
        setWinners(winnerData.result[0]);
      };
      getWinners();
    }, 600000);

function formatWinners(){
    let string = '';
    if(winners){
        const lastFiveWinners = winners.slice(winners.length - 5);
        lastFiveWinners.forEach(winner => {
            if (winner.amount >= 100) string += `$ Winner: ${winner.nickname}. Winning amount: ${winner.amount} EvoX. Game: ${winner.game}. $`;
        });
        return string;
    } else return;
};

return (
    <div className='marquee'>
      <Marquee direction="left">
        {formatWinners()}
      </Marquee>
    </div>
  );
}
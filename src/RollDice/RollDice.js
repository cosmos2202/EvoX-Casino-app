import {  useState } from "react";
import Chips from "./Chips";
import "./roll.css";
import Rules from "../res/Rules/Rules";
import { crapsRules } from "../res/Rules/crapsRules";
import { useNavigate } from "react-router-dom";

const RollDice = () => {
  const navigate = useNavigate();
  const [chip, setChip] = useState(1);
  const [chipLocation, setChipLocation] = useState();
  const [dieOne, setDieOne] = useState();
  const [dieTwo, setDieTwo] = useState();
  const [balance, setBalance] = useState(100);
  const crapsBtns = new Array(6).fill("craps-btn");

  const chipHandler = (chipValue) => {
    setChip(chipValue);
  };

  const handleChipClick = (location) => {
    if (!chipLocation) {
      setBalance((prev) => prev - chip);
    }
    setChipLocation(location);
  };

  const handleChipLocation = (currentLocation, chipClass) => {
    return (
      <>
        {chip && chipLocation === currentLocation ? (
          <img
            className={chipClass}
            src={require(`./img/Chip${chip}.png`)}
            alt="ChipLocation"
          />
        ) : null}
      </>
    );
  };

  const rollDice = () => {
      if (!chipLocation) return;
      let dieOneNum = Math.floor(Math.random() * 6) + 1;
      let dieTwoNum = Math.floor(Math.random() * 6) + 1;
      let dieTotal = dieOneNum + dieTwoNum;
      setDieOne(dieOneNum);
      setDieTwo(dieTwoNum);
  
      const hardwaysArr = ["twos", "threes", "fours", "fives"];
      const oneRollArr = ["anyCraps", 7, 3, 11, 2, 12];
  
      if (chipLocation.toString().includes("craps-btn")) {
        rowLogic(dieTotal);
      } else if (chipLocation === "craps-field") {
        fieldLogic(dieTotal);
      } else if (hardwaysArr.includes(chipLocation)) {
        hardwaysLogic(dieOneNum, dieTotal);
      } else if (oneRollArr.includes(chipLocation)) {
        oneRollLogic(dieTotal);
      }
    };

  const rowLogic = (dieTotal) => {
    const potentialWins = [4, 5, 6, 8, 9, 10];
    if (dieTotal !== 7) {
      potentialWins.forEach((value, i) => {
        if (chipLocation === `craps-btn${i}` && dieTotal === value) {
          if (i === 0 || i === 5)
            setBalance((prev) => Math.floor(prev + chip + chip * 1.8));
          if (i === 1 || i === 4)
            setBalance((prev) => Math.floor(prev + chip + chip * 1.4));
          if (i === 2 || i === 3)
            setBalance((prev) => Math.floor(prev + chip + chip * 1.1666));

          setChipLocation();
        }
      });
    } else {
      setChipLocation();
    }
  };

  const fieldLogic = (dieTotal) => {
    const potentialWins = [2, 3, 4, 9, 10, 11, 12];
    const potentialLosses = [1, 5, 6, 7, 8];
    potentialLosses.forEach((value, i) => {
      if (dieTotal === value) {
        setChipLocation();
      }
    });
    potentialWins.forEach((value, i) => {
      if (dieTotal === value && value === 12) {
        setBalance((prev) => prev + chip + chip * 3);
        setChipLocation();
      }
      if (dieTotal === value && value === 2) {
        setBalance((prev) => prev + chip + chip * 2);
        setChipLocation();
      }
      if (dieTotal === value && value !== 12 && value !== 2) {
        setBalance((prev) => prev + chip + chip);
        setChipLocation();
      }
    });
  };

  const hardwaysLogic = (dieOne, dieTotal) => {
    const potentialLocations = ["twos", "fives", "threes", "fours"];
    const potentialWins = [4, 10, 6, 8];

    potentialLocations.forEach((location, i) => {
      if (
        location === chipLocation &&
        potentialWins[i] === dieTotal &&
        potentialWins[i] / 2 === dieOne
      ) {
        if (i === 0 || i === 1) {
          setBalance((prev) => prev + chip + chip * 7);
          setChipLocation();
        } else {
          setBalance((prev) => prev + chip + chip * 9);
          setChipLocation();
        }
      } else if (
        (location === chipLocation &&
          potentialWins[i] === dieTotal &&
          potentialWins[i] / 2 !== dieOne) ||
        dieTotal === 7
      ) {
        setChipLocation();
      }
    });
  };

  const oneRollLogic = (dieTotal) => {
    console.log(chipLocation, dieTotal);
    if (chipLocation === 7 && dieTotal === 7) {
      setBalance((prev) => prev + chip + chip * 4);
    }
    if (
      chipLocation === "anyCraps" &&
      (dieTotal === 2 || dieTotal === 3 || dieTotal === 12)
    ) {
      setBalance((prev) => prev + chip + chip * 7);
    }
    if (
      (chipLocation === 3 && dieTotal === 3) ||
      (chipLocation === 11 && dieTotal === 11)
    ) {
      setBalance((prev) => prev + chip + chip * 15);
    }
    if (
      (chipLocation === 2 && dieTotal === 2) ||
      (chipLocation === 12 && dieTotal === 12)
    ) {
      setBalance((prev) => prev + chip + chip * 30);
    }
    setChipLocation();
  };

  return (
    <>
    <div className="dice">
      <div className="main">
        <div className="crapsBoard">
          {/* Top Section */}
          <div className="row_dice">
            {crapsBtns.map((btn, index) => {
              return (
                <div
                  key={`${btn}_${index}`}
                  onClick={() => handleChipClick(`${btn}${index}`)}
                  className={`${btn} craps-center`}
                >
                  {handleChipLocation(`${btn}${index}`, "craps-middle-chip")}
                </div>
              );
            })}
            <div style={{ marginLeft: 32 }}>
              <div style={{ marginTop: 43 }} className="row_dice">
                <div
                  onClick={() => handleChipClick("twos")}
                  className="hardways-btn craps-center"
                >
                  {handleChipLocation("twos", "craps-chip")}
                </div>
                <div
                  onClick={() => handleChipClick("fives")}
                  className="hardways-btn craps-center"
                >
                  {handleChipLocation("fives", "craps-chip")}
                </div>
              </div>
              <div className="row_dice">
                <div
                  onClick={() => handleChipClick("threes")}
                  className="hardways-btn craps-center"
                >
                  {handleChipLocation("threes", "craps-chip")}
                </div>
                <div
                  onClick={() => handleChipClick("fours")}
                  className="hardways-btn craps-center"
                >
                  {handleChipLocation("fours", "craps-chip")}
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Section */}
          <div className="row_dice">
            <div>
              <div className="craps-dice row-center">
                {dieOne && dieTwo ? (
                  <>
                    <img
                      className="craps-die die-one"
                      src={require(`./img/Dice${dieOne}.png`)}
                      alt="dieOne"
                    />
                    <img
                      className="craps-die die-two"
                      src={require(`./img/Dice${dieTwo}.png`)}
                      alt="dieTwo"
                    />
                  </>
                ) : null}
              </div>
              <div
                onClick={() => handleChipClick("craps-field")}
                className="field-btn craps-center"
              >
                {handleChipLocation("craps-field", "craps-middle-chip")}
              </div>
            </div>
            <div style={{ marginTop: 52, marginLeft: 31 }}>
              <div
                onClick={() => handleChipClick(7)}
                className="one-long-roll-btn craps-center"
              >
                {handleChipLocation(7, "craps-chip")}
              </div>
              <div className="row_dice">
                <div
                  onClick={() => handleChipClick(3)}
                  className="one-roll-btn craps-center"
                >
                  {handleChipLocation(3, "craps-chip")}
                </div>
                <div
                  onClick={() => handleChipClick(11)}
                  className="one-roll-btn craps-center"
                >
                  {handleChipLocation(11, "craps-chip")}
                </div>
              </div>
              <div className="row_dice">
                <div
                  onClick={() => handleChipClick(2)}
                  className="one-roll-btn craps-center"
                >
                  {handleChipLocation(2, "craps-chip")}
                </div>
                <div
                  onClick={() => handleChipClick(12)}
                  className="one-roll-btn craps-center"
                >
                  {handleChipLocation(12, "craps-chip")}
                </div>
              </div>
              <div
                onClick={() => handleChipClick("anyCraps")}
                className="one-long-roll-btn craps-center"
              >
                {handleChipLocation("anyCraps", "craps-chip")}
              </div>
            </div>
          </div>
          <Chips setChipSelected={chipHandler} />
          <div
            style={{ textAlign: "right", marginTop: -100 }}
            className="white-text"
          >
            <h2>Balance</h2>
            <h2>{balance.toFixed(2)} EvoX</h2>
          </div>
          <br />
          <div className="row-space-between">
            <button className="profile-btn" onClick={rollDice}>ROLL</button>
              <button className="profile-btn">
                <Rules
                  modalTitle={"Craps Instructions"}
                  modalBody={crapsRules}
                />
              </button>
            <button className="profile-btn" onClick={() => navigate('/user')}>BACK</button>    
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default RollDice;

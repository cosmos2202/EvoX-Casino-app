import { useState } from "react";

const Chips = ({ setChipSelected }) => {
  const allChips = [0.1, 0.2, 0.5, 1, 5, 10, 20, 50, 100];
  const [chips, setChips] = useState(() => {
    let chipArray = new Array(9).fill("");
    chipArray[0] = "X";
    return chipArray;
  });

  const handleClick = (index) => {
    let chipArray = new Array(9).fill("");
    chipArray[index] = "X";
    setChips(chipArray);
  };

  return (
    <>
      <div className="row-center">
        {allChips.map((chip, index) => {
          return (
            <img
              key={`Chip_${chip}_${index}`}
              className={`chip_dice ${chips[index] === "X" ? "chip-selected" : ""}`}
              onClick={() => {
                setChipSelected(chip);
                handleClick(index);
              }}
              src={require(`./img/Chip${chip}.png`)}
              alt={`Chip_${chip}`}
            />
          );
        })}
      </div>
    </>
  );
};

export default Chips;

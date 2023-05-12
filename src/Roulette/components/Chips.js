import { useContext, memo } from "react";
import { MyContext } from "./Context";

const Chips = () => {

    const {selectChip,chip,bConState} = useContext(MyContext)

    const chips = [
        {id: "1", number: 1, color: "#204b99"},
        {id: "2", number: 5, color: "#ab1853"},
        {id: "3", number: 20, color: "#18ab79"},
        {id: "4", number: 50, color: "#cea92a"},
        {id: "5", number: 100, color: "#6e43af"}
    ]

    const littleChips = [
        {id: "01", number: 0.1, color: "#204b60"},
        {id: "02", number: 0.2, color: "#204b70"},
        {id: "05", number: 0.5, color: "#204b80"}
    ]

    return(
        <div>
            <div className={!bConState ? "chips-container-little" : "chips-container-little disabled-container"}>
                {
                    littleChips.map(elm=>{
                        return(
                            <div key={elm.id} className={`chip-${elm.id} ${chip === elm.number ? "activeChip" : null}`} onClick={()=>selectChip(elm.number)}>{elm.number}</div>
                        )
                    })
                }
            </div>
            <div className={!bConState ? "chips-container" : "chips-container disabled-container"}>
                {
                    chips.map(elm=>{
                        return(
                            <div key={elm.id} className={`chip-${elm.number} ${chip === elm.number ? "activeChip" : null}`} onClick={()=>selectChip(elm.number)}>{elm.number}</div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default memo(Chips);
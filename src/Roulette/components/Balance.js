import { useContext, memo } from "react";
import { MyContext } from "./Context";

const Balance = () => {

    const {balance} = useContext(MyContext)

    return(
        <div className="balance">
            <div className="icon-balance"><i className="fa-sharp fa-solid fa-coins"></i> <span>{((balance * 100) / 100).toFixed(2)} EvoX</span></div>
        </div>
    )
}
export default memo(Balance);
import { useContext, memo, useState, useEffect } from "react";
import { MyContext } from "./Context";
import ProfileBtn from "./ProfileBtn";

const Balance = () => {

    const {balance} = useContext(MyContext)
    const [userToken, setUserToken] = useState()

    useEffect(() => {
        const getUser = async () => {
          const response = await fetch('/api/data/getuser');
          const userData = await response.json();

          setUserToken(userData.result.token)
        };
        getUser();
     })

    return(
        <div className="balance">

                {userToken && <div className="icon-balance"><i className="fa-sharp fa-solid fa-coins"></i> <span>{balance} EvoX</span></div>}

            <div>{<ProfileBtn/>}</div>
        </div>
    )
}
export default memo(Balance);
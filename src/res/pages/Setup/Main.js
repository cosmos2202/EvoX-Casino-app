import "./style.css";
import { useNavigate } from "react-router-dom";
import feature from "../../../Black/Sound/feature.mp3"

function Main() {

    const navigate = useNavigate()

    function playFeature() {
        const featureMusic = new Audio(feature)
        featureMusic.volume = 0.5;
        featureMusic.play()
      }

    return (
        <>
            <div className="ui__form__header  setup-page__header__login">
                <h3>EvoX Casino</h3>
                <p>You need to be registered for access.</p>
                <div>
                    <button className="ui__submit-btn" onClick={()=>{navigate("/auth"); playFeature()}}>Log In</button>
                    <button className="ui__submit-btn" onClick={()=>{navigate("/registration"); playFeature()}}>Register</button>
                </div>
            </div>
                
        </>
    );
}

export default Main;
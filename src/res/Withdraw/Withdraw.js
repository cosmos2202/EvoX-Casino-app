import "./withdraw.css";
import Input from "../Input/Input";
import Form from "../Form/Form";
import Alert from "../Alert/Alert";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import feature from "../../Black/Sound/feature.mp3"

function Withdraw() {

    const navigate = useNavigate();
    const [addressWithdraw, setAddressWithdraw] = useState('');
    const [amountWithdraw, setAmountWithdraw] = useState('');
    const [errorValue, setError] = useState(undefined);
    const [balance, setUserBalance] = useState();

    useEffect(() => {
        const getUser = async () => {
          const response = await fetch('/api/data/getuser');
          const userData = await response.json();
          setUserBalance(userData.result.balance);
        };
        getUser();
     }, [])

    const playFeature = () => {
        const featureMusic = new Audio(feature)
        featureMusic.volume = 0.5;
        featureMusic.play()
      };

    const showError = (data) => {
        setError(data);
        setTimeout(() => {
          setError(undefined);
        }, 10000);
      };

    function copyToClipboard(text) {
        let textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("Copy");
        document.body.removeChild(textArea);
      }

    const withdraw = async () => {
                if (!addressWithdraw || !amountWithdraw) {
                    showError("All fields must be filled");
                    return;
                } 
                if (balance < amountWithdraw) {
                    showError('Insufficient funds');
                    return;
                }
                await fetch('/api/data/withdraw', {
                    method: "POST",
                    body: JSON.stringify({
                        address: addressWithdraw,
                        amount: amountWithdraw
                    }),
                    headers: {
                        "Content-type": "application/json"
                    }
                }).then(res => res.json())
                .then(json => {
                    copyToClipboard(json.data);
                    showError('Successfully!' + '\n' + 'tx: ' + json.data + '\n' + 'The transaction number has been copied to the clipboard.');
                    setTimeout(() => {
                        navigate('/user');
                    }, 10000);
                });
            };
    
    
    return (
        <>
        <Form>
            <div className="ui__form__header  setup-page__header__login">
                <h3>Withdraw</h3>
                <p>Enter the address and amount</p>
            </div>
            <p>Address</p>
            <Input 
              setValue={setAddressWithdraw} 
              value={addressWithdraw} 
              onChange={e => setAddressWithdraw(e.target.value)} 
            />
            <p>Amount</p>
            <Input 
              setValue={setAmountWithdraw} 
              value={amountWithdraw} 
              type={'number'}
              onChange={e => setAmountWithdraw(e.target.value)} 
            />
            <div>
                <button className="withdraw_ui__submit-btn" onClick={()=>{navigate("/user"); playFeature()}}>Back</button>
                <button className="withdraw_ui__submit-btn" onClick={()=>{withdraw(); playFeature()}}>Send</button>
            </div>
        </Form>
        <Alert
            value={errorValue}
        />
    </>
    );

}

export default Withdraw;
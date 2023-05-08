import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import Cookies from 'js-cookie';
import Alert from "../../Alert/Alert";
import Form from "../../Form/Form";
import Input from "../../Input/Input";
import feature from "../../../Black/Sound/feature.mp3"

function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [errorValue, setError] = useState(undefined);

  const showError = (data) => {
    setError(data);
    setTimeout(() => {
      setError(undefined);
    }, 3000);
  };

  function playFeature() {
    const featureMusic = new Audio(feature)
    featureMusic.volume = 0.5;
    featureMusic.play()
  }

  const auth = async () => {
    playFeature()
    if (!name || !password) {
      showError("All fields must be filled");
    } else {
        const token = await fetch('/api/auth/login', {
            method: "POST",
            body: JSON.stringify({
                nickname: name,
                password: password
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then(json => json.token);
        if (!token) {
            showError('Wrong credentials');
        } else {
            Cookies.set('token', token, { expires: 7000 });
            navigate('/user');
        }
    }

  };

  return (
    <>
        <Form>
            <div className="ui__form__header  setup-page__header__login">
                <h3>Log In</h3>
                <p>Continue with your created account</p>
                <p>The case of the letters matters!</p>
            </div>
            <p>Username</p>
            <Input setValue={setName} value={name}/>
            <p>Password</p>
            <Input setValue={setPassword} value={password} type={'password'}/>
            <button className="ui__submit-btn" onMouseUp={auth}>Log In</button>
        </Form>
        <Alert
            value={errorValue}
        />
    </>
);
}

export default Login;
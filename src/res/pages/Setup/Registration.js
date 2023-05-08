import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import "./style.css";
import Alert from "../../Alert/Alert";
import Form from "../../Form/Form";
import Input from "../../Input/Input";
import feature from "../../../Black/Sound/feature.mp3"

function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [errorValue, setError] = useState(undefined);

  const showError = data => {
    setError(data);
    setTimeout(() => {
      setError(undefined);
    }, 3000);
  }

  function playFeature() {
    const featureMusic = new Audio(feature)
    featureMusic.volume = 0.5;
    featureMusic.play()
  }

  async function auth() {
    playFeature()
    if (!name || !password || !repeatedPassword) {showError("All fields must be filled"); return;}
    if (password !== repeatedPassword) {showError("Passwords don't match"); return;}
    const token = await fetch('/api/auth/register', {
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
    .then(json => json.data);
    Cookies.set('token', token, { expires: 7000 });
    navigate('/user');
}



return (
  <>
      <Form>
          <div className="ui__form__header">
              <h3>Access to EvoX Casino</h3>
              <p>To access the Casino, you need to register an account.</p>
              <p>The case of the letters matters!</p>
          </div>
          <p>Username</p>
          <Input setValue={setName} value={name}/>
          <p>Password</p>
          <Input setValue={setPassword} value={password} type={'password'}/>
          <p>Repeat your password</p>
          <Input setValue={setRepeatedPassword} value={repeatedPassword} type={'password'}/>
          <button className="ui__submit-btn" onMouseUp={auth}>Sign Up</button>
      </Form>
      <Alert
          value={errorValue}
      />
  </>
);
}

export default Registration;
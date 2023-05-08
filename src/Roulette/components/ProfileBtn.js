import React, { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import feature from "../sound/feature.mp3";

const Profile_btn = () => {
  const [user, setUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch("/api/data/getuser");
      const userData = await response.json();
      setUser(userData.result.nickname);
    };
    getUser();
  }, []);

  function playFeature() {
    const featureMusic = new Audio(feature)
    featureMusic.volume = 0.5;
    featureMusic.play()
  }

  return (
    <div>
        <button className="user-profile" onClick={() => {navigate("/user"); playFeature()}}>
          {user}
        </button>
    </div>
  );
};
export default memo(Profile_btn);
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import feature from "../sound/feature.mp3";

const Profile_btn = () => {

  const navigate = useNavigate();

  function playFeature() {
    const featureMusic = new Audio(feature)
    featureMusic.volume = 0.5;
    featureMusic.play()
  }

  return (
    <div>
        <button className="profile-btn user-profile" onClick={() => {navigate("/user"); playFeature()}}>back to profile</button>
    </div>
  );
};
export default memo(Profile_btn);
import React from "react";

import RegisterButton from "./RegisterButton";
import { FACEBOOK, GOOGLE, KAKAO } from "./RegisterButton/constant";

const RegisterPresenter = () => {
  const Logo = () => {
    return (
      <div className="logo-container">
        <img className="logo-image" src={`/img/logo_long_512.png`} alt="logo" />
        <span>CAN BEER CAN !</span>
      </div>
    );
  };

  return (
    <div className="login-container">
      <Logo />
      <RegisterButton name={GOOGLE} />
      <RegisterButton name={KAKAO} />
      <RegisterButton name={FACEBOOK} />
    </div>
  );
};

export default RegisterPresenter;

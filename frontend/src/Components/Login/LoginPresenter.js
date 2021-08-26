import React from "react";

import LoginButton from "./LoginButton";
import { FACEBOOK, GOOGLE, KAKAO } from "../Util/Constant";

const LoginPresenter = () => {
  const Logo = () => {
    return (
      <div className="logo-container">
        <img className="logo-image" src={`/img/logo_long_512.png`} alt="logo" />
        <span>CAN BEER CAN !</span>
      </div>
    );
  };

  return (
    <main className="login-container">
      <Logo />
      <article className="login-btn-container">
        <LoginButton name={GOOGLE} />
        <LoginButton name={KAKAO} />
        <LoginButton name={FACEBOOK} />
      </article>
    </main>
  );
};

export default LoginPresenter;

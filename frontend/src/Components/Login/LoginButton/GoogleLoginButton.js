import React, { useCallback } from "react";

import { withRouter } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../Store/Actions/userAction";

const GoogleICON = () => {
  return (
    <div className="g-icon" style={{ height: "18px" }}>
      <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg">
        <g fill="#000" fillRule="evenodd">
          <path
            d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z"
            fill="#EA4335"
          ></path>
          <path
            d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"
            fill="#4285F4"
          ></path>
          <path
            d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z"
            fill="#FBBC05"
          ></path>
          <path
            d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"
            fill="#34A853"
          ></path>
          <path fill="none" d="M0 0h18v18H0z"></path>
        </g>
      </svg>
    </div>
  );
};

/**
 *
 * @param {History} history react-router-dom history
 * @see {@link https://www.npmjs.com/package/react-google-login}
 *
 * @returns GoogleLoginButton
 */
const GoogleLoginButton = ({ history }) => {
  const dispatch = useDispatch();
  const googleLoginSuccess = useCallback(
    async (response) => {
      const profile = response.profileObj;
      const tokenId = response.tokenId;
      const body = {
        user_email: profile.email,
        user_image: profile.imageUrl,
      };

      const res = await dispatch(loginUser(tokenId, body));
      if (res.payload.status === 200) {
        history.push("/main");
      } else {
        alert("로그인에 실패하였습니다.");
      }
    },
    [dispatch, history]
  );

  const googleLoginError = useCallback(() => {
    alert("fail Google Login");
  }, []);

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_API_KEY}
      render={(renderProps) => (
        <button
          className="g-sign2"
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
        >
          <div className="g-container">
            <GoogleICON />
            <div className="g-text">GOOGLE로 로그인</div>
          </div>
        </button>
      )}
      onSuccess={googleLoginSuccess}
      onFailure={googleLoginError}
      buttonText="GOOGLE계정으로 로그인"
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default withRouter(GoogleLoginButton);

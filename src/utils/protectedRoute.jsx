import jwt_decode from "jwt-decode";
import React from "react";
import { baseURL } from "./config";
import { Navigate } from "react-router-dom";

const isTokenValid = (token) => {
  const decodetoken = jwt_decode(token);
  const exp = decodetoken.exp;

  if (Date.now() >= exp * 1000) {
    return false;
  }
  return true;
};

const ProtectedRoute = ({ children }) => {
  const [hasAuth, setHasAuth] = React.useState(false);
  const access = localStorage.getItem(`accessToken`) || ``;
  const refresh = localStorage.getItem(`refreshToken`) || ``;

  if (access === `` && refresh === ``) {
    // console.log(`I don't have access and refresh token`);
    return <Navigate to="/" replace />;
  }

  // check if access token is valid
  if (isTokenValid(access)) {
    // console.log(`I have access token active`);
    return children;
  }

  // check if refresh token is valid
  if (isTokenValid(refresh)) {
    // console.log(`I have refresh token active`);
    const requestOptions = {
      method: `POST`,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        refresh,
      }),
    };

    const url = `${baseURL}/refresh`;
    fetch(url, requestOptions)
      .then((res) => res.json())
      .then((result) => {
        if (result?.isSuccess) {
          const { access, refresh } = result.data;
          var decoded = jwt_decode(access);
          localStorage.setItem("refreshToken", refresh);
          localStorage.setItem("accessToken", access);
          localStorage.setItem("userId", decoded?.user_id);
          setHasAuth(true);
        }
      });
  } else {
    // console.log(`I don't have any token`);
    return <Navigate to="/" replace />;
  }

  if (!hasAuth) {
    return null;
  }
  return children;
};

export default ProtectedRoute;

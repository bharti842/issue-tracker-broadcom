import React from "react";
import trackerlogo from "../../assets/Left Nanigation.png";
import "./LoginPage.css";
import { useAuth0 } from "@auth0/auth0-react";

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="login-container">
      <div>
        <img src={trackerlogo} alt="Logo" />
      </div>
      <div>
        <button onClick={() => loginWithRedirect()} className="login-btn">
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default LoginPage;

import React from "react";
import "./App.css";
import LoginPage from "./components/LoginPage/LoginPage";
import Dashboard from "./components/Dashboard/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import CreateProject from "./components/CreateProject/CreateProject";
import ViewInsights from "./components/ViewInsights/ViewInsights";
import CreateIssue from "./components/CreateIssue/CreateIssue";
function App() {
  const auth0Domain = "dev-ael32flsbvs1niz4.us.auth0.com";
  const auth0ClientId = "GldtY6AjUCaBxDc2rV0UbedYcOLf3tbC";
  return (
    <div className="App">
      <Auth0Provider
        domain={auth0Domain}
        clientId={auth0ClientId}
        authorizationParams={{
          redirect_uri: "http://localhost:3000/dashboard",
        }}
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/view-insights" element={<ViewInsights />} />
          <Route path="/create-issue" element={<CreateIssue />} />
        </Routes>
      </Auth0Provider>
    </div>
  );
}

export default App;

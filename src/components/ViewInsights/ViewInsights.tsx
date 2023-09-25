import React from "react";
import Sidenav from "../Sidenav/Sidenav";
import "./ViewInsights.css";

const ViewInsights: React.FC = () => {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="navbar-container">
          <Sidenav />
        </div>
        <div style={{ display: "flex", gap: "10rem" }}>
          <div className="issue-detail-container">
            <div>HU Angular Track</div>
            <div>Total no of issues</div>
          </div>
          <div className="users-container"></div>
        </div>
      </div>
    </>
  );
};

export default ViewInsights;

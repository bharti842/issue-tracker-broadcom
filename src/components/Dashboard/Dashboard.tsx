import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../assets/Icon.png";
import "./Dashboard.css";
import { useAuth0 } from "@auth0/auth0-react";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  return (
    <div className="navbar-container">
      <div>
        <div className="sidebarimg">
          <img src={Icon} alt="Logo" height={40} width={220} />
        </div>
        <nav className="sidenavbar">
          <ul className="sidenavbarul">
            <li>
              <Link to="/project-board" className="btn-active">
                <b>PROJECT BOARD</b>
              </Link>
            </li>
            <li>
              <Link to="/create-issue" className="btn1">
                <b>CREATE ISSUES</b>
              </Link>
            </li>
            <li>
              <Link to="/create-project" className="btn2">
                <b>CREATE PROJECT</b>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import { useNavigate } from "react-router-dom";
import companyLogo from "../../assets/Icon.png";
import { setActiveTab } from "../../features/ActiveTab/activeTabSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import "./Sidenav.css";

interface SideNavProps {}

const SideNav: React.FC<SideNavProps> = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeTab = useSelector((state: RootState) => state.activeTab);

  const handleTabClick = (tab: string, path: string) => {
    dispatch(setActiveTab(tab));
    navigate(path);
  };

  return (
    <div className="sidenav">
      <img
        className="sidenav-company-logo"
        src={companyLogo}
        alt="Company Logo"
      />
      <div
        className={`nav-link ${activeTab === "Project Board" ? "active" : ""}`}
        onClick={() => handleTabClick("Project Board", "/dashboard")}
      >
        PROJECT BOARD
      </div>
      <div
        className={`nav-link ${activeTab === "Create Issue" ? "active" : ""}`}
        onClick={() => handleTabClick("Create Issue", "/create-issue")}
      >
        CREATE ISSUE
      </div>
      <div
        className={`nav-link ${activeTab === "Create Project" ? "active" : ""}`}
        onClick={() => handleTabClick("Create Project", "/create-project")}
      >
        CREATE PROJECT
      </div>
    </div>
  );
};

export default SideNav;

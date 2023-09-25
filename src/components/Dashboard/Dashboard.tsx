import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { useAuth0 } from "@auth0/auth0-react";
import notask from "../../assets/notask.png";
import Sidenav from "../Sidenav/Sidenav";
import { selectProjects } from "../../features/Project/projectSlice";
import { selectIssues } from "../../features/Issue/IssueSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Search from "../Search/Search";
import { setActiveTab } from "../../features/ActiveTab/activeTabSlice";
import ProjectBoard from "./ProjectBoard";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const projectsList = useAppSelector(selectProjects);
  const issuesList = useAppSelector(selectIssues);
  const { isAuthenticated } = useAuth0();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }
  const handleButtonClick = () => {
    dispatch(setActiveTab("Create Project"));
  };

  return (
    <>
      <div className="navbar-container">
        <div className="create-project-container">
          <Sidenav />
        </div>
        <div>
          <div style={{ marginLeft: "4.5%", width: "147vh" }}>
            <Search />
          </div>
          {projectsList.length !== 0 || issuesList.length !== 0 ? (
            <form className="project-form">
              <p className="project-heading">Project Details</p>
              <button
                className="insight-btn"
                onClick={() => navigate("/view-insights")}
              >
                View insights
              </button>
              {projectsList?.map((project) => {
                return (
                  <>
                    <div>
                      <div style={{ display: "flex", gap: "30rem" }}>
                        <div>
                          <label htmlFor="pname">Project Name:</label>
                          <input
                            type="text"
                            id="pname"
                            name="pname"
                            value={project?.projectName}
                          />
                          <br />
                        </div>
                        <div>
                          <label htmlFor="owner">Project Owner:</label>
                          <select>
                            <option value="">{project?.projectOwner}</option>
                          </select>
                          <br />
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: "15px" }}>
                        <p>Start Date: {project?.startDate}</p>
                        <div className="vl"></div>
                        <p>End Date: {project?.endDate}</p>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        gap: "10rem",
                        marginTop: "2rem",
                      }}
                    >
                      <div>
                        <select>
                          <option value="">Select</option>
                        </select>
                        <p>Filter Asignee</p>
                        <br />
                      </div>
                      <div>
                        <select>
                          <option value="">Select</option>
                        </select>
                        <p>Filter Property</p>
                        <br />
                      </div>
                    </div>
                    <ProjectBoard />
                  </>
                );
              })}
            </form>
          ) : (
            <div>
              <h1 className="tracker-heading">Welcome to Tracker</h1>
              <p className="tracker-summary">
                Seems like you have’nt created any project yet.
                <Link to="/create-project" onClick={handleButtonClick}>
                  Click here
                </Link>{" "}
                to onboad a new project.
              </p>
              <img className="noTask" src={notask} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;

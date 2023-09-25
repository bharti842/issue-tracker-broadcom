import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Sidenav from "../Sidenav/Sidenav";
import "./CreateIssue.css";
import axios from "axios";
import { addIssue } from "../../features/Issue/IssueSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";

interface Project {
  projectID: number;
  projectName: string;
}
interface Assignee {
  id: number;
  email: string;
}

const CreateIssue: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //   const issues = useAppSelector(selectIssues);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [projectList, setProjectList] = useState<Project[]>([]);
  const [assigneeList, setAssigneeList] = useState<Assignee[]>([]);

  useEffect(() => {
    axios
      .get<Project[]>(
        "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/project"
      )
      .then((response) => {
        setProjectList(response.data);
      });

    axios
      .get<Assignee[]>(
        "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/user"
      )
      .then((response) => {
        setAssigneeList(response.data);
      });
  }, []);

  const initialValues = {
    summary: "",
    type: 1,
    project: 1,
    description: "",
    priority: "",
    assignee: "",
    tags: [],
    sprint: "",
    storyPoints: 1,
    status: 1,
  };

  const validationSchema = Yup.object({
    summary: Yup.string().required("Summary is required"),
    type: Yup.string().required("Type is required"),
    project: Yup.string().required("Project is required"),
    description: Yup.string().required("Description is required"),
    priority: Yup.string().required("Priority is required"),
    assignee: Yup.string().required("Assignee is required"),
    sprint: Yup.string(),
    storyPoints: Yup.number().min(
      0,
      "Story Points should be a positive number"
    ),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/issue",
          {
            summary: values.summary,
            type: values.type,
            description: values.description,
            projectID: values.project,
            priority: values.priority,
            assignee: values.assignee,
            tags: values.tags,
            sprint: values.sprint,
            storyPoint: values.storyPoints,
            status: "1",
          },
          {
            headers: {
              "Content-Type": "application/json",
              userid: "1",
            },
          }
        );

        if (response.status === 200 || response.status === 201) {
          setTimeout(() => {
            console.log("Form submitted with values:", values);
            setFormSubmitted(true);
          }, 1000);
          navigate("/dashboard");
          dispatch(addIssue(values));
        } else {
          console.error("Error");
        }
      } catch (err) {
        console.log("Error:", err);
      }
    },
  });

  return (
    <div style={{ display: "flex" }}>
      <div className="create-project-container">
        <Sidenav />
      </div>
      <div style={{ marginLeft: "4%", minWidth: "50vh" }}>
        <h2 className="create-issue-title">Create User Stories/ Tasks/ Bugs</h2>
        {formSubmitted && (
          <div className="success-alert">Form submitted successfully!</div>
        )}
        <form onSubmit={formik.handleSubmit}>
          <div className="form-row">
            <label htmlFor="summary" className="label-summary">
              Summary:
            </label>

            <input
              type="text"
              id="summary"
              name="summary"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.summary}
            />

            {formik.touched.summary && formik.errors.summary && (
              <div className="error">{formik.errors.summary}</div>
            )}
          </div>

          <div className="form-row">
            <div className="half-width">
              <label htmlFor="type">Type:</label>

              <select
                id="type"
                name="type"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
              >
                <option value="">Select Type</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>

              {formik.touched.type && formik.errors.type && (
                <div className="error">{formik.errors.type}</div>
              )}
            </div>

            <div className="half-width">
              <label htmlFor="project">Project:</label>

              <select
                id="project"
                name="project"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.project}
              >
                <option value="">Select Project</option>

                {projectList.map((project) => (
                  <option key={project.projectID} value={project.projectID}>
                    {project.projectName}
                  </option>
                ))}
              </select>

              {formik.touched.project && formik.errors.project && (
                <div className="error">{formik.errors.project}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="half-width">
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
            </div>

            <div className="half-width">
              <label htmlFor="priority">Priority:</label>

              <select
                id="priority"
                name="priority"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.priority}
              >
                <option value="">Select Priority</option>
                <option value={1}>High</option>
                <option value={2}>Medium</option>
                <option value={3}>Low</option>
              </select>

              {formik.touched.priority && formik.errors.priority && (
                <div className="error">{formik.errors.priority}</div>
              )}
            </div>

            <div className="half-width">
              <label htmlFor="assignee">Assignee:</label>

              <select
                id="assignee"
                name="assignee"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.assignee}
              >
                <option value="">Select Assignee</option>

                {assigneeList?.map((assignee) => (
                  <option key={assignee.id} value={assignee.id}>
                    {assignee.email}
                  </option>
                ))}
              </select>

              {formik.touched.assignee && formik.errors.assignee && (
                <div className="error">{formik.errors.assignee}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="half-width">
              <label htmlFor="tags">Tags:</label>

              <select
                id="tags"
                name="tags"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tags}
                multiple
              >
                <option value="">Select Tags</option>
                <option value="Angular"> Angular</option>
                <option value="HU">HU</option>
                <option value="React">React</option>
              </select>

              {formik.touched.tags && formik.errors.tags && (
                <div className="error">{formik.errors.tags}</div>
              )}
            </div>

            <div className="half-width">
              <label htmlFor="sprint">Sprint:</label>

              <select
                id="sprint"
                name="sprint"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.sprint}
              >
                <option value="">Select Sprint</option>
                <option value="Sprint1">Sprint1</option>
                <option value="Sprint2">Sprint2</option>
                <option value="Sprint3">Sprint3</option>
                <option value="Sprint4">Sprint4</option>
                <option value="Sprint5">Sprint5</option>
              </select>

              {formik.touched.sprint && formik.errors.sprint && (
                <div className="error">{formik.errors.sprint}</div>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="half-width">
              <label htmlFor="storyPoints">Story Points:</label>
              <input
                type="number"
                id="storyPoints"
                name="storyPoints"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.storyPoints}
              />
              {formik.touched.storyPoints && formik.errors.storyPoints && (
                <div className="error">{formik.errors.storyPoints}</div>
              )}{" "}
            </div>
          </div>

          <div className="form-row">
            <button
              type="reset"
              className="resetBtn"
              onClick={formik.handleReset}
            >
              RESET
            </button>

            <button type="submit" className="createBtn">
              CREATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateIssue;

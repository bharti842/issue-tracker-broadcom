import React, { useEffect, useState } from "react";
import Sidenav from "../Sidenav/Sidenav";
import "./CreateProject.css";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { addProject } from "../../features/Project/projectSlice";
import Search from "../Search/Search";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface Owner {
  id: number;
  email: string;
}

const CreateProject: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [ownerList, setOwnerList] = useState<Owner[]>([]);

  useEffect(() => {
    axios
      .get<Owner[]>(
        "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/user"
      )
      .then((response) => {
        setOwnerList(response.data);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      projectName: "",
      startDate: "",
      endDate: "",
      projectOwner: "",
    },
    validationSchema: Yup.object({
      projectName: Yup.string().required("Project Name is required"),
      startDate: Yup.date().required("Start Date is required"),
      endDate: Yup.date().required("End Date is required"),
      projectOwner: Yup.string().required("Project Owner is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://hu-22-angular-mockapi-urtjok3rza-wl.a.run.app/project",
          {
            projectName: values.projectName,
            projectOwner: values.projectOwner,
            projectStartDate: values.startDate,
            projectEndDate: values.endDate,
          },
          {
            headers: {
              "Content-Type": "application/json",
              userid: "1",
            },
          }
        );
        if (response.status === 200 || response.status === 201) {
          dispatch(addProject(values));
          navigate("/dashboard");
        } else {
          console.error("Error");
        }
      } catch (err) {
        console.log("Error:", err);
      }
    },
  });

  return (
    <>
      <div style={{ display: "flex" }}>
        <div className="create-project-container">
          <Sidenav />
        </div>
        <div style={{ marginLeft: "80px" }}>
          <div style={{ width: "140vh" }}>
            <Search />
          </div>
          <form onSubmit={formik.handleSubmit}>
            <p className="project-heading">Create Project</p>
            <div style={{ display: "flex", gap: "30rem" }}>
              <div>
                <label htmlFor="projectName">Project Name:</label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  value={formik.values.projectName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.projectName && formik.errors.projectName ? (
                  <div className="error">{formik.errors.projectName}</div>
                ) : null}
                <br />
                <label htmlFor="startDate">Project Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.startDate && formik.errors.startDate ? (
                  <div className="error">{formik.errors.startDate}</div>
                ) : null}
                <br />
              </div>
              <div>
                <label htmlFor="projectOwner">Project Owner:</label>

                <select
                  id="projectOwner"
                  name="projectOwner"
                  value={formik.values.projectOwner}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                >
                  <option value="">Select</option>
                  {ownerList?.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.email}
                    </option>
                  ))}
                </select>
                {formik.touched.projectOwner && formik.errors.projectOwner ? (
                  <div className="error">{formik.errors.projectOwner}</div>
                ) : null}
                <br />
                <label htmlFor="endDate">Project End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  required
                />
                {formik.touched.endDate && formik.errors.endDate ? (
                  <div className="error">{formik.errors.endDate}</div>
                ) : null}
                <br />
              </div>
            </div>
            <div>
              <button
                className="resetBtn"
                type="button"
                onClick={formik.handleReset}
              >
                Reset
              </button>
              <button className="createBtn" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProject;

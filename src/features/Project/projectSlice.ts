import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Project {
  projectName: string;
  projectOwner: string;
  startDate: string;
  endDate: string;
}

export interface ProjectState {
  projects: Project[];
}

const initialState: ProjectState = {
  projects: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    addProject: (state, action: PayloadAction<Project>) => {
      state.projects.push(action.payload);
    },
  },
});

export const { addProject } = projectSlice.actions;
export const selectProjects = (state: RootState) => state.project.projects;

export default projectSlice.reducer;

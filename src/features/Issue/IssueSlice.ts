import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface Issue {
  summary: string;
  type: number;
  project: number;
  description: string;
  priority: string;
  assignee: string;
  tags: string[];
  sprint: string;
  storyPoints: number;
  status: number;
}

export interface IssueState {
  issues: Issue[];
}

const initialState: IssueState = {
  issues: [],
};

export const issueSlice = createSlice({
  name: "issue",
  initialState,
  reducers: {
    addIssue: (state, action: PayloadAction<Issue>) => {
      state.issues.push(action.payload);
    },
  },
});

export const { addIssue } = issueSlice.actions;
export const selectIssues = (state: RootState) => state.issue.issues;

export default issueSlice.reducer;

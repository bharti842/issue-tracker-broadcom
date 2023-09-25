import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import ProjectReducer from "../features/Project/projectSlice";
import IssueReducer from "../features/Issue/IssueSlice";
import activeTabReducer from "../features/ActiveTab/activeTabSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    project: ProjectReducer,
    issue: IssueReducer,
    activeTab: activeTabReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

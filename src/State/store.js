import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { authReducer } from "./Authentication/Reducer";
import { thunk } from "redux-thunk";
import { skillsReducer } from "./Skills/Reducer";
import { coursesReducer } from "./Courses/Reducer";
import { employeesReducer } from "./Employees/Reducer";
import { eventsReducer } from "./Events/Reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  skills: skillsReducer,
  courses: coursesReducer,
  employees: employeesReducer,
  events: eventsReducer,
});

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

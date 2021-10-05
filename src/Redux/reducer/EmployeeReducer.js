import produce from "immer";
import { ADD_EMPLOYEES, GET_EMPLOYEES } from "../actions/EmployeeActions/Types";

const initialState = {
  employee: {
    employees: [],
    isLoading: false,
    isError: false,
  },
  addEmployee: {
    isLoading: false,
    isError: false,
  },
  deleteEmployee: {
    isLoading: false,
    isError: false,
  },
};

export const employeeReducer = produce(
  (state = initialState, { payload, type }) => {
    switch (type) {
      case ADD_EMPLOYEES.REQUESTED: {
        state.addEmployee.isLoading = true;
        state.addEmployee.isError = false;
        break;
      }
      case ADD_EMPLOYEES.SUCCEEDED: {
        state.addEmployee.isLoading = false;
        state.addEmployee.isError = false;
        break;
      }
      case ADD_EMPLOYEES.FAILED: {
        state.addEmployee.isLoading = false;
        state.addEmployee.isError = true;
        break;
      }
      case GET_EMPLOYEES.REQUESTED: {
        state.employee.isLoading = true;
        state.employee.isError = false;
        break;
      }
      case GET_EMPLOYEES.SUCCEEDED: {
        state.employee.isLoading = false;
        state.employee.isError = false;
        state.employee.employees = payload;
        break;
      }
      case GET_EMPLOYEES.FAILED: {
        state.employee.isLoading = false;
        state.employee.isError = true;
        break;
      }
      default:
        return state;
    }
    return state;
  }
);

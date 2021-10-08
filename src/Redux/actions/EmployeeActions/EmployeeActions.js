import {
  ADD_EMPLOYEES,
  DELETE_EMPLOYEES,
  EDIT_EMPLOYEES,
  GET_EMPLOYEES,
} from "./Types";
import { client } from "../client";
import { ToastError, ToastSuccess } from "../../../helpers/Toast";

export const getAllEmployees =
  ({ clientId }) =>
  (dispatch) => {
    dispatch({ type: GET_EMPLOYEES.REQUESTED });

    client
      .get(`client/getEmployees/${clientId}`)
      .then(({ data }) => {
        dispatch({
          type: GET_EMPLOYEES.SUCCEEDED,
          payload: data.employees.Items,
        });
      })
      .catch((e) => {
        dispatch({ type: GET_EMPLOYEES.FAILED });
      });
  };

export const addEmployeeAction =
  ({ clientId, firstName, lastName, phone, email, type, active, navigation }) =>
  (dispatch) => {
    dispatch({ type: ADD_EMPLOYEES.REQUESTED });

    client
      .post(
        `client/addEmployee`,
        JSON.stringify({
          clientId,
          firstName,
          lastName,
          phone: `+${phone}`,
          email,
          type,
          active,
        })
      )
      .then(() => {
        dispatch({
          type: ADD_EMPLOYEES.SUCCEEDED,
        });
        dispatch(getAllEmployees({ clientId }));
        navigation.goBack();
        ToastSuccess("Success", "Employee added successfully");
      })
      .catch((e) => {
        ToastError("Some error occoured, please try again later");
        dispatch({ type: ADD_EMPLOYEES.FAILED });
      });
  };

export const deleteEmployee =
  ({ clientId, employeeId, navigation }) =>
  (dispatch) => {
    dispatch({ type: DELETE_EMPLOYEES.REQUESTED });

    client
      .post(`client/deleteEmployee/${clientId}/${employeeId}`)
      .then(() => {
        dispatch({
          type: DELETE_EMPLOYEES.SUCCEEDED,
        });
        dispatch(getAllEmployees({ clientId }));
        ToastSuccess("Success", "Employee deleted successfully!");

        navigation.pop(1);
      })
      .catch((e) => {
        dispatch({ type: DELETE_EMPLOYEES.FAILED });
        ToastError("Some error occoured, please try again later!");
      });
  };

export const editEmployeeAction =
  ({
    employeeId,
    clientId,
    firstName,
    lastName,
    phone,
    email,
    type,
    active,
    navigation,
  }) =>
  (dispatch) => {
    dispatch({ type: EDIT_EMPLOYEES.REQUESTED });

    client
      .post(
        `client/updateEmployee`,
        JSON.stringify({
          clientId,
          firstName,
          lastName,
          phone: `+${phone}`,
          email,
          type,
          active,
          employeeId,
        })
      )
      .then(() => {
        dispatch({
          type: EDIT_EMPLOYEES.SUCCEEDED,
        });
        dispatch(getAllEmployees({ clientId }));
        navigation.goBack();
        ToastSuccess("Success", "Employee edited successfully");
      })
      .catch((e) => {
        ToastError("Some error occoured, please try again later");
        dispatch({ type: EDIT_EMPLOYEES.FAILED });
      });
  };

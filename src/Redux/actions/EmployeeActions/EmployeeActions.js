import {
  ADD_EMPLOYEES,
  DELETE_EMPLOYEES,
  EDIT_EMPLOYEES,
  GET_EMPLOYEES,
} from "./Types";
import { client } from "../client";
import { ToastError, ToastSuccess } from "../../../helpers/Toast";

export const getAllEmployees =
  ({ locationId }) =>
  (dispatch) => {
    dispatch({ type: GET_EMPLOYEES.REQUESTED });

    console.log({ locationId });
    client
      .get(`/employee/getEmployees/${locationId}`)
      .then(({ data }) => {
        dispatch({
          type: GET_EMPLOYEES.SUCCEEDED,
          payload: data.employees,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e.response);
        dispatch({ type: GET_EMPLOYEES.FAILED });
      });
  };

export const addEmployeeAction =
  ({ locationId, firstName, lastName, phone, role, active, navigation }) =>
  (dispatch) => {
    dispatch({ type: ADD_EMPLOYEES.REQUESTED });

    console.log({
      locationId,
      firstName,
      lastName,
      phone,
      role,
      active,
      navigation,
    });
    client
      .post(
        `employee/addEmployee`,
        JSON.stringify({
          locationId,
          firstName,
          lastName,
          phone: `+${phone}`,
          role,
          active,
        })
      )
      .then(() => {
        dispatch({
          type: ADD_EMPLOYEES.SUCCEEDED,
        });
        dispatch(getAllEmployees({ locationId }));
        navigation.goBack();
        ToastSuccess("Success", "Employee added successfully");
      })
      .catch((e) => {
        console.log(e.response);
        ToastError("Some error occoured, please try again later");
        dispatch({ type: ADD_EMPLOYEES.FAILED });
      });
  };

export const deleteEmployee =
  ({ locationId, employeeId, navigation }) =>
  (dispatch) => {
    dispatch({ type: DELETE_EMPLOYEES.REQUESTED });

    client
      .post(`employee/deleteEmployee/${locationId}/${employeeId}`)
      .then(() => {
        dispatch({
          type: DELETE_EMPLOYEES.SUCCEEDED,
        });
        dispatch(getAllEmployees({ locationId }));
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
    locationId,
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
          locationId,
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
        dispatch(getAllEmployees({ locationId }));
        navigation.goBack();
        ToastSuccess("Success", "Employee edited successfully");
      })
      .catch((e) => {
        ToastError("Some error occoured, please try again later");
        dispatch({ type: EDIT_EMPLOYEES.FAILED });
      });
  };

export const getEmployeeRoles = () =>
  new Promise((resolve, reject) => {
    client
      .get(`/client/getRoles`)
      .then(({ data }) => {
        resolve(data?.roles);
      })
      .catch((e) => {
        reject();
      });
  });

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
  ({
    locationId,
    firstName,
    lastName,
    phone,
    role,
    active,
    navigation,
    shift,
  }) =>
  (dispatch) => {
    dispatch({ type: ADD_EMPLOYEES.REQUESTED });

    console.log({
      locationId,
      firstName,
      lastName,
      phone,
      role,
      active,
      shift,
      navigation,
    });
    client
      .post(`employee/addEmployee`, {
        locationId,
        firstName,
        lastName,
        phone: `+${phone}`,
        role,
        active,
        shift,
      })
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
    role,
    active,
    navigation,
    shift,
    pin,
  }) =>
  (dispatch) => {
    dispatch({ type: EDIT_EMPLOYEES.REQUESTED });

    console.log({
      locationId,
      firstName,
      lastName,
      phone,
      role,
      active,
      shift,
      navigation,
      employeeId,
      pin,
    });

    client
      .post(`employee/updateEmployee`, {
        locationId,
        firstName,
        lastName,
        phone: `+${phone}`,
        email,
        role,
        active,
        employeeId,
        shift,
        pin,
      })
      .then(() => {
        dispatch({
          type: EDIT_EMPLOYEES.SUCCEEDED,
        });
        dispatch(getAllEmployees({ locationId }));
        navigation.pop(2);
        ToastSuccess("Success", "Employee edited successfully");
      })
      .catch((e) => {
        console.log(e.response.data);
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

export const getEmployeeTimingsHistory = ({ id }) =>
  new Promise((resolve, reject) => {
    client
      .get(`/employee/getEmployeeTimeHistory/${id}`)
      .then(({ data }) => {
        console.log(data);
        resolve(data?.timeHistory);
      })
      .catch((e) => {
        ToastError(
          e.response.data?.message ||
            "Some error occoured, please try again later"
        );
        reject();
      });
  });

export const getEmployeeTodayTime = ({ id }) =>
  new Promise((resolve, reject) => {
    client
      .get(`employee/getEmployeeTodayTime/${id}`)
      .then(({ data }) => {
        console.log(data);
        resolve(data?.todayTime);
      })
      .catch((e) => {
        ToastError(
          e.response.data?.message ||
            "Some error occoured, please try again later"
        );
        reject();
      });
  });

import { ADD_EMPLOYEES, GET_EMPLOYEES } from "./Types";
import { client } from "../client";
import { ToastError } from "../../../helpers/Toast";

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
      })
      .catch((e) => {
        ToastError("Some error occoured, please try again later");
        dispatch({ type: ADD_EMPLOYEES.FAILED });
      });
  };

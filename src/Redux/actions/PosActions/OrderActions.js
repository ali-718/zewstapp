import { ToastError } from "../../../helpers/Toast";
import { client } from "../client";
import { FETCH_TABLES } from "./Types";

export const addTableAction = ({ locationId, name, location }) =>
  new Promise((resolve, reject) => {
    client
      .post(`/manual-orders/createTable`, {
        locationId,
        name,
        capacity: 4,
        location,
      })
      .then(() => {
        resolve({ locationId });
      })
      .catch((e) => {
        reject();
        ToastError("Some error occoured please try again later!");
      });
  });

export const fetchTablesAction =
  ({ locationId, reload = true }) =>
  (dispatch) => {
    dispatch({ type: FETCH_TABLES.REQUESTED, payload: reload });

    client
      .get(`/manual-orders/getAllTables/${locationId}`)
      .then(({ data }) => {
        dispatch({
          type: FETCH_TABLES.SUCCEEDED,
          payload: {
            insideTables: data?.data?.insideTables ?? [],
            outsideTables: data?.data?.outsideTables ?? [],
          },
        });
      })
      .catch((e) => {
        dispatch({ type: FETCH_TABLES.FAILED });
      });
  };

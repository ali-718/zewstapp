import { ToastError } from "../../../helpers/Toast";
import { client } from "../client";

export const fetchExpiredMeals = ({ locationId }) =>
  new Promise((resolve, reject) => {
    client
      .get(`/waste-prediction/findAll/${locationId}`)
      .then((data) => {
        resolve(data.data?.meals);
      })
      .catch((e) => {
        reject(e.response.data);
        ToastError("Unable to fetch data please try again later");
      });
  });

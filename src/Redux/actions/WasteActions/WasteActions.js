import { ToastError, ToastSuccess } from "../../../helpers/Toast";
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

export const DonateToUbfAction = ({ locationId, mealId }) =>
  new Promise((resolve, reject) => {
    console.log({ locationId, mealId });
    client
      .post(`/waste-prediction/updateMealDiscount`, {
        locationId,
        mealId,
      })
      .then(() => {
        resolve();
        ToastSuccess("Success", "");
      })
      .catch((e) => {
        reject(e.response.data);
        ToastError("Some error occoured, please try again later");
      });
  });

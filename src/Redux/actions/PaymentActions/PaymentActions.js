import {
  ADD_INVENTORY,
  ADD_STRIPE,
  DELETE_INVENTORY,
  FETCH_INVENTORY,
} from "./Types";
import { client } from "../client";
import { ToastError, ToastSuccess } from "../../../helpers/Toast";

export const fetchStripeDetails =
  ({ clientId }) => new Promise((resolve,reject)  => {

    client
      .get(`/client/clientDetails/${clientId}`)
      .then(({data}) => {
        resolve(data?.client?.stripeDetails);
      })
      .catch((e) => {
        reject()
      });
  });

export const fetchBankDetails =
  ({ clientId }) => new Promise((resolve,reject)  => {

    client
      .get(`/client/clientDetails/${clientId}`)
      .then(({data}) => {
        resolve(data?.client?.bankDetails);
      })
      .catch((e) => {
        reject()
      });
  });

export const addStripeDetails =
  ({ clientId, stripeEmail, publishKey, secretKey, navigation }) =>
  (dispatch) => {
    dispatch({ type: ADD_STRIPE.REQUESTED });

    client
      .post("/client/addStripeDetails", {
        clientId,
        stripeEmail,
        publishKey,
        secretKey,
      })
      .then(() => {
        ToastSuccess("Stripe details saved successfully");
        dispatch({ type: ADD_STRIPE.SUCCEEDED });
        navigation.goBack();
      })
      .catch((e) => {
        dispatch({ type: ADD_STRIPE.FAILED });
        ToastError("Some error occoured, please try again later");
      });
  };

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";

export const getResturantDetail = ({ clientId }) =>
  new Promise((resolve, reject) => {
    client
      .get(`/client/clientDetails/${clientId}`)
      .then(({ data }) => {
        resolve(data);
      })
      .catch((e) => {
        reject();
      });
  });

export const saveClientDetails = (
  {
    restaurantName,
    address,
    contact_no,
    email,
    clientId,
    timmings,
    representative,
    logo,
    owner_name,
  },
  isProfile = false
) =>
  new Promise((resolve, reject) => {
    console.log({
      restaurantName,
      address,
      contact_no,
      email,
      clientId,
      timmings,
      representative,
      logo,
      owner_name,
    });

    client
      .post(
        `/client/editClientDetails`,
        isProfile
          ? {
              owner_name,
              contact_no: `+${contact_no.replace("+", "")}`,
              email,
              clientId,
            }
          : {
              restaurantName,
              address,
              contact_no: `+${contact_no.replace("+", "")}`,
              email,
              clientId,
              timmings,
              representative,
              logo: [`data:image/jpeg;base64,${logo ?? "abc"}`],
            }
      )
      .then((data) => {
        getResturantDetail({ clientId }).then((res) => {
          resolve(res);
        });
      })
      .catch((e) => {
        reject();
        console.log(e.response.data);
      });
  });

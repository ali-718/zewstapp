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

export const saveClientDetails = ({
  restaurantName,
  address,
  contact_no,
  email,
  clientId,
  timmings,
  representative,
  logo,
}) =>
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
    });
    client
      .post(`/client/editClientDetails`, {
        restaurantName,
        address,
        contact_no,
        email,
        clientId,
        timmings,
        representative,
        logo: [`data:image/jpeg;base64,${logo ?? "abc"}`],
      })
      .then((data) => {
        getResturantDetail({ clientId }).then((res) => {
          resolve(res);
        });
      })
      .catch((e) => {
        reject();
        console.log(e);
      });
  });

import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastError, ToastSuccess } from "../../../helpers/Toast";
import { client } from "../client";
import { LOGOUT, NOTIFICATION_DATA, REMOVE_NOTIFICATION_DATA } from "./Types";

export const signupAction = ({
  owner_name,
  contact_no,
  email,
  password,
  countryCode,
  country,
}) =>
  new Promise((resolve, reject) => {
    console.log({ owner_name, contact_no, email, password });
    client
      .post("/auth/signup", {
        owner_name,
        contact_no: contact_no,
        email,
        password,
        countryCode,
        country,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => {
        console.log(e.response.data);
        reject(e.response.data);
      });
  });

export const confirmCode = ({ username, code }) =>
  new Promise((resolve, reject) => {
    console.log({ username, code });
    client
      .post("/auth/confirm", {
        username,
        code,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => {
        console.log(e.response.data);
        reject(e.response.data);
      });
  });

export const loginActionOther = ({ pin }) =>
  new Promise((resolve, reject) => {
    client
      .post("/employee/login", {
        pin,
      })
      .then((data) => {
        console.log(data.data.employee);
        resolve(data.data.employee);
      })
      .catch((e) => {
        console.log(e.response.data);
        reject(e.response.data);
      });
  });

export const loginAction = ({ email, password }) =>
  new Promise((resolve, reject) => {
    client
      .post("/auth/signin", {
        email,
        password,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => {
        console.log(e.response.data);
        reject(e.response.data);
      });
  });

export const refreshTokenAction = ({ refreshToken, email }) =>
  new Promise((resolve, reject) => {
    client
      .post("/auth/refreshToken", {
        email,
        refreshToken,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => reject(e.response.data));
  });

export const resetPasswordAction =
  ({ email, navigation }) =>
  (dispatch) => {
    client
      .post("/auth/resetPassword", {
        email,
      })
      .then((data) => {
        ToastSuccess("Code sent!", "Code has been sent to your email");
        navigation.navigate("ResetPasswordVerification", { email });
      })
      .catch((e) => {
        ToastError("Some error occoured, please try again later");
      });
  };

export const resendCode = ({ email }) =>
  new Promise((resolve, reject) => {
    client
      .post("/auth/resendOtp", {
        email,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => reject(e.response.data));
  });

export const connectWithSquare = ({ clientId, squareAccessToken }) =>
  new Promise((resolve, reject) => {
    client
      .post("/client/updateSquareToken", {
        clientId,
        squareAccessToken,
      })
      .then((data) => {
        resolve();
      })
      .catch((e) => {
        reject(e.response.data.message);
        console.log(e.response.data.message);
      });
  });

export const LogoutAction = (navigation) => (dispatch) => {
  dispatch({ type: LOGOUT });
  AsyncStorage.clear();
};

export const confirmResetPasswordCode = ({ email, code, newpass }) =>
  new Promise((resolve, reject) => {
    client
      .post("/auth/newPasswordConfirmation", {
        email,
        code,
        newpass,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => {
        reject(e.response.data);
      });
  });

export const addBankDetailsAction = ({
  clientId,
  bankName,
  bankBranch,
  iban,
  accountTitle,
}) =>
  new Promise((resolve, reject) => {
    console.log({
      clientId,
      bankName,
      bankBranch,
      iban,
      accountTitle,
    });
    client
      .post("/client/addBankDetails", {
        clientId,
        bankName,
        bankBranch,
        iban,
        accountTitle,
      })
      .then(() => {
        resolve();
      })
      .catch((e) => {
        reject();
      });
  });

export const notificationData =
  ({ data }) =>
  (dispatch) => {
    dispatch({ type: NOTIFICATION_DATA, payload: data });
  };

export const removeNotificationData = () => (dispatch) => {
  dispatch({ type: REMOVE_NOTIFICATION_DATA });
};

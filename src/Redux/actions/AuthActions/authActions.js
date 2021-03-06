import { authClient } from "../authClient";
import { client } from "../client";

export const signupAction = ({ owner_name, contact_no, email, password }) =>
  new Promise((resolve, reject) => {
    authClient
      .post("/auth/signup", {
        owner_name,
        contact_no: `+${contact_no}`,
        email,
        password,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => reject(e.response.data));
  });

export const confirmCode = ({ username, code }) =>
  new Promise((resolve, reject) => {
    authClient
      .post("/auth/confirm", {
        username,
        code,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => reject(e.response.data));
  });

export const loginAction = ({ email, password }) =>
  new Promise((resolve, reject) => {
    authClient
      .post("/auth/signin", {
        email,
        password,
      })
      .then((data) => {
        resolve(data.data);
      })
      .catch((e) => reject(e.response.data));
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

export const resendCode = ({ email }) =>
  new Promise((resolve, reject) => {
    authClient
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

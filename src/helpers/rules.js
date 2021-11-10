import validator from "validator";

export const nameValidator = (name) =>
  new Promise((resolve, reject) => {
    if (name.trim().length === 0) {
      return reject({
        success: false,
        error: "Empty field",
      });
    }

    return resolve({ success: true });
  });

export const phoneValidator = (phone) =>
  new Promise((resolve, reject) => {
    if (phone.trim().length === 0) {
      return reject({
        success: false,
        error: "Empty field",
      });
    }

    return resolve({ success: true });
  });

export const emailValidator = (email) =>
  new Promise((resolve, reject) => {
    if (!validator.isEmail(email)) {
      return reject({
        success: false,
        error: "Incorrect email form",
      });
    }

    return resolve({ success: true });
  });

export const passwordValidator = (data) =>
  new Promise((resolve, reject) => {
    if (data.trim().length === 0) {
      return reject({
        success: false,
        error: "Empty field",
      });
    }

    if (
      !validator.isStrongPassword(data, {
        minLength: 9,
        minUppercase: 1,
        pointsPerUnique: 1,
      })
    ) {
      return reject({
        success: false,
        error: "Error",
      });
    }

    return resolve({ success: true });
  });

export const confirmPasswordValidator = (data, pass) =>
  new Promise((resolve, reject) => {
    if (data.trim().length === 0) {
      return reject({
        success: false,
        error: "Empty field",
      });
    }

    if (
      !validator.isStrongPassword(data, {
        minLength: 9,
        minUppercase: 1,
        pointsPerUnique: 1,
      })
    ) {
      return reject({
        success: false,
        error: "Error",
      });
    }

    if (data !== pass) {
      return reject({
        success: false,
        error: "Passwords don’t match",
      });
    }

    return resolve({ success: true });
  });

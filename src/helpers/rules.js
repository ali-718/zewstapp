import validator from "validator";

export const nameValidator = (name) =>
  new Promise((resolve, reject) => {
    if (name.trim().length < 3) {
      return reject({
        success: false,
        error: "name should be greater than 3 characters",
      });
    }

    return resolve({ success: true });
  });

export const phoneValidator = (phone) =>
  new Promise((resolve, reject) => {
    if (phone.trim().length < 12) {
      return reject({
        success: false,
        error: "phone must contain 12 numbers",
      });
    }

    return resolve({ success: true });
  });

export const emailValidator = (email) =>
  new Promise((resolve, reject) => {
    if (!validator.isEmail(email)) {
      return reject({
        success: false,
        error: "Incorrect Format of email",
      });
    }

    return resolve({ success: true });
  });

export const passwordValidator = (data) =>
  new Promise((resolve, reject) => {
    if (
      !validator.isStrongPassword(data, {
        minLength: 16,
        minUppercase: 1,
        minNumbers: 1,
        pointsPerUnique: 1,
      })
    ) {
      return reject([
        {
          success: false,
          error: "Password must contain 16 letters",
        },
        {
          success: false,
          error: "Password must contain 1 uppercase letters",
        },
        {
          success: false,
          error: "Password must contain 1 number",
        },
        {
          success: false,
          error: "Password must contain 1 special character",
        },
      ]);
    }

    return resolve({ success: true });
  });

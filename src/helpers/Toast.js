import Toast from "react-native-toast-message";

export const ToastSuccess = (heading, Message) => {
  Toast.show({
    type: "success",
    text1: heading,
    text2: Message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
};

export const ToastError = (Message) => {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: Message,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 50,
  });
};

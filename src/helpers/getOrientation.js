import * as ScreenOrientation from "expo-screen-orientation";

export const getOrientation = async () =>
  await ScreenOrientation.getOrientationAsync();

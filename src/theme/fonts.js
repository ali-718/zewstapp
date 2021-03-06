import * as Font from "expo-font";

export const fonts = {
  openSan: {
    regular: "openSans_regular",
    regularItalic: "openSans_regular_italic",
    semiBold: "openSans_semiBold",
    semiBoldItalic: "openSans_semiBold_italic",
    bold: "openSans_bold",
    boldItalic: "openSans_bold_italic",
  },
};

// fonts preloading
export const fontsAll = [
  {
    openSans_regular: require("../assets/fonts/OpenSans-Regular.ttf"),
  },
  {
    openSans_regular_italic: require("../assets/fonts/OpenSans-Italic.ttf"),
  },
  {
    openSans_semiBold: require("../assets/fonts/OpenSans-SemiBold.ttf"),
  },
  {
    openSans_semiBold_italic: require("../assets/fonts/OpenSans-SemiBoldItalic.ttf"),
  },
  {
    openSans_bold: require("../assets/fonts/OpenSans-Bold.ttf"),
  },
  {
    openSans_bold_italic: require("../assets/fonts/OpenSans-BoldItalic.ttf"),
  },
  {
    openSans_extraBold: require("../assets/fonts/OpenSans-ExtraBold.ttf"),
  },
];
export const fontAssets = fontsAll.map((x) => Font.loadAsync(x));

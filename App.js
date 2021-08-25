import React, { useState, useEffect } from "react";
import { View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider, extendTheme } from "native-base";
import { fontAssets } from "./src/theme/fonts";
import { Routes } from "./src/routes";
import { primaryShade1 } from "./src/theme/colors";

const theme = extendTheme({
  colors: {
    app: {
      600: primaryShade1,
    },
  },
});

const App = () => {
  // state
  const [didLoad, setDidLoad] = useState(false);

  // handler
  const handleLoadAssets = async () => {
    // assets preloading
    await Promise.all([...fontAssets]);
    setDidLoad(true);
  };

  // lifecycle
  useEffect(() => {
    handleLoadAssets();
    SplashScreen.preventAutoHideAsync();
  }, []);

  useEffect(() => {
    if (!didLoad) return;
    SplashScreen.hideAsync();
  }, [didLoad]);

  // rendering
  if (!didLoad) return <View />;
  return (
    <NativeBaseProvider theme={theme}>
      <Routes />
    </NativeBaseProvider>
  );
};

export default App;

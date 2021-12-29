import React, { useState, useEffect } from "react";
import { Platform, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { NativeBaseProvider, extendTheme } from "native-base";
import { fontAssets } from "./src/theme/fonts";
import { Routes } from "./src/routes";
import {
  availableTableColor,
  buttonRedColor,
  menuYellowProgressColor,
  primaryShade1,
  progressDarkPurple,
  textColor,
} from "./src/theme/colors";
import { Provider } from "react-redux";
import store from "./store";
import Toast from "react-native-toast-message";
import * as eva from "@eva-design/eva";
import { ApplicationProvider, Layout, Text } from "@ui-kitten/components";
import { initStripe } from '@stripe/stripe-react-native';
import { STRIPE_PUBLISH_KEY } from './src/helpers/utlils';

const theme = extendTheme({
  colors: {
    app: {
      600: primaryShade1,
    },
    delivery: {
      600: progressDarkPurple,
    },
    cancelled: {
      600: textColor,
    },
    green: {
      600: availableTableColor,
    },
    yellow: {
      600: menuYellowProgressColor,
    },
    red: {
      600: buttonRedColor,
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
    initStripe({
			publishableKey: STRIPE_PUBLISH_KEY
		});
  }, []);

  useEffect(() => {
    if (!didLoad) return;
    SplashScreen.hideAsync();
  }, [didLoad]);

  // rendering
  if (!didLoad) return <View />;
  return (
    <Provider store={store}>
      <NativeBaseProvider theme={theme}>
        <ApplicationProvider {...eva} theme={eva.light}>
          <Routes />
        </ApplicationProvider>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { RefetchDataError } from "../../../../components/ErrorPage/RefetchDataError";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";
import { LoadingPage } from "../../../../components/LoadingPage/LoadingPage";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { loadStripeTerminal } from "@stripe/terminal-js";
import { client } from "../../../../Redux/actions/client";
import WebView from "react-native-webview";

export const StripeReaders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [readers, setReaders] = useState([]);
  const [StripeTerminal, setStripeTerminal] = useState({});

  const createConnectionToken = async () => {
    return await client.post(
      "/terminal/create-connection-token/ff34a59a-6c1d-4445-9f76-e79d61305a1c"
    );
  };

  const createStripeInstance = async () => {
    const StripeTerminal = await loadStripeTerminal();

    console.log(await createConnectionToken());

    setStripeTerminal(
      StripeTerminal.create({
        onFetchConnectionToken: async () => {
          let secretKey = await createConnectionToken();
          let connectionTokenResult = secretKey.data;
          return connectionTokenResult.secret;
        },
      })
    );
  };

  useEffect(() => {
    createStripeInstance();
  }, []);

  return (
    <MainScreenContainer>
      <HeadingBox heading={"Readers List"} />

      <View
        style={{
          width: "90%",
          alignItems: "center",
          marginBottom: 50,
          backgroundColor: "white",
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        {isLoading ? <LoadingPage /> : <View style={{ width: "100%" }}></View>}
      </View>
    </MainScreenContainer>
  );
};

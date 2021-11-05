import React from "react";
import { View, Text, Platform } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { WebView } from "react-native-webview";
import { HEIGHT } from "../../../../helpers/utlils";
import { HeadingBox } from "../../../../components/HeadingBox/HeadingBox";

const uri = "http://www.orimi.com/pdf-test.pdf";

export const TaxDocument = (props) => {
  const { name } = props.route.params.data;

  return (
    <MainScreenContainer title={name}>
      <HeadingBox heading={"Tax documents"} />
      <View style={{ width: "90%", marginTop: 10, marginBottom: 30, flex: 1 }}>
        <WebView
          style={{ width: "100%", height: HEIGHT - 60 }}
          source={{
            uri:
              Platform.OS === "android"
                ? `https://docs.google.com/viewer?url=${uri}`
                : uri,
          }}
        />
      </View>
    </MainScreenContainer>
  );
};

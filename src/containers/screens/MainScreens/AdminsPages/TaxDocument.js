import React from "react";
import { View, Text } from "react-native";
import { MainScreenContainer } from "../../../MainScreenContainers";
import { WebView } from "react-native-webview";
import { HEIGHT } from "../../../../helpers/utlils";

export const TaxDocument = (props) => {
  const { name } = props.route.params.data;

  return (
    <MainScreenContainer title={name}>
      <View style={{ width: "90%", marginTop: 10, marginBottom: 30, flex: 1 }}>
        <WebView
          style={{ width: "100%", height: HEIGHT - 60 }}
          source={{
            uri: "https://download1.fbr.gov.pk/Docs/20217141672549772IncomeTaxOrdinanceAmendedupto30.06.2021.pdf",
          }}
        />
      </View>
    </MainScreenContainer>
  );
};

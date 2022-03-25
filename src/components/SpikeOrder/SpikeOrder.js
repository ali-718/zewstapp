import React, { useCallback, useEffect, useRef, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { kitchenMenuColor } from "../../theme/colors";
import { Text } from "../Text/Text";
import { captureRef } from "react-native-view-shot";
import { RegularButton } from "../Buttons/RegularButton";
import * as Print from "expo-print";

export const SpikeOrder = ({ data }) => {
  const {
    timestamp = "",
    ticketNo = "",
    price = "",
    stature = "",
    tableInfo = {},
    catalog = [],
    loading = false,
    orderId = "",
    orderType = "",
  } = data;

  const ref = useRef();
  const [isPrint, setIsPrint] = useStateCallback(false);

  function useStateCallback(initialState) {
    const [state, setState] = useState(initialState);
    const cbRef = useRef(null); // init mutable ref container for callbacks

    const setStateCallback = useCallback((state, cb) => {
      cbRef.current = cb; // store current, passed callback in ref
      setState(state);
    }, []); // keep object reference stable, exactly like `useState`

    useEffect(() => {
      // cb.current is `null` on initial render,
      // so we only invoke callback on state *updates*
      if (cbRef.current) {
        cbRef.current(state);
        cbRef.current = null; // reset callback after execution
      }
    }, [state]);

    return [state, setStateCallback];
  }

  const print = () => {
    setIsPrint(
      () => false,
      () => {
        captureRef(ref, { quality: 1, format: "png", result: "base64" }).then(
          (res) => {
            Print.printAsync({
              html: `<img
            src="data:image/jpeg;base64,${res}"
              style="width:100%;height:100%" />`,
            });
          }
        );
      }
    );
  };

  return (
    <TouchableOpacity
      ref={ref}
      style={{
        backgroundColor: kitchenMenuColor,
        borderColor: "#D8D8D8",
        borderWidth: 1,
        marginLeft: 10,
        width: "32%",
        padding: 15,
      }}
      onPress={() => setIsPrint(!isPrint)}
    >
      <Text style={{ color: "black" }}>{timestamp}</Text>
      {/* <Text style={{ color: "black" }}>Served By: Sara</Text> */}

      <Text style={{ color: "black", marginVertical: 20 }}>{orderType}</Text>
      {catalog.map((item) => (
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            marginTop: 0,
          }}
        >
          <Text style={{ color: "black", flex: 1 }}>{item.mealName}</Text>
          <Text style={{ color: "black", marginLeft: 10 }}>
            {item?.mealPrice}
          </Text>
        </View>
      ))}
      <View
        style={{
          width: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "black", flex: 1 }}>
            ........................
          </Text>
          <Text style={{ color: "black" }}>............</Text>
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
          }}
        >
          <Text style={{ color: "black", flex: 1 }}>Cash:</Text>
          <Text style={{ color: "black" }}>-{price}</Text>
        </View>
      </View>

      {isPrint ? (
        <RegularButton
          onPress={print}
          white
          text={"Print"}
          style={{ borderColor: "black", marginTop: 20 }}
          textStyle={{ color: "black" }}
        />
      ) : null}
    </TouchableOpacity>
  );
};

import React, { FC } from "react";
import { Time } from "./Time";
import { View, Text } from "react-native";

type LapProps = {
  lapNumber: number;
  seconds: number;
};

export const Lap: FC<LapProps> = ({ lapNumber, seconds }) => (
  <View
    style={{
      marginTop: 10,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Text style={{ marginRight: 5 }}>Lap {lapNumber}:</Text>
    <Time seconds={seconds} size={"small"} />
  </View>
);

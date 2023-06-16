import React, { FC } from "react";
import { formatMsecsString } from "../../utils/time";
import { View, Text, StyleSheet } from "react-native";

type TimeProps = {
  seconds: number;
  size: "small" | "large";
};

// make align center by stylesheets
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});

export const Time: FC<TimeProps> = ({ seconds, size }) => (
  <View style={styles.container}>
    <Text
      style={{
        fontFamily: "SpaceMono",
        fontSize: size === "small" ? 16 : 32,
        color: "#ffff00",
      }}
    >
      {formatMsecsString(seconds)}
    </Text>
  </View>
);

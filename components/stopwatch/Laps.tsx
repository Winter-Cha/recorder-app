import React, { FC } from "react";
import { Lap } from "./Lap";
import { View } from "react-native";

type LapsProps = {
  laps: number[];
};

export const Laps: FC<LapsProps> = ({ laps }) => (
  <View>
    {laps.map((lapSeconds: number, index: number) => (
      <Lap key={index} lapNumber={index + 1} seconds={lapSeconds} />
    ))}
  </View>
);

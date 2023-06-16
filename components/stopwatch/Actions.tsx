import { View } from "react-native";

export const Actions = ({ children }: any) => (
  <View style={{ display: "flex", justifyContent: "center" }}>{children}</View>
);

/*
({ children }) => (
  <View style={{ display: "flex", justifyContent: "center" }}>{children}</View>
);

*/

import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

WebBrowser.maybeCompleteAuthSession();

type UserInfo = {
  id: string;
  email: string;
  name: string;
  photoUrl: string;
};

//  androidClientId: "836340725274-ok7aouh88d1j9okler8qld4oq2223ujp.apps.googleusercontent.com",
//  iosClientId: "836340725274-mlgo9i8l3jg2ao7l5kpcm5efc2h5vvkd.apps.googleusercontent.com",
//  expoClientId: "836340725274-9gg2ge959h4cpf9d929m3n6b4sn8pru8.apps.googleusercontent.com",

export default function UserInfo() {
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "836340725274-9gg2ge959h4cpf9d929m3n6b4sn8pru8.apps.googleusercontent.com",
    iosClientId:
      "836340725274-mlgo9i8l3jg2ao7l5kpcm5efc2h5vvkd.apps.googleusercontent.com",
    androidClientId:
      "836340725274-ok7aouh88d1j9okler8qld4oq2223ujp.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { access_token } = response.params;
      setToken(access_token);
    }
  }, [response, token]);

  const getUserInfo = async () => {
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      setUserInfo(user);
    } catch (error) {
      // Add your own error handler here
    }
  };

  return (
    <View style={styles.container}>
      {userInfo === null ? (
        <Button
          title="Sign in with Google"
          disabled={!request}
          onPress={() => {
            promptAsync();
          }}
        />
      ) : (
        <Text style={styles.text}>{userInfo.name}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

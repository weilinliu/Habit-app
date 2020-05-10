import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-elements";
import { SafeAreaView } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";
import habitApi from "../api/habit";

const AccountScreen = props => {
  const { signout } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await habitApi.get("/");
      setEmail(response.data.email);
      setUsername(response.data.username);
    };
    fetchUserInfo();
  }, []);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h3 style={styles.headerTitle}>
        Account
      </Text>

      <Card title="USERNAME">
        <Text style={styles.info}>{username}</Text>
      </Card>
      <Card title="EMAIL">
        <Text style={styles.info}>{email}</Text>
      </Card>
      <Button
        title=" Sign Out"
        onPress={signout}
        buttonStyle={{ backgroundColor: "red", margin: 15 }}
      />
    </SafeAreaView>
  );
};

AccountScreen.navigationOptions = () => {
  return {
    tabBarIcon: ({ tintColor }) => (
      <MaterialIcons name="person" size={30} color={tintColor} />
    )
  };
};

const styles = StyleSheet.create({
  headerTitle: {
    fontWeight: "bold",
    marginLeft: 15
  },
  info: {
    fontSize: 18,
    alignSelf: "center"
  }
});

export default AccountScreen;

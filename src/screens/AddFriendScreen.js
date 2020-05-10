import React, { useContext, useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Input, Button, Card, Text } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as FriendContext } from "../context/FriendContext";

const AddFriendScreen = ({ navigation }) => {
  const { addFriend } = useContext(FriendContext);
  const [email, setEmail] = useState("");
  return (
    <SafeAreaView style={styles.screen} forceInset={{ top: "always" }}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="chevron-left" size={35} color="green" />
        <Text h4 style={{ fontWeight: "bold" }}>
          New Friend
        </Text>
      </TouchableOpacity>
      <Card title="ADD NEW FRIEND">
        <Input
          label="Email"
          value={email}
          onChangeText={newValue => setEmail(newValue)}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Send a friend request"
            onPress={() => addFriend(email)}
            buttonStyle={{ backgroundColor: "green" }}
          />
        </View>
      </Card>
    </SafeAreaView>
  );
};

AddFriendScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white"
  },
  headerContainer: {
    flexDirection: "row"
  },
  buttonContainer: {
    margin: 9
  }
});

export default AddFriendScreen;

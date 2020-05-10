import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Input, Button, Text, Card } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as HabitContext } from "../context/HabitContext";

const HabitCreateScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const { state, createHabit } = useContext(HabitContext);

  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="chevron-left" size={35} color="green" />
        <Text h4 style={{ color: "green" }}>
          Habits
        </Text>
      </TouchableOpacity>
      <Card title="NEW HABIT">
        <Input
          label="Title"
          value={title}
          onChangeText={newValue => setTitle(newValue)}
        />
        <View style={{ marginVertical: 9 }}>
          <Input
            label="Motivation Message"
            value={message}
            onChangeText={newValue => setMessage(newValue)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Create"
            onPress={() => createHabit({ title, description: message })}
            buttonStyle={{ backgroundColor: "green" }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Cancel"
            type="outline"
            onPress={() => navigation.goBack()}
            buttonStyle={{ borderColor: "green" }}
            titleStyle={{ color: "green" }}
          />
        </View>
      </Card>
    </SafeAreaView>
  );
};

HabitCreateScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row"
  },
  buttonContainer: {
    marginHorizontal: 9,
    marginVertical: 3
  }
});

export default HabitCreateScreen;

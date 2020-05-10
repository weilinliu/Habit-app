import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from "react-native-elements";

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text h1 style={{ fontWeight: "bold" }}>
        Habit
      </Text>
      <Text h4 style={{ fontWeight: "bold" }}>
        66 Day Challenge
      </Text>
      <Text style={{ fontSize: 18, color: "darkgray" }}>
        To form/break habits
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    height: 150,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Title;

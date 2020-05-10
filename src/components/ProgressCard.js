import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Context as HabitContext } from "../context/HabitContext";

const ProgressCard = ({ navigation }) => {
  const { state } = useContext(HabitContext);
  const _id = navigation.getParam("_id");
  const habit = state.habits.find(item => item._id === _id);
  return (
    <View>
      <Text>{habit.habit}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProgressCard;

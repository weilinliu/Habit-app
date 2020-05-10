import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import { ListItem, Button, Text } from "react-native-elements";
import { MaterialIcons } from "@expo/vector-icons";
import moment from "moment";
import { Context as HabitContext } from "../context/HabitContext";

const TodayScreen = props => {
  const [todos, setTodos] = useState([]);
  const { state, fetchHabits, completeHabit } = useContext(HabitContext);

  useEffect(() => {
    const today = moment().format("L");
    const todos = state.habits
      .filter(item => {
        if (item.lastUpdate !== null) {
          return today.localeCompare(item.lastUpdate) !== 0;
        }
        return true;
      })
      .map(item => item.habitId);
    console.log(state.habits, todos);
    setTodos(todos);
  }, [state]);
  return (
    <SafeAreaView style={styles.screen} forceInset={{ top: "always" }}>
      <NavigationEvents onWillFocus={fetchHabits} />
      <FlatList
        ListHeaderComponent={
          <>
            <Text style={styles.headerSubtitle}>
              {moment().format("dddd")}, {moment().format("ll")}
            </Text>
            <Text h3 style={styles.headerTitle}>
              Today
            </Text>
          </>
        }
        data={todos}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <ListItem
              containerStyle={styles.listitemContainerStyle}
              title={item.title}
              titleStyle={styles.listitemTitleStyle}
              subtitle={item.description}
              rightElement={
                <>
                  <Button
                    type="clear"
                    icon={<MaterialIcons name="done" size={30} color="green" />}
                    onPress={() => {
                      completeHabit(item._id);
                      fetchHabits();
                    }}
                  />
                </>
              }
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

TodayScreen.navigationOptions = () => {
  return {
    tabBarIcon: ({ tintColor }) => (
      <MaterialIcons name="today" size={30} color={tintColor} />
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  headerTitle: {
    fontWeight: "bold",
    marginLeft: 15
  },
  headerSubtitle: {
    color: "gray",
    marginLeft: 15
  },
  listContainerStyle: {
    flex: 1
  },
  listitemContainerStyle: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 13,
    marginHorizontal: 15,
    marginVertical: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2
    },
    elevation: 5,
    shadowRadius: 2,
    shadowOpacity: 0.26
  },
  listitemTitleStyle: {
    fontWeight: "bold"
  }
});

export default TodayScreen;

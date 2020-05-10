import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { Text, ListItem, Button } from "react-native-elements";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import { FloatingAction } from "react-native-floating-action";
import { Context as HabitContext } from "../context/HabitContext";

const HabitListScreen = ({ navigation }) => {
  const { state, fetchHabits, acceptHabit, deleteHabit } = useContext(
    HabitContext
  );
  const [invitations, setInvitations] = useState([]);
  const [habits, setHabits] = useState([]);
  useEffect(() => {
    setInvitations(state.pending);
    setHabits(state.habits);
  }, [state]);
  const invitationsDisplay =
    invitations.length !== 0 ? (
      <>
        {invitations.map(item => {
          return (
            <ListItem
              key={item.habitId._id}
              containerStyle={styles.listitemContainer}
              title={
                <View>
                  <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                      {item.actionUserId.username}
                    </Text>
                    <Text style={{ fontSize: 18 }}> invites you to </Text>
                  </View>
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.habitId.title}
                  </Text>
                </View>
              }
              subtitle={
                <Text style={{ fontSize: 18 }}>{item.habitId.description}</Text>
              }
              rightElement={
                <>
                  <Button
                    type="outline"
                    icon={<MaterialIcons name="clear" size={20} color="red" />}
                    buttonStyle={{ borderColor: "red" }}
                    onPress={() => {
                      deleteHabit(item.habitId._id);
                      fetchHabits();
                    }}
                  />
                  <Button
                    icon={<MaterialIcons name="done" size={20} color="white" />}
                    buttonStyle={{
                      borderColor: "green",
                      backgroundColor: "green",
                      marginLeft: 9
                    }}
                    onPress={() => {
                      acceptHabit(item.habitId._id);
                      fetchHabits();
                    }}
                  />
                </>
              }
            />
          );
        })}
      </>
    ) : null;
  const habitsDisplay =
    habits.length !== 0 ? (
      <>
        <FlatList
          ListHeaderComponent={invitationsDisplay}
          data={habits}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("HabitDetail", {
                    _id: item.habitId._id,
                    title: item.habitId.title
                  })
                }
              >
                <ListItem
                  containerStyle={styles.listitemContainer}
                  title={
                    <View style={styles.listitemTitle}>
                      <Text style={styles.habitTitle}>
                        {item.habitId.title}
                      </Text>
                      <Text>{item.progress}/66 days</Text>
                    </View>
                  }
                  subtitle={
                    <ProgressBar
                      progress={item.progress / 66}
                      color="green"
                      style={styles.progressBar}
                    />
                  }
                  subtitleStyle={styles.progressBar}
                  bottomDivider={true}
                />
              </TouchableOpacity>
            );
          }}
        />
      </>
    ) : null;

  return (
    <SafeAreaView style={styles.screen} forceInset={{ top: "always" }}>
      <NavigationEvents onWillFocus={fetchHabits} />

      <View style={styles.headerContainer}>
        <Text h3 style={styles.headerTitleStyle}>
          Habits
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("HabitCreate")}>
          <MaterialIcons name="add" size={35} color="green" />
        </TouchableOpacity>
      </View>
      {habitsDisplay}
      <FloatingAction
        floatingIcon={<MaterialIcons name="add" size={25} color="white" />}
        onPressMain={() => navigation.navigate("HabitCreate")}
        showBackground={false}
        animated={false}
        color="green"
      />
    </SafeAreaView>
  );
};

HabitListScreen.navigationOptions = () => {
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
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15
  },
  headerTitleStyle: {
    fontWeight: "bold"
  },
  listitemContainer: {
    borderColor: "green",
    borderWidth: 1,
    borderRadius: 13,
    marginHorizontal: 15,
    marginVertical: 5,
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
  listitemTitle: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  habitTitle: {
    fontWeight: "bold",
    fontSize: 18
  },
  progressBar: {
    marginTop: 9,
    height: 12
  }
});

export default HabitListScreen;

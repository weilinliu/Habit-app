import React, { useContext, useState, useEffect } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ListItem, Button, Text } from "react-native-elements";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as FriendContext } from "../context/FriendContext";
import habitApi from "../api/habit";

const InviteScreen = ({ navigation }) => {
  const [nonmembers, setNonmembers] = useState([]);
  const { state, fetchFriends } = useContext(FriendContext);
  const members = navigation.getParam("people").map(item => item.userId._id);
  const habitId = navigation.getParam("habitId");

  useEffect(() => {
    fetchFriends();
  }, []);

  useEffect(() => {
    const friends = state.friendships.map(item =>
      item.userOneId ? item.userOneId : item.userTwoId
    );

    const nonmembers = friends.filter(item => {
      return !members.includes(item._id);
    });
    console.log(members, friends, nonmembers);
    setNonmembers(nonmembers);
  }, [state]);

  const inviteFriend = async friendId => {
    try {
      const response = await habitApi.post(`/habits/${habitId}`, { friendId });
      setNonmembers(nonmembers.filter(item => item._id !== friendId));
    } catch (err) {
      console.log("Error inviting friend");
    }
  };

  return (
    <SafeAreaView style={styles.screen} forceInset={{ top: "always" }}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => navigation.goBack()}
      >
        <MaterialIcons name="chevron-left" size={35} color="green" />
        <Text h4>Invite</Text>
      </TouchableOpacity>
      <FlatList
        data={nonmembers}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          return (
            <ListItem
              title={item.username}
              titleStyle={styles.listitemTItle}
              subtitle={item.email}
              rightElement={
                <Button
                  title="Invite"
                  onPress={() => inviteFriend(item._id)}
                  buttonStyle={{ backgroundColor: "green" }}
                />
              }
              containerStyle={styles.listitemContainer}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

InviteScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white"
  },
  header: {
    flexDirection: "row"
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
  listitemTItle: {
    fontWeight: "bold",
    fontSize: 18
  }
});

export default InviteScreen;

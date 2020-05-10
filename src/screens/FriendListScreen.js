import React, { useState, useContext } from "react";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { ListItem, Text, Button } from "react-native-elements";
import { FloatingAction } from "react-native-floating-action";
import { MaterialIcons } from "@expo/vector-icons";
import { Context as FriendContext } from "../context/FriendContext";

const FriendListScreen = ({ navigation }) => {
  const { state, fetchFriends, acceptFriend, deleteFriend } = useContext(
    FriendContext
  );

  const friendRequests =
    state.pending.length !== 0 ? (
      <>
        {state.pending.map(item => {
          const requester = item.actionUserId;
          return (
            <ListItem
              key={item._id}
              title={
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.listitemTItle}>{requester.username}</Text>
                  <Text
                    style={{ fontSize: 18 }}
                  >{` (${requester.email})`}</Text>
                </View>
              }
              subtitle="wants to be friends with you."
              containerStyle={styles.listitemContainer}
              rightElement={
                <>
                  <Button
                    icon={<MaterialIcons name="clear" size={20} color="red" />}
                    buttonStyle={{ borderColor: "red" }}
                    type="outline"
                    onPress={() => {
                      deleteFriend(item._id);
                      fetchFriends();
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
                      acceptFriend(item._id);
                      fetchFriends();
                    }}
                  />
                </>
              }
            />
          );
        })}
      </>
    ) : null;

  return (
    <SafeAreaView style={styles.screen} forceInset={{ top: "always" }}>
      <View style={styles.headerContainer}>
        <Text h3 style={{ fontWeight: "bold" }}>
          Friends
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddFriend")}>
          <MaterialIcons name="person-add" size={30} color="green" />
        </TouchableOpacity>
      </View>

      <NavigationEvents onWillFocus={fetchFriends} />
      <FlatList
        ListHeaderComponent={friendRequests}
        data={state.friendships}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          const friend = item.userOneId ? item.userOneId : item.userTwoId;
          return (
            <ListItem
              title={friend.username}
              titleStyle={styles.listitemTItle}
              subtitle={friend.email}
              containerStyle={styles.listitemContainer}
            />
          );
        }}
      />
      <FloatingAction
        floatingIcon={
          <MaterialIcons name="group-add" size={25} color="white" />
        }
        onPressMain={() => navigation.navigate("AddFriend")}
        showBackground={false}
        animated={false}
        color="green"
      />
    </SafeAreaView>
  );
};

FriendListScreen.navigationOptions = () => {
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

export default FriendListScreen;

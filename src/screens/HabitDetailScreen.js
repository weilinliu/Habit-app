import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text, ListItem, Overlay, Button } from "react-native-elements";
import { ProgressBar } from "react-native-paper";
import { FloatingAction } from "react-native-floating-action";
import { MaterialIcons } from "@expo/vector-icons";
import habitApi from "../api/habit";
import { Context as HabitContext } from "../context/HabitContext";

const HabitDetailScreen = ({ navigation }) => {
  const { deleteHabit } = useContext(HabitContext);
  const [people, setPeople] = useState([]);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const _id = navigation.getParam("_id");

  useEffect(() => {
    const fetchPeople = async () => {
      const response = await habitApi.get(`/habits/${_id}`);
      setPeople(response.data);
    };
    fetchPeople();
  }, []);

  return (
    <SafeAreaView style={styles.screen} forceInset={{ top: "always" }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <TouchableOpacity
          style={styles.headerNavigation}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="chevron-left" size={35} color="green" />
          <Text h4>{navigation.getParam("title")}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ marginRight: 9 }} onPress={toggleOverlay}>
          <MaterialIcons name="delete-forever" size={30} color="green" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={people.sort((a, b) => b.progress - a.progress)}
        keyExtractor={item => item._id}
        renderItem={({ item, index }) => {
          return (
            <View>
              <ListItem
                leftElement={<Text h4>{index + 1}</Text>}
                title={
                  <View style={styles.listitemHeader}>
                    <Text style={styles.name}>{item.userId.username}</Text>
                    <Text>{item.progress} days</Text>
                  </View>
                }
                subtitle={
                  <ProgressBar
                    progress={item.progress / 66}
                    color="green"
                    style={styles.progressBar}
                  />
                }
                containerStyle={styles.listitemContainer}
              />
            </View>
          );
        }}
      />

      <FloatingAction
        floatingIcon={
          <MaterialIcons name="group-add" size={25} color="white" />
        }
        onPressMain={() =>
          navigation.navigate("Invite", { people, habitId: _id })
        }
        showBackground={false}
        animated={false}
        color="green"
      />

      <Overlay
        isVisible={visible}
        onBackdropPress={toggleOverlay}
        overlayStyle={{
          height: 150,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <View>
          <Text style={{ fontSize: 18 }}>
            Are you sure to delete this habit?
          </Text>
          <Button
            title="Delete"
            buttonStyle={{ margin: 12, backgroundColor: "red" }}
            onPress={() => {
              deleteHabit(_id);
              navigation.goBack();
            }}
          />
        </View>
      </Overlay>
    </SafeAreaView>
  );
};

HabitDetailScreen.navigationOptions = ({ navigation }) => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white"
  },
  headerNavigation: {
    flexDirection: "row"
  },
  listitemContainer: {
    borderWidth: 1,
    borderRadius: 13,
    marginHorizontal: 15,
    marginVertical: 5
  },
  listitemHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  name: {
    fontWeight: "bold",
    fontSize: 18
  },
  progressBar: {
    marginTop: 9,
    height: 12
  }
});

export default HabitDetailScreen;

import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import AccountScreen from "./src/screens/AccountScreen";
import AddFriendScreen from "./src/screens/AddFriendScreen";
import FriendListScreen from "./src/screens/FriendListScreen";
import HabitCreateScreen from "./src/screens/HabitCreateScreen";
import HabitDetailScreen from "./src/screens/HabitDetailScreen";
import HabitListScreen from "./src/screens/HabitListScreen";
import InviteScreen from "./src/screens/InviteScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TodayScreen from "./src/screens/TodayScreen";
import ResolveAthScreen from "./src/screens/ResolveAuthScreen";

import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as HabitProvider } from "./src/context/HabitContext";
import { Provider as FriendProvider } from "./src/context/FriendContext";

import { setNavigator } from "./src/navigationRef";

const switchNavigator = createSwitchNavigator({
  ResolveAth: ResolveAthScreen,
  authFlow: createStackNavigator({
    Signin: SigninScreen,
    Signup: SignupScreen
  }),
  mainFlow: createBottomTabNavigator(
    {
      Today: TodayScreen,
      Hobits: createStackNavigator(
        {
          HabitList: HabitListScreen,
          HabitDetail: HabitDetailScreen,
          Invite: InviteScreen,
          HabitCreate: HabitCreateScreen
        },
        {
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Ionicons name="ios-stats" size={30} color={tintColor} />
            )
          }
        }
      ),
      Friends: createStackNavigator(
        {
          FriendList: FriendListScreen,
          AddFriend: AddFriendScreen
        },
        {
          navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <MaterialIcons name="people" size={30} color={tintColor} />
            )
          }
        }
      ),
      Account: AccountScreen
    },
    {
      tabBarOptions: {
        activeTintColor: "green",
        labelPosition: "below-icon",
        tabStyle: {
          marginTop: 6
        }
      }
    }
  )
});

const App = createAppContainer(switchNavigator);

export default () => {
  return (
    <FriendProvider>
      <HabitProvider>
        <AuthProvider>
          <App
            ref={navigator => {
              setNavigator(navigator);
            }}
          />
        </AuthProvider>
      </HabitProvider>
    </FriendProvider>
  );
};

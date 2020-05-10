import React, { useContext } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Card, Text } from "react-native-elements";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import Title from "../components/Title";
import { Context as AuthContext } from "../context/AuthContext";

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <NavigationEvents onWillFocus={() => clearErrorMessage()} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Title />
          <Card title="SIGN IN">
            <AuthForm
              userNameShown={false}
              headerText="Sign In for Habit"
              errorMessage={state.errorMessage}
              onSubmit={signin}
              submitButtonText="Sign In"
            />
            <NavLink
              text="Don'e have an account? Sign up instead"
              routeName="Signup"
            />
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "palegreen"
  }
});

export default SigninScreen;

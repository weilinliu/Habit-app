import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { Card } from "react-native-elements";
import { NavigationEvents, SafeAreaView } from "react-navigation";
import AuthForm from "../components/AuthForm";
import NavLink from "../components/NavLink";
import Title from "../components/Title";
import { Context as AuthContext } from "../context/AuthContext";

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
      <NavigationEvents onWillFocus={() => clearErrorMessage()} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
          <Title />
          <Card title="SIGN UP">
            <AuthForm
              userNameShown={true}
              headerText="Sign Up for Habit"
              errorMessage={state.errorMessage}
              submitButtonText="Sign Up"
              onSubmit={signup}
            />
            <NavLink
              routeName="Signin"
              text="Already have an account? Sign in instead"
            />
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

SignupScreen.navigationOptions = () => {
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

export default SignupScreen;

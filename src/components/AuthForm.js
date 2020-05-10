import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, Input } from "react-native-elements";

const Spacer = ({ children }) => {
  return <View style={styles.spacer}>{children}</View>;
};

const AuthForm = ({
  userNameShown,
  headerText,
  errorMessage,
  onSubmit,
  submitButtonText
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {userNameShown ? (
        <Spacer>
          <Input
            label="Username"
            value={username}
            onChangeText={newValue => setUsername(newValue)}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </Spacer>
      ) : null}
      <Spacer>
        <Input
          label="Email"
          value={email}
          onChangeText={newValue => setEmail(newValue)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Spacer>
      <Spacer>
        <Input
          label="Password"
          value={password}
          onChangeText={newValue => setPassword(newValue)}
          autoCapitalize="none"
          autoCorrect={false}
        />
      </Spacer>
      <View style={styles.buttonStyle}>
        <Button
          title={submitButtonText}
          onPress={() => onSubmit({ username, email, password })}
          buttonStyle={{ backgroundColor: "mediumseagreen" }}
        />
      </View>
      {errorMessage ? (
        <View style={{ marginHorizontal: 20 }}>
          <Text style={styles.errorMessageStyle}>{errorMessage}</Text>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  errorMessageStyle: {
    fontSize: 16,
    color: "red"
  },
  spacer: {
    marginHorizontal: 10,
    marginVertical: 5
  },
  buttonStyle: {
    marginHorizontal: 20,
    marginVertical: 5
  }
});

export default AuthForm;

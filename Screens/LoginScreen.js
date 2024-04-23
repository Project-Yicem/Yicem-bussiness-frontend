import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { 
  TextInput, 
  Button, 
  Text, 
  Snackbar,
  ActivityIndicator, 
} from 'react-native-paper';
import styles, { theme } from '../Styles/styles';
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { IP_ADDRESS } from "../Functions/GetIP";

const logoImg = require('../assets/logo.png');

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showLoginFailed, setShowLoginFailed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const login = async () => {
    const apiUrl = `http://${IP_ADDRESS}:8080/api/auth/signin`;

    try {
      setIsLoginLoading(true);
      console.log("Logging in with username: ", email);
      console.log("Sending request to ", apiUrl);
      const response = await axios.post(apiUrl, {
        username: email,
        password: password,
      });
      console.log(response);
      const token = response.data.token;
      const userID = response.data.id;
      // Store the token using expo-secure-store
      await SecureStore.setItemAsync("userToken", token);
      await SecureStore.setItemAsync("userID", userID);
      setIsLoginLoading(false);
      navigation.navigate("MainHome");
    } catch (error) {
      setErrorMessage("Login Failed! : ", error );
      setShowLoginFailed(true);
      setIsLoginLoading(false);
    }
  };

  const handleLogin = () => {
    if( !email || !password){
      setErrorMessage("Please fill all the fields!");
      setShowLoginFailed(true);
      return;
    }
    login();
    setIsLoginLoading(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logoImg} style={styles.image} />
      <TextInput
        label="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Enter Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={() => {handleLogin();}} style={styles.button} disabled={isLoginLoading}>
        Login
      </Button>
      <Text style={styles.signupText} >
        Your company not registered into our system?
      </Text>
      <Button mode="contained" onPress={() => navigation.navigate('Register')} style={styles.hollowButton}> 
        Create Registration Request
      </Button>

      {/*Login failed, show a snackbar*/}
      <Snackbar
        visible={showLoginFailed}
        onDismiss={() => setShowLoginFailed(false)}
        onIconPress={() => setShowLoginFailed(false)}
        duration={Snackbar.LENGTH_SHORT}
      >
        {errorMessage}
      </Snackbar>
    </SafeAreaView>
  );
}
  

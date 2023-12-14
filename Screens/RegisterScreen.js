import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import styles, { theme } from '../Styles/styles';

const logoImg = require('../assets/logo.png');

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();


  const handleRegister = () => {
    console.log(`Registration pressed with username: ${username}, email: ${email} and password: ${password}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logoImg} style={styles.image} />
      <TextInput
        label="Bussiness Name"
        value={username}
        onChangeText={(text) => setUsername(text)}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Phone Number"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Bussiness Address"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <Button mode="contained" onPress={() => navigation.navigate('Waiting')}>
        Send Application Request
      </Button>
      <Text style={styles.text} >
        Your request will be evaluated and you will be contacted via phone number and email you provided.
      </Text>
    </SafeAreaView>
  );
}
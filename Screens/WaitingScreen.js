import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import styles, { theme } from '../Styles/styles';

const logoImg = require('../assets/logo.png');

export default function WaitingScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log(`Login pressed with email: ${email} and password: ${password}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logoImg} style={styles.image} />
      <Text style={styles.text} >
        Your request is being prcessed and evaluated. You will be able to access the application as soon is your request is approved.
        
        Thank you for your patience.
      </Text>
      <Button mode="outline" onPress={() => navigation.navigate('Login')} > 
        Log In
      </Button>
    </SafeAreaView>
  );
}
  

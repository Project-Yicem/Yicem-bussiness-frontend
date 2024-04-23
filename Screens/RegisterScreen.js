import React, { useState } from 'react';
import { SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Text, Snackbar } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';
import styles, { theme } from '../Styles/styles';
import RegisterInfoCard from '../Components/RegisterInfoCard';
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { IP_ADDRESS } from "../Functions/GetIP";

const logoImg = require('../assets/logo.png');

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [workingHours, setWorkingHours] = useState('');

  const [isTimePickerVisible, setIstimePickerVisible] = useState(false);

  const hideTimePicker = () => {setIstimePickerVisible(false)}
  const showTimePicker = () => {console.log("pick time")/*setIstimePickerVisible(true)*/}

  const [showFail, setShowFail] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleTimeConfirm = (selectedDate) => {
    const hours = selectedDate.getHours().toString().padStart(2, '0');
    const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    setTime(formattedTime);
    hideDatePicker();
  };
  const register = async () => {
    const apiUrl = `http://${IP_ADDRESS}:8080/api/auth/signup/seller`;

    try {
      setIsLoading(true);
      //console.log("Registering with username: ", username);
      //console.log("Sending request to ", apiUrl);
      
      const response = await 
      axios.post(apiUrl, {
        username: username,
        email: email,
        password: password,
        address: address,
        phone: phoneNumber,
        businessName: businessName,
        workingHours: workingHours,
        locationCoordinates: "0",
        reservationTimeOut: 0,
        approved: true
      }).then((response) => {
        console.log("Registration successful");
        setIsLoading(false);
        //setSuccessVisible(true);
        navigation.navigate("Login");
      });

    } catch (error) {
      console.error("Error registering user:", error);
      setErrorText("Error registering user!");
      setShowFail(true);
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Regular expression for phone number validation
    const phoneRegex = /^\d{10}$/;
  
    // Check if all fields are filled
    if (!username || !email || !password || !address || !phoneNumber || !businessName || !workingHours) {
      setErrorText("Please fill all the areas!");
      setShowFail(true);
      return;
    }
  
    // Check if the password matches the confirm password
    if (password !== confirmPassword) {
      setErrorText("Passwords don't match!");
      setShowFail(true);
      setPassword("");
      setConfirmPassword("");
      return;
    }
  
    // Check if email is valid
    if (!emailRegex.test(email)) {
      setErrorText("Please enter a valid email address!");
      setShowFail(true);
      return;
    }
  
    // Check if phone number is valid
    if (!phoneRegex.test(phoneNumber)) {
      setErrorText("Please enter a valid phone number!");
      setShowFail(true);
      return;
    }
  
    // Register the user if all conditions are met
    register();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logoImg} style={styles.image} />
      <TextInput
        label="Enter Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Enter Bussiness Name"
        value={businessName}
        onChangeText={(text) => setBusinessName(text)}
        mode="outlined"
        style={styles.input}
      />
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
      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Enter Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        mode="outlined"
        keyboardType="phone-pad" // Opens a numerical keyboard
        style={styles.input}
      />
      <TextInput
        label="Enter Address"
        value={address}
        onChangeText={(text) => setAddress(text)}
        mode="outlined"
        style={styles.input}
      />
      <TextInput
        label="Enter Working Hours"
        value={workingHours}
        onFocus={showTimePicker}
        onChangeText={(text) => setWorkingHours(text)}
        mode="outlined"
        style={styles.input}
      />
      <TimePickerModal
        visible={isTimePickerVisible}
        onDismiss={hideTimePicker}
        onConfirm={handleTimeConfirm}
        hours={12}
        minutes={14}
      />
      <Button 
      mode="contained"
      disabled = {isLoading}
      onPress={() => {handleRegister();/*navigation.navigate('Waiting');*/}}>
        Send Application Request
      </Button>
      <Text style={styles.text} >
        Your request will be evaluated and you will be contacted via phone number and email you provided.
      </Text>

      {/*Register failed, show a snackbar*/}
      <Snackbar
        visible={showFail}
        onDismiss={() => setShowFail(false)}
        onIconPress={() => setShowFail(false)}
        duration={Snackbar.LENGTH_SHORT}
      >
        {errorText}
      </Snackbar>
    </SafeAreaView>
  );
}

//     <View style={styles.profileContainer}>
//           <RegisterInfoCard
//             title="Username"
//             info={username}
//             isEditable={true}
//             onEditSave={handleEditSave}
//           />
//           <RegisterInfoCard
//             title="Business Name"
//             info={businessName}
//             isEditable={true}
//             onEditSave={handleEditSave}
//           />
//           <RegisterInfoCard
//             title="Email"
//             info={email}
//             isEditable={true}
//             onEditSave={handleEditSave}
//           />
//           <RegisterInfoCard
//             title="Password"
//             info={password}
//             isEditable={true}
//             onEditSave={handleEditSave}
//           />
//           <RegisterInfoCard
//             title="Phone Number"
//             info={phoneNumber}
//             isEditable={true}
//             onEditSave={handleEditSave}
//           />
//           <RegisterInfoCard
//             title="Address"
//             info={address}
//             isEditable={true}
//             onEditSave={handleEditSave}
//           />
//           <RegisterInfoCard
//             title="Open Hours"
//             info={{
//               openingTime: businessInfo.openingTime,
//               closingTime: businessInfo.closingTime,
//             }}
//             isEditable={true}
//             onEditSave={handleEditSave}
//             isTimeRange={true}
//           />
//           <RegisterInfoCard
//             title="Profile Picture"
//             isProfilePicture={true}
//             info={businessInfo.profilePicture}
//             isEditable={true}
//             onEditSave={handleEditSave}
//           />
//         </View>
//   )
// };

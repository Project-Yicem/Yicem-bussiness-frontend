// ProfileScreen.js
import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from "react-native";
import { 
  Button,
  Snackbar,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProfileInfoCard from "../Components/ProfileInfoCard";
import { theme } from "../Styles/styles"; 

//API
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { IP_ADDRESS } from "../Functions/GetIP";

const ProfileScreen = () => {
  // Mock business information
  // const businessInfo = {
  //   name: "Your Business Name",
  //   email: "business@example.com",
  //   password: "********", // Masked password
  //   phoneNumber: "+1234567890",
  //   address: "123 Business Street, City, Country",
  //   // You can replace the image source with the actual path or URL of the profile picture
  //   profilePicture: require("../assets/businesslogos/logo_bakery.png"),
  //   openingTime: "08.00",
  //   closingTime: "17.00",
  // };
  const [businessInfo,setBusinessInfo] = useState([]);
  //   businessName: "Your Business Name",
  //   email: "business@example.com",
  //   password: "********", // Masked password
  //   phoneNumber: "+1234567890",
  //   address: "123 Business Street, City, Country",
  //   // You can replace the image source with the actual path or URL of the profile picture
  //   profilePicture: require("../assets/businesslogos/logo_bakery.png"),
  //   openingTime: "08.00",
  //   closingTime: "17.00",
  // });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isRefreshing, setIsRefreshing] = useState(false);

  const putBusinessName = (value) => {
    if(!value){
      setErrorMessage("Please enter a valid value!");
      setShowError(true);
      return 0;
    }
    const data = {
      businessName: value
    };
    handleAPIprofileChange(data);
    return 1;
  }

  const putAddress = (value) => {
    if(!value){
      setErrorMessage("Please enter a valid value!");
      setShowError(true);
      return 0;
    }
    const data = {
      address: value
    };
    handleAPIprofileChange(data);
    return 1;
  }

  const putPhoneNumber = (value) => {
    const phoneRegex = /^\d{10}$/;

    if(!value || !phoneRegex.test(value)){
      setErrorMessage("Please enter a valid number!");
      setShowError(true);
      return 0;
    }
    const data = {
      phone: value
    };
    handleAPIprofileChange(data);
    return 1;
  }

  const putOpenHours = (value) => {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if(!value.openingTime || !value.closingTime ){
      setErrorMessage("Please enter valid values!");
      setShowError(true);
      return 0;
    }
    if(!timeRegex.test(value.openingTime) || !timeRegex.test(value.closingTime)){
      setErrorMessage("Please enter time in HH:MM format!");
      setShowError(true);
      return 0;
    }

    const data = {
      openingHour: value.openingTime,
      closingHour: value.closingTime
    };
    handleAPIprofileChange(data);
    return 1;
  }

  const putImage = (value) => {
    //TODO convert image to string
    console.log("image enter");
    //handleAPIprofileChange(data);
  }

  const changePassword = async (value) => {
    if(!value.oldPassword || !value.newPassword){
      setErrorMessage("Please enter valid passwords!");
      setShowError(true);
      return 0;
    }
    try {
      setIsRefreshing(true);

      const data = {
        oldPassword: value.oldPassword,
        newPassword:value.newPassword
      };

      const userToken = await SecureStore.getItemAsync("userToken");

      const apiUrl = `http://${IP_ADDRESS}:8080/api/seller/update-password`;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      };

      // Create an object to hold the data
    
    console.log("edited passwords: ",data);
      const response = await 
      axios.put(apiUrl, data, config).then((response) => {
        //console.log("changed ", field," successfully!");
        console.log(response);
        setIsRefreshing(false);
        fetchProfile();
      });
    } catch (error) {
      console.error("Error updating password:", error);
      setIsRefreshing(false);
    }
    return 1;
  };

  const handleAPIprofileChange = async (data) => {
    try {
      setIsRefreshing(true);

      const userToken = await SecureStore.getItemAsync("userToken");

      const apiUrl = `http://${IP_ADDRESS}:8080/api/seller/update`;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      };

      // Create an object to hold the data
    
    console.log("edited data: ",data);
      const response = await 
      axios.put(apiUrl, data, config).then((response) => {
        //console.log("changed ", field," successfully!");
        console.log(response);
        setIsRefreshing(false);
        fetchProfile();
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsRefreshing(false);
    }
  }

  const fetchProfile = async () => {
    try {
      setIsRefreshing(true);

      const userToken = await SecureStore.getItemAsync("userToken");
      const userID = await SecureStore.getItemAsync("userID");
      console.log(userID);
      console.log(userToken);

      const apiUrl = `http://${IP_ADDRESS}:8080/api/seller/${userID}`;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        }
      };
      const response = await axios.get(apiUrl, config);
      console.log(response);

      if (parseInt(response.headers['content-length']) === 0) {
        setBusinessInfo([]);
      } else {
        setBusinessInfo(response.data);
      }

      setIsRefreshing(false);

      // Add an arbitrary "isOpen" attribute to each business
      // TODO This is temporary!!! This should be handled by the backend
      // const updatedBusinesses = response.data.map((business) => {
      //   business.isOpen = true;
      //   return business;
      // });
      // setBusinesses(updatedBusinesses);
    } catch (error) {
      console.error("Error fetching offers data:", error);
      setShowError(true);
      setErrorMessage("Error fetching offers!");
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
  }, [businessInfo]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={fetchProfile} />
        }
      >
        <View style={styles.profileContainer}>
          <ProfileInfoCard
            title="Business Name"
            info={businessInfo.businessName}
            isEditable={true}
            onEditSave={putBusinessName}
          />
          <ProfileInfoCard
            title="Phone Number"
            info={businessInfo.phone}
            isEditable={true}
            onEditSave={putPhoneNumber}
          />
          <ProfileInfoCard
            title="Address"
            info={businessInfo.address}
            isEditable={true}
            onEditSave={putAddress}
          />
          <ProfileInfoCard
            title="Open Hours"
            info={{
              openingTime: businessInfo.openingHour,
              closingTime: businessInfo.closingHour,
            }}
            isEditable={true}
            onEditSave={putOpenHours}
            isTimeRange={true}
          />
          <ProfileInfoCard
            title="Profile Picture"
            isProfilePicture={true}
            info={businessInfo.logo}
            isEditable={true}
            onEditSave={putImage}
          />
          <View style={{borderWidth: 2, borderColor: "#f26f55", borderRadius: 10, backgroundColor: "#ffffff",}}>
            <ProfileInfoCard
              title="Change Password"
              info={{
                oldPassword:"",
                newPassword:""
              }}
              isEditable={true}
              onEditSave={changePassword}
              isPassword={true}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            icon={() => <Ionicons name="log-out" size={24} color="white" />}
            onPress={() => {
              // Handle logout logic
              console.log("Logged out");
            }}
            mode="contained"
          >
            Log Out
          </Button>
          <Button
            mode="contained"
            buttonColor="teal"
            icon={() => <Ionicons name="map" size={24} color="white" />}
            onPress={() => {
              // Handle map location upload logic
              console.log("Upload Map Location");
            }}
          >
            Edit Map Location
          </Button>
        </View>
      </ScrollView>
      <Snackbar
          visible={showError}
          onDismiss={() => setShowError(false)}
          onIconPress={() => setShowError(false)}
          duration={Snackbar.LENGTH_SHORT}
        >
          {errorMessage}
        </Snackbar>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    padding: 16,
    margin: 16,
    borderWidth: 2,
    borderColor: "#f26f55",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 16,
  },
  editButton: {
    marginTop: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
});

export default ProfileScreen;

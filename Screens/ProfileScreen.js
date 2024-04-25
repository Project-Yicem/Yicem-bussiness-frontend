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
  const [businessInfo,setBusinessInfo] = useState({
    businessName: "Your Business Name",
    email: "business@example.com",
    password: "********", // Masked password
    phoneNumber: "+1234567890",
    address: "123 Business Street, City, Country",
    // You can replace the image source with the actual path or URL of the profile picture
    profilePicture: require("../assets/businesslogos/logo_bakery.png"),
    openingTime: "08.00",
    closingTime: "17.00",
  });

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isRefreshing, setIsRefreshing] = useState(false);

  const putBusinessName = (value) => {
    const data = {
      businessName: value
    };
    handleAPIprofileChange(data);
  }

  const putAddress = (value) => {
    const data = {
      address: value
    };
    handleAPIprofileChange(data);
  }

  const putPhoneNumber = (value) => {
    const data = {
      phone: value
    };
    handleAPIprofileChange(data);
  }

  const putOpenHours = (value) => {
    const data = {
      openingHour: value,
      closingHour: value
    };
    handleAPIprofileChange(data);
  }

  const putImage = (value) => {
    //TODO convert image to string
    console.log("image enter");
    //handleAPIprofileChange(data);
  }

  const handleEditSave = (field, editedInfo) => {
    // Handle saving the edited information
    console.log(`Edit ${field}: ${editedInfo}`);
    // You can add logic to save the edited information to your data source
    handleAPIprofileChange(field,editedInfo);
  };

  const handleAPIprofileChange = async (data) => {
    try {
      setIsRefreshing(true);

      const userToken = await SecureStore.getItemAsync("userToken");
      //const userID = await SecureStore.getItemAsync("userID");
      //console.log(userID);
      const apiUrl = `http://${IP_ADDRESS}:8080/api/seller/update`;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`
        }
      };

      // Create an object to hold the data
    
    console.log("edited data: ",data);
      const response = await 
      axios.post(apiUrl, data, config).then((response) => {
        console.log("changed ", field," successfully!");
        console.log(response);
        setIsOffersLoading(false);
        hideModal();  //setSuccessVisible(true);
        fetchOffers();
      });
    } catch (error) {
      console.error("Error adding offers:", error);
      setIsOffersLoading(false);
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
          Authorization: `Bearer ${userToken}`
        }
      };
      const response = await axios.get(apiUrl, config);
      console.log(response);
      
      // if (parseInt(response.headers['content-length']) === 0) {
      //   setBusinessInfo([]);
      // } else {
        //setBusinessInfo(response.data);
      //}
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
            title="Email"
            info={businessInfo.email}
            isEditable={true}
            onEditSave={handleEditSave}
          />
          <ProfileInfoCard
            title="Password"
            info={businessInfo.password}
            isEditable={true}
            onEditSave={handleEditSave}
          />
          <ProfileInfoCard
            title="Phone Number"
            info={businessInfo.phoneNumber}
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
              openingTime: businessInfo.openingTime,
              closingTime: businessInfo.closingTime,
            }}
            isEditable={true}
            onEditSave={putOpenHours}
            isTimeRange={true}
          />
          <ProfileInfoCard
            title="Profile Picture"
            isProfilePicture={true}
            info={businessInfo.profilePicture}
            isEditable={true}
            onEditSave={putImage}
          />
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
        <Snackbar
          visible={showError}
          onDismiss={() => setShowError(false)}
          onIconPress={() => setShowError(false)}
          duration={Snackbar.LENGTH_SHORT}
        >
          {errorMessage}
        </Snackbar>
      </ScrollView>
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

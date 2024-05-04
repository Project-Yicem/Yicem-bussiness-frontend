import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import {
  Button,
  IconButton,
  Text,
  Portal,
  Dialog,
  ActivityIndicator,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import axios from "axios";
import { IP_ADDRESS } from "../Functions/GetIP";
import * as Location from "expo-location";

const MapLocationPickerScreen = () => {
  const navigation = useNavigation();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [currentRegion, setCurrentRegion] = useState(null);

  const getUserLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Location permission denied!");
        setCurrentRegion({
          latitude: 39.868254625289254,
          latitudeDelta: 0.008569388910380837,
          longitude: 32.74868996813893,
          longitudeDelta: 0.005345307290554047,
        });
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      setCurrentRegion({
        latitude: 39.868254625289254,
        latitudeDelta: 0.008569388910380837,
        longitude: 32.74868996813893,
        longitudeDelta: 0.005345307290554047,
      });

      //console.error("Error getting user location:", error);
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  const handleMapPress = (event) => {
    setSelectedLocation(event.nativeEvent.coordinate);
  };

  const handleSaveLocation = async () => {
    setIsUploading(true);
    if (!selectedLocation) {
      return;
    }
    // Send a PUT request with the selected latitude and longitude
    const userToken = await SecureStore.getItemAsync("userToken");

    const apiUrl = `http://${IP_ADDRESS}:8080/api/seller/update`;
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };
    const data = {
      locationLatitude: selectedLocation.latitude,
      locationLongitude: selectedLocation.longitude,
    };
    console.log("Sending request with:", data);
    try {
      const response = await axios.put(apiUrl, data, config);
      console.log(response.data);
      setIsDialogVisible(true);
    } catch (error) {
      console.error(error);
    }

    setIsUploading(false);
  };

  return (
    <View style={styles.container}>
      {!currentRegion ? (
        <ActivityIndicator
          animating={true}
          color="#f25e35"
          size="large"
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        />
      ) : (
        <>
          <MapView
            style={styles.map}
            initialRegion={currentRegion}
            onPress={handleMapPress}
          >
            {selectedLocation && <Marker coordinate={selectedLocation} />}
          </MapView>
          <Portal>
            <Dialog
              visible={isDialogVisible}
              onDismiss={() => {
                setIsDialogVisible(false);
                navigation.goBack();
              }}
            >
              <Dialog.Title>Location Saved</Dialog.Title>
              <Dialog.Content>
                <Text>Your location has been saved.</Text>
              </Dialog.Content>
              <Dialog.Actions>
                <Button
                  onPress={() => {
                    setIsDialogVisible(false);
                    navigation.goBack();
                  }}
                >
                  OK
                </Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              backgroundColor: "tomato",
            }}
          >
            <IconButton
              icon="arrow-left"
              size={30}
              onPress={() => navigation.goBack()}
              iconColor="white"
            />
            {selectedLocation && (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ color: "white" }}>Save</Text>
                {!isUploading ? (
                  <IconButton
                    icon="upload"
                    mode="contained"
                    size={30}
                    iconColor="white"
                    backgroundColor="orange"
                    onPress={handleSaveLocation}
                    disabled={selectedLocation === null || isUploading}
                  />
                ) : (
                  <ActivityIndicator color="white" />
                )}
              </View>
            )}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.97,
  },
});

export default MapLocationPickerScreen;
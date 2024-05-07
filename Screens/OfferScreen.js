import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  RefreshControl,
} from "react-native";
import {
  Button,
  Modal,
  Portal,
  TextInput,
  Checkbox,
  Text,
  ActivityIndicator,
  Snackbar,
  Searchbar,
} from "react-native-paper";
import OfferItem from "../Components/OfferItem";
import { theme } from "../Styles/styles";

//API
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { IP_ADDRESS } from "../Functions/GetIP";

export default function OffersScreen({ navigation }) {
  const [isOffersLoading, setIsOffersLoading] = useState(false);
  const [offers, setOffers] = useState([]);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newTotalItems, setNewTotalItems] = useState(0);
  const [selectedPickupTimes, setSelectedPickupTimes] = useState([]);

  const[openingTime, setOpeningTime] = useState("10:45");
  const[closingTime, setClosingTime] = useState("16:45");

  const InitNewItem = () => {
    setNewTitle("");
    setNewDescription("");
    setNewPrice(0);
    setNewTotalItems(0);
    setSelectedPickupTimes([]);
  };

  const [isModalVisible, setModalVisible] = useState(false);
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);


  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  //get open close time
  const updateTimes = async () => {
    setOpeningTime( await SecureStore.getItemAsync("openingHour"));
    setClosingTime( await SecureStore.getItemAsync("closingHour"));

    console.log(closingHour,openingHour);
  }

  //Fetch offers
  const fetchOffers = async () => {
    try {
      setIsOffersLoading(true);

      const userToken = await SecureStore.getItemAsync("userToken");
      const userID = await SecureStore.getItemAsync("userID");
      console.log(userID);
      const apiUrl = `http://${IP_ADDRESS}:8080/api/seller/${userID}/offers`;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const response = await axios.get(apiUrl, config);
      console.log(response);

      if (response.data.length === 0) {
        setOffers([]);
      } else {
        setOffers(response.data);
      }
      setIsOffersLoading(false);

      // Add an arbitrary "isOpen" attribute to each business
      // TODO This is temporary!!! This should be handled by the backend
      // const updatedBusinesses = response.data.map((business) => {
      //   business.isOpen = true;
      //   return business;
      // });
      // setBusinesses(updatedBusinesses);
    } catch (error) {
      console.error("Error fetching offers data");
      setShowError(true);
      setErrorMessage("Error fetching offers!");
      setIsOffersLoading(false);
    }
    InitNewItem();
  };

  //add offers
  const addOffer = async () => {
    const positiveIntegerRegex = /^[1-9]\d*$/;
    const priceRegex = /^\d+(\.\d{1,2})?$/;

    if (!newTitle || !newDescription || !newPrice || !newTotalItems) {
      setErrorMessage("please fill all the fields!");
      setShowError(true);
      return;
    }

    if (!priceRegex.test(newPrice)) {
      setErrorMessage("please enter a valid price!");
      setShowError(true);
      return;
    }

    if (!positiveIntegerRegex.test(newTotalItems)) {
      setErrorMessage("Please enter a valid item count!");
      setShowError(true);
      return;
    }

    if (!selectedPickupTimes || selectedPickupTimes.length === 0) {
      setErrorMessage("please select at least one pickup timeslot!");
      setShowError(true);
      return;
    }

    console.log(selectedPickupTimes);

    try {
      setIsOffersLoading(true);

      const userToken = await SecureStore.getItemAsync("userToken");
      const userID = await SecureStore.getItemAsync("userID");
      console.log(userID);
      const apiUrl = `http://${IP_ADDRESS}:8080/api/seller/${userID}/addOffer`;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const response = await axios
        .post(
          apiUrl,
          {
            offerName: newTitle,
            description: newDescription,
            price: newPrice,
            itemCount: newTotalItems,
            reserved: true,
            pickupTimes: selectedPickupTimes.map((time) => {
              const [startTime, endTime] = time.split("-");
              return {
                pickupTimeStart: startTime.trim(),
                pickupTimeEnd: endTime.trim(),
              };
            }),
            //mysteryBox: true,
          },
          config
        )
        .then((response) => {
          console.log("offer adding successful");
          console.log(response);
          setIsOffersLoading(false);
          hideModal(); //setSuccessVisible(true);
          fetchOffers();
        });
    } catch (error) {
      console.error("Error adding offers");
      setIsOffersLoading(false);
    }
  };

  useEffect( () => {
    fetchOffers();

    //get open-close time
    updateTimes();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(offers);
      return;
    }
    if(offers.length > 0){
      setFilteredData(
        offers.filter((offer) =>
          offer.offerName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    else{
      setFilteredData(offers);
      return;
    }
  }, [offers, searchQuery]);

  const generatePickupTimes = (openingTime, closingTime) => {
    const [openingHour, openingMinute] = openingTime.split(":").map(Number);
    const [closingHour, closingMinute] = closingTime.split(":").map(Number);

    let currentHour = Math.floor(openingHour); // Start from the nearest hour before the opening time
    let currentMinute = 0;
    const times = [];

    while (
      currentHour < closingHour ||
      (currentHour === closingHour && currentMinute < closingMinute)
    ) {
      const startTime = `${currentHour
        .toString()
        .padStart(2, "0")}.${currentMinute.toString().padStart(2, "0")}`;
      currentHour++;
      const endTime = `${currentHour
        .toString()
        .padStart(2, "0")}.${currentMinute.toString().padStart(2, "0")}`;
      times.push(`${startTime}-${endTime}`);
    }

    return times;
  };

  const handleEditPress = (offerId) => {
    // Implement navigation to the edit screen or any other logic
    console.log(`Edit pressed for offer with id: ${offerId}`);
  };

  const handleReservationsPress = (offerId) => {
    console.log(`Reservations pressed for offer with id: ${offerId}`);
  };

  const renderOffers = () => {
    //console.log(offers);
    if (!filteredData || filteredData.length === 0) {
      return  <View style={styles.EmptyInfoContainer}>
                <Text style={styles.EmptyInfoText}>No offers</Text>
              </View>;
    }
    try {
      return filteredData.map((item) => (
        <OfferItem
          key={item.id}
          id={item.id}
          title={item.offerName}
          description={item.description}
          price={item.price}
          itemsLeft={item.itemCount}
          totalItems={item.totalItems}
          pickupTimes={item.pickupTimes}
          reservations={item.reservations}
          onEditPress={() => handleEditPress(item.id)}
          onReservationsPress={() => handleReservationsPress(item.id)}
          refresh={fetchOffers}
        />
      ));
    } catch (error) {
      return  <View style={styles.EmptyInfoContainer}>
                <Text style={styles.EmptyInfoText}>No offers</Text>
              </View>;    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isOffersLoading}
            onRefresh={() => { fetchOffers(); updateTimes();}}
          />
        }
      >
        {/* {isOffersLoading &&
          <ActivityIndicator
          animating={true}
          color={theme.colors.primary}
          style={{ marginTop: "20%" }}
        /> */}
        <Searchbar
          placeholder="Search Offer..."
          onChangeText={(query) => setSearchQuery(query)}
          value={searchQuery}
          style={styles.searchBar}
        />
        {renderOffers()}
        <Button
          icon="plus"
          mode="contained"
          onPress={() => {
            console.log("Add Offer pressed");
            showModal();
          }}
          style={styles.button}
        >
          Add Offer
        </Button>
      </ScrollView>
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalContainer}
        >
          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <TextInput
              label="Title"
              value={newTitle}
              onChangeText={(text) => setNewTitle(text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Description"
              value={newDescription}
              onChangeText={(text) => setNewDescription(text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Price"
              value={newPrice}
              onChangeText={(text) => setNewPrice(text)}
              mode="outlined"
              keyboardType="numeric" // Opens a numerical keyboard
              style={styles.input}
            />
            <TextInput
              label="Total Items"
              value={newTotalItems}
              onChangeText={(text) => setNewTotalItems(text)}
              mode="outlined"
              keyboardType="numeric" // Opens a numerical keyboard
              style={styles.input}
            />
            <Text style={styles.modalTitle}>Select Pickup Times</Text>
            {generatePickupTimes(openingTime, closingTime).map((time) => (
              <View key={time} style={styles.checkboxContainer}>
                <Checkbox.Item
                  label={time}
                  status={
                    selectedPickupTimes.includes(time) ? "checked" : "unchecked"
                  }
                  onPress={() => {
                    const updatedTimes = selectedPickupTimes.includes(time)
                      ? selectedPickupTimes.filter((t) => t !== time)
                      : [...selectedPickupTimes, time];
                    setSelectedPickupTimes(updatedTimes);
                  }}
                  color="#f26f55"
                />
              </View>
            ))}
          </ScrollView>
          <Button
            onPress={addOffer /*handleSaveChanges*/}
            mode="contained"
            style={styles.button}
          >
            Save
          </Button>
        </Modal>
        {/*error occured, show a snackbar*/}
        <Snackbar
          visible={showError}
          onDismiss={() => setShowError(false)}
          onIconPress={() => setShowError(false)}
          duration={Snackbar.LENGTH_SHORT}
        >
          {errorMessage}
        </Snackbar>
      </Portal>
      {/* error occured, show a snackbar
      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        onIconPress={() => setShowError(false)}
        duration={Snackbar.LENGTH_SHORT}
      >
        {errorMessage}
      </Snackbar> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 16,
    backgroundColor: "#f26f55",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 16,
    borderRadius: 8,
    maxHeight: "80%", // Set maximum height for the modal
  },
  scrollContainer: {
    flexGrow: 1,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  searchBar: {
    margin: 16,
    //marginTop: 40,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: theme.colors.primary, // Change the color as needed
  },
  EmptyInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#f2f2f2', // Passive gray color
  },
  EmptyInfoText: {
    color: '#888', // Gray color for the text
    fontSize: 16,
    textAlign: 'center',
  },
});

//  const [dummyOffers, setDummyOffers] = useState([
//   {
//     id: "1",
//     title: "Pasty Box",
//     description: "Salted Bagel, Sandwich, Bread",
//     price: "$5.99",
//     itemsLeft: 5,
//     pickupTimes: ["10.00-11.00", "11.00-12.00"],
//     reservations: [
//       {
//         id: "1",
//         name: "John Doe",
//         pickupTime: "10.00-11.00",
//         isSold: false,
//       },
//       {
//         id: "2",
//         name: "Jane Doe",
//         pickupTime: "11.00-12.00",
//         isSold: false,
//       },
//     ],
//   },
//   {
//     id: "2",
//     title: "Cafe Out Exclusive Box",
//     description: "Specials",
//     price: "$12.99",
//     itemsLeft: 10,
//     pickupTimes: ["12.00-13.00", "13.00-14.00", "14.00-15.00", "15.00-16.00"],
//     reservations: [
//       {
//         id: "3",
//         name: "Alice Doe",
//         pickupTime: "12.00-13.00",
//         isSold: false,
//       },
//       {
//         id: "4",
//         name: "Bob Doe",
//         pickupTime: "13.00-14.00",
//         isSold: true,
//       },
//       {
//         id: "5",
//         name: "Eve Doe",
//         pickupTime: "14.00-15.00",
//         isSold: false,
//       },
//       {
//         id: "6",
//         name: "Mallory Doe",
//         pickupTime: "15.00-16.00",
//         isSold: true,
//       },
//     ],
//   },
//   {
//     id: "3",
//     title: "Sweet Box",
//     description: "Donut, Cookie, Muffin",
//     price: "$0.99",
//     itemsLeft: 3,
//     pickupTimes: ["16.00-17.00", "17.00-18.00", "18.00-19.00"],
//     reservations: [
//       {
//         id: "7",
//         name: "Charlie Doe",
//         pickupTime: "16.00-17.00",
//         isSold: false,
//       },
//       {
//         id: "8",
//         name: "David Doe",
//         pickupTime: "17.00-18.00",
//         isSold: false,
//       },
//       {
//         id: "9",
//         name: "Frank Doe",
//         pickupTime: "18.00-19.00",
//         isSold: true,
//       },
//     ],
//   },
//   // Add more dummy offers as needed
// ]);

// const handleSaveChanges = () => {
//   const newOffer = {
//     id: (dummyOffers.length + 1).toString(),
//     title: newTitle,
//     description: newDescription,
//     price: newPrice,
//     itemsLeft: parseInt(newTotalItems) || 0,
//     pickupTimes: selectedPickupTimes,
//     reservations: []
//   };

//   console.log("Changes saved:", newOffer);

//   setDummyOffers((prevOffers) => [...prevOffers, newOffer]);

//   console.log(dummyOffers);

//   setNewTitle("");
//   setNewDescription("");
//   setNewPrice(0);
//   setNewTotalItems(0);
//   setSelectedPickupTimes([]);
//   hideModal();
// };

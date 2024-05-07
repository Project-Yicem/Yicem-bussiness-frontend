import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
} from "react-native";
import { Button, Title, Card, Snackbar, Searchbar, Text } from "react-native-paper";
import SaleItem from "../Components/SaleItem";
import { theme } from "../Styles/styles";

//API
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { IP_ADDRESS } from "../Functions/GetIP";
import ReviewComponent from "../Components/ReviewComponent";

const AnalyticsScreen = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const [sales, setSales] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [sales, setSales] = useState([]);

  const [popularSales, setPopularSales] = useState([]);

  //Fetch offers
  const fetchHistory = async () => {
    try {
      setIsLoading(true);

      const userToken = await SecureStore.getItemAsync("userToken");
      const userID = await SecureStore.getItemAsync("userID");
      console.log(userID);
      const apiUrl = `http://${IP_ADDRESS}:8080/api/seller/${userID}/history`;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };
      const response = await axios.get(apiUrl, config);
      console.log(response.data);

      if (response.data.length === 0) {
        setSales([]);
      } else {
        setSales(response.data);
      }

      // Sort the sales by their transaction date, newest first
      setSales((sales) =>
        sales.sort((a, b) => {
          return new Date(b.transactionDate) - new Date(a.transactionDate);
        })
      );

      // Display the transactionDates in a better format
      // setSales((sales) =>
      //   sales.map((sale) => {
      //     sale.transactionDate = new Date(
      //       sale.transactionDate
      //     ).toLocaleString();
      //     return sale;
      //   })
      // );

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching history");
      setShowError(true);
      setErrorMessage("Error fetching History!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <ScrollView
      // style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchHistory} />
      }
    >
      <ReviewComponent reviews={sales}></ReviewComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  backButton: {
    marginTop: 16,
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

export default AnalyticsScreen;


// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const AnalyticsScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.noDataText}>No data to show</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noDataText: {
//     fontSize: 18,
//     color: 'grey',
//   },
// });

// export default AnalyticsScreen;
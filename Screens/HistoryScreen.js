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

const HistoryScreen = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const [sales, setSales] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [sales, setSales] = useState([]);
  //   {
  //     id: '1',
  //     title: 'Pastry Box',
  //     price: '$19.99',
  //     dateTime: '2023-12-01 08:30 AM',
  //     rating: 4,
  //     customerName: "John Doe",
  //     comment:null,
  //   },
  //   {
  //     id: '2',
  //     title: 'Product 2',
  //     price: '$29.99',
  //     dateTime: '2023-12-02 10:45 AM',
  //     rating: 2,
  //     customerName: "John Dove",
  //     comment:null,
  //   },
  //   {
  //     id: '2',
  //     title: 'Product 2',
  //     price: '$29.99',
  //     dateTime: '2023-12-02 10:45 AM',
  //     rating: 5,
  //     customerName: "Joe Boe",
  //     comment:"It was just as fresh! would recommend."
  //   },
  //   // Add more sale items as needed
  // ]);

  //Fetch offers
  const fetchSales = async () => {
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
      setSales((sales) =>
        sales.map((sale) => {
          sale.transactionDate = new Date(
            sale.transactionDate
          ).toLocaleString();
          return sale;
        })
      );
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching history:", error);
      setShowError(true);
      setErrorMessage("Error fetching History!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(sales);
      return;
    }
    if(sales.length > 0){
      setFilteredData(
        sales.filter((item) =>
          item.offerName.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
    else{
      setFilteredData(sales);
      return;
    }
  }, [sales, searchQuery]);

  const showSales = () => {
    console.log(sales);
    if (!filteredData || filteredData.length === 0) {
      return  <View style={styles.EmptyInfoContainer}>
                <Text style={styles.EmptyInfoText}>No Past Sale</Text>
              </View>;
    }
    try {
      return filteredData.map((item) => (
        <SaleItem
          key={item.id}
          title={item.offerName /*item.title*/}
          price={item.price}
          dateTime={item.transactionDate}
          rating={(item.review && item.review.rating) || -1}
          customerName={item.buyerName}
          comment={item.review && item.review.comment}
        />
      ));
    } catch (error) {
      console.log(error);
      return  <View style={styles.EmptyInfoContainer}>
                <Text style={styles.EmptyInfoText}>No Past Sale</Text>
              </View>;
    }
  };

  return (
    <ScrollView
      // style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchSales} />
      }
    >
      <Searchbar
        placeholder="Search Offer..."
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
        style={styles.searchBar}
      />
      {showSales()}
      {/*error occured, show a snackbar*/}
      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
        onIconPress={() => setShowError(false)}
        duration={Snackbar.LENGTH_SHORT}
      >
        {errorMessage}
      </Snackbar>
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

export default HistoryScreen;

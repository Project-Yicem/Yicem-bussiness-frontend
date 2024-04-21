import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Button, Title, Card, Snackbar, } from 'react-native-paper';
import SaleItem from '../Components/SaleItem';
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
          Authorization: `Bearer ${userToken}`
        }
      };
      const response = await axios.get(apiUrl, config);
      console.log(response);
      
      if(response.data === "History is empty."){
        setSales([]);
      }
      else{
        setSales(response.data);
      }
      setIsLoading(false);

      // Add an arbitrary "isOpen" attribute to each business
      // TODO This is temporary!!! This should be handled by the backend
      // const updatedBusinesses = response.data.map((business) => {
      //   business.isOpen = true;
      //   return business;
      // });
      // setBusinesses(updatedBusinesses);
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

  const [sales, setSales] = useState([
    {
      id: '1',
      title: 'Pastry Box',
      price: '$19.99',
      dateTime: '2023-12-01 08:30 AM',
      rating: 4,
      customerName: "John Doe",
      comment:null,
    },
    {
      id: '2',
      title: 'Product 2',
      price: '$29.99',
      dateTime: '2023-12-02 10:45 AM',
      rating: 2,
      customerName: "John Dove",
      comment:null,
    },
    {
      id: '2',
      title: 'Product 2',
      price: '$29.99',
      dateTime: '2023-12-02 10:45 AM',
      rating: 5,
      customerName: "Joe Boe",
      comment:"It was just as fresh! would recommend."
    },
    // Add more sale items as needed
  ]);

  return (
    <ScrollView 
    style={styles.container}
    refreshControl={
      <RefreshControl refreshing={isLoading} onRefresh={fetchSales} />
    }
    >
      {sales.map((item) => (
          <SaleItem
            key={item.id}
            title={item.title}
            price={item.price}
            dateTime={item.dateTime}
            rating={item.rating}
            customerName={item.customerName}
            comment={item.comment}
          />
      ))}
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
    backgroundColor:"fff",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  backButton: {
    marginTop: 16,
  },
});

export default HistoryScreen;
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

import { FontAwesome } from '@expo/vector-icons';

const AnalyticsScreen = () => {
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //const [sales, setSales] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [sales, setSales] = useState([]);

  const [popularSales, setPopularSales] = useState([]);

  const[rating,setRating] = useState(0.0);

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

      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching history");
      setShowError(true);
      setErrorMessage("Error fetching History!");
      setIsLoading(false);
    }
  };

  //fetch standing
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
        },
      };
      const response = await axios.get(apiUrl, config);
      console.log(response);

      if (parseInt(response.headers["content-length"]) === 0) {
      } else {
        setRating(response.data.rating ? parseFloat(response.data.rating) : 0.0);
      }

      await SecureStore.setItemAsync("openingHour", response.data.openingHour);
      await SecureStore.setItemAsync("closingHour", response.data.closingHour);

      setIsRefreshing(false);

    } catch (error) {
      // console.error("Error fetching offers data");
      setShowError(true);
      setErrorMessage("Error fetching offers!");
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHistory();
    fetchProfile();
  }, []);

  return (
    <ScrollView
      // style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={() => {fetchHistory();fetchProfile()}} />
      }
    >
      <View style={[styles.header, styles.line]}>
            <View style={styles.profileContainer2}>
                <Text style={styles.subscriberCount}>
                    Favorited:
                </Text> 
                <FontAwesome name="heart" size={24} color="red" style={styles.subscriberCount}/> 
                <Text style={styles.subscriberCount}>
                    734
                </Text> 
            </View>
            <View style={styles.profileContainer}>
                <Text style={styles.averageRating}>
                     Rating:
                </Text> 
                <FontAwesome name="star" size={24} color="#fcba03" style={styles.averageRating}/> 
                <Text style={styles.averageRating}>
                    {rating}
                </Text> 
            </View>
        </View>
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
    borderColor: theme.colors.primary,
  },
  EmptyInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#f2f2f2', // Passive gray color
  },
  EmptyInfoText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },

  profileContainer: {
    flex: 1,
    width:"30%",
    padding: 16,
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#f26f55",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  profileContainer2: {
    flex: 1,
    //width:"50%",
    padding: 16,
    margin: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#f23545",
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  subscriberCount: {
    marginLeft: 5, 
  },
  averageRating: {
    marginRight: 5, 
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal:10,
    justifyContent: "space-between", 
  },
  line:{
    flex:1,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
});

export default AnalyticsScreen;

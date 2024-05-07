import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
//import { Picker } from "@react-native-picker/picker"
import Carousel, { Pagination } from "react-native-snap-carousel";
import Dropdown from 'react-native-paper-dropdown';
import { YearlyGraph, WeeklyGraph } from "./Graphs";
import { FontAwesome } from '@expo/vector-icons'; // Import FontAwesome icons

import { theme } from "../Styles/styles";
import { Card, Title, Paragraph } from "react-native-paper";

const ReviewComponent = ({ reviews }) => {
  const [historyData, setHistoryData] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTimeRange, setSelectedTimeRange] = useState("thisWeek");

  const [showDropDown1,setShowDropDown1] = useState(false);
  const [showDropDown2,setShowDropDown2] = useState(false);

  const [weeklyData, setWeeklyData] = useState({ labels: [], data: [] });
  const [yearlyData, setYearlyData] = useState({ labels: [], data: [] });
  const [selectedTimeRange2, setSelectedTimeRange2] = useState("thisWeek");

  const calculateWeeklyData = () => {
    const currentDate = new Date();
    const labels = [];
    const data = [];

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Loop through the past 7 days
    for (let i = 6; i >= 0; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() - i);

        const dayName = dayNames[date.getDay()];

        labels.push(dayName);

        // Count the number of reviews for each day (assuming 'reviews' is defined somewhere)
        const reviewCount = reviews.filter(review => {
            const reviewDate = new Date(review.transactionDate).toLocaleDateString();
            return reviewDate === date.toLocaleDateString();
        }).length;

        data.push(reviewCount);
    }

    setWeeklyData({ labels, data });
    console.log(weeklyData);
};

  // Function to calculate data based on reviews for the past year
  const calculateYearlyData = () => {
    const currentDate = new Date();
    const labels = [];
    const data = [];

    // Loop through the past 12 months
    for (let i = 11; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const monthIndex = date.getMonth();
        const monthName = new Intl.DateTimeFormat('default', { month: 'short' }).format(date); // Get short month name

        labels.push(monthName);

        // Count the number of reviews for each month (assuming 'reviews' is defined somewhere)
        const reviewCount = reviews.filter(review => {
            const reviewDate = new Date(review.transactionDate);
            return reviewDate.getFullYear() === date.getFullYear() && reviewDate.getMonth() === monthIndex;
        }).length;

        data.push(reviewCount);
    }

    setYearlyData({ labels, data });
    console.log(yearlyData);
};

  const calculateData = (reviews) => {
    const data = {};
    console.log(reviews);

    if (!Array.isArray(reviews) || reviews.length === 0) {
        // If reviews is not defined or empty, clear history data
        setHistoryData([]);
        return;
    }
    reviews.forEach(review => {
      if (!data[review.offerId]) {
        data[review.offerId] = {
          count: 0,
          score: 0,
          scoreCount: 0,
          name: review.offerName,
          price: review.price,
          timestamp: new Date(review.transactionDate).getTime() // Add timestamp for filtering
        };
      }

      data[review.offerId].count++;

      if (review.review && typeof review.review.rating === 'number') {
        data[review.offerId].score += review.review.rating;
        data[review.offerId].scoreCount++;
      }
    });

    const dataArr = Object.entries(data).map(([offerId, { count, score, scoreCount, name, price, timestamp }]) => ({
      offerId,
      name,
      count,
      averageScore: scoreCount ? score / scoreCount : 0,
      price,
      timestamp,
    }));

    setHistoryData(dataArr);
  };

  useEffect(() => {
    calculateData(reviews);

    calculateYearlyData();
    calculateWeeklyData();
  }, [reviews]);

  useEffect(() => {
    calculateData(reviews);

    calculateYearlyData();
    calculateWeeklyData();
  }, []);

  const filterData = (timeRange) => {
    const currentDate = new Date();
    let filteredReviews = reviews;

    if (timeRange === "thisWeek") {
      const firstDayOfWeek = new Date(currentDate);
      firstDayOfWeek.setDate(currentDate.getDate() - currentDate.getDay()); // Calculate first day of the week
      filteredReviews = reviews.filter(review => new Date(review.transactionDate) >= firstDayOfWeek);
    } else if (timeRange === "thisMonth") {
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      filteredReviews = reviews.filter(review => new Date(review.transactionDate) >= firstDayOfMonth);
    } else if (timeRange === "thisYear") {
      const firstDayOfYear = new Date(currentDate.getFullYear(), 0, 1);
      filteredReviews = reviews.filter(review => new Date(review.transactionDate) >= firstDayOfYear);
    }
    console.log("filtering");

    return filteredReviews;
  };

  useEffect(() => {
    const filteredReviews = filterData(selectedTimeRange);
    //setHistoryData(filteredReviews);

    calculateData(filteredReviews);
  }, [selectedTimeRange, reviews]);

  const renderItem = ({ item }) => (
    <Card style={styles.offerContainer}>
      <Card.Content style={styles.contentContainer}>
        {/* Title and Expand-Shrink Icon */}
        <View style={styles.titleContainer}>
          <Title style={styles.title}>{item.name}</Title>
          <Paragraph style={styles.price}>₺{item.price}</Paragraph>
        </View>
        {/* Date and Time */}
        <Paragraph style={styles.saleDateTime}>Sold {item.count} of this offer.</Paragraph>
        {/* Price and Star Rating */}
        <View style={styles.descriptionContainer}>
          {item.averageRating < 0 ? (
            <Paragraph style={styles.saleRating}>No rating</Paragraph>
          ) : (
            <View style={styles.descriptionContainer}>
                <FontAwesome name="star" size={24} color="#fcba03" style={styles.averageRating}/> 
                <Text style={styles.cardText}>
                    {item.averageScore ? item.averageScore.toFixed(2) : 'N/A'}
                </Text>
            </View>
          )}
        </View>
      </Card.Content>
    </Card>
  );
  
  return (
    <View style={styles.container}>
        <View style={[styles.header, styles.line]}>
            <View style={styles.profileContainer2}>
                <Text style={styles.subscriberCount}>
                    Favorited by:
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
                    4.5
                </Text> 
            </View>
        </View>
        <View style={styles.header}>
            <Text style={styles.headerText}>Popular Offers</Text>
            <View style={styles.dropdownContainer}>
                <Dropdown
                style={styles.dropdown}
                label="Filter"
                mode={"outlined"}
                visible={showDropDown1}
                showDropDown={() => setShowDropDown1(true)}
                onDismiss={() => setShowDropDown1(false)}
                value={selectedTimeRange}
                setValue={setSelectedTimeRange}
                list={[
                    { label: 'This Week', value: 'thisWeek' },
                    { label: 'This Month', value: 'thisMonth' },
                    { label: 'This Year', value: 'thisYear' }
                ]}
                />
            </View>
        </View>
        {historyData.length > 0 ? (
        <View style={styles.line}>
            <Carousel
                data={historyData}
                renderItem={renderItem}
                sliderWidth={Dimensions.get("window").width}
                itemWidth={300}
                loop={false}
                autoplay={false}
                onSnapToItem={(index) => setActiveIndex(index)}
                snapToAlignment="start"
                snapToInterval={300}
            />
            <Pagination
                dotsLength={historyData.length}
                activeDotIndex={activeIndex}
                containerStyle={styles.paginationContainer}
                dotStyle={styles.paginationDot}
                inactiveDotStyle={styles.paginationDotInactive}
                inactiveDotOpacity={0.8}
                inactiveDotScale={1.0}
            />
        </View>
        ) : (
        <Text style={styles.EmptyInfoText}>No data available</Text>
        )}

        <View style={styles.header}>
            <Text style={styles.headerText}>Past Sales</Text>
            <View style={styles.dropdownContainer}>
                <Dropdown
                    label="Filter"
                    mode={"outlined"}
                    style={styles.dropdown}
                    visible={showDropDown2}
                    showDropDown={() => setShowDropDown2(true)}
                    onDismiss={() => setShowDropDown2(false)}
                    value={selectedTimeRange2}
                    setValue={setSelectedTimeRange2}
                    list={[
                    { label: 'This Week', value: 'thisWeek' },
                    // { label: 'This Month', value: 'thisMonth' },
                    { label: 'This Year', value: 'thisYear' }
                    ]}
                />
            </View>
        </View>
        {/* Conditional rendering of graph based on selectedTimeRange2 */}
        {selectedTimeRange2 === "thisWeek" && weeklyData.labels.length > 0 && (
        <View style={styles.graphContainer}>
            {/* Graph component code for weekly data */}
            {/* Example: <WeeklyGraph data={weeklyData} /> */}
            <WeeklyGraph data={weeklyData}></WeeklyGraph>
        </View>
        )}

        {selectedTimeRange2 === "thisYear" && yearlyData.labels.length > 0 && (
        <View style={styles.graphContainer}>
            {/* Graph component code for yearly data */}
            {/* Example: <YearlyGraph data={yearlyData} /> */}
            <YearlyGraph data={yearlyData}></YearlyGraph>
        </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal:10,
    justifyContent: "space-between", // Add this line
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
    textAlign: "left", // Add this line
  },
  dropdown: {
    height: 50,
    width: 150,
  },
  dropdownContainer:{
    justifyContent: "flex-end", // Add this line
  },
  carouselItem: {
    backgroundColor: "#ffffff",
    borderWidth:2,
    borderColor: theme.colors.primary,
    borderRadius: 10,
    padding: 20,
    width: 300,
    height: 200,
  },
  cardTitle: {
    //color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  cardText: {
    //color: "#fff",
    fontSize: 16,
  },
  paginationContainer: {
    //paddingTop: 10,
    //paddingBottom: 20,
    paddingVertical: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginHorizontal: 8,
  },
  paginationDotInactive: {
    backgroundColor: "white", // Inactive dots are white
  },
  profileContainer: {
    width:"40%",
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
    width:"50%",
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
    marginLeft: 5, // Add some space between the icon and text
  },
  averageRating: {
    marginRight: 5, // Add some space between the icon and text
  },
  graphContainer: {
    flex: 1,
    alignItems: "center",
    margin: 10,
  },
  offerContainer: {
    backgroundColor: "#fff",
    borderColor: "#f26f55",
    borderWidth: 2,
    margin: 16,
  },
  reviewContainer: {
    backgroundColor: "#fff",
    borderColor: "#f26f55",
    borderWidth: 2,
    margin: 16,
    padding: 8,
    borderRadius: 10,
  },
  contentContainer: {
    padding: 16,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  saleDateTime: {
    fontSize: 14,
    color: "grey",
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  price: {
    fontSize: 16,
    color: "green",
  },
  saleRating: {
    fontSize: 14,
    color: "grey",
  },
  noCommentText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "grey",
  },
  line:{
    flex:1,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  EmptyInfoText: {
    color: '#888', // Gray color for the text
    fontSize: 16,
    textAlign: 'center',
  },
});

export default ReviewComponent;
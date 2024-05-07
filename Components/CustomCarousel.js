import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";

const CustomCarousel = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Text style={styles.cardTitle}>{item.name}</Text>
      <Text style={styles.cardText}>Count: {item.count}</Text>
      <Text style={styles.cardText}>Average Score: {item.score.toFixed(2)}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get("window").width}
        itemWidth={300}
        loop={true}
        autoplay={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  carouselItem: {
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 20,
    width: 300,
    height: 200,
  },
  cardTitle: {
    color: "#fff5b8",
    fontSize: 20,
    marginBottom: 10,
  },
  cardText: {
    color: "white",
    fontSize: 16,
  },
});

export default CustomCarousel;
import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, ScrollView } from 'react-native';
import { Button, Title, Card } from 'react-native-paper';
import SaleItem from '../Components/SaleItem';

const HistoryScreen = () => {
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
    <ScrollView style={styles.container}>
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
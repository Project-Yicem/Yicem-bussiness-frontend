// OffersScreen.js
import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, ScrollView, View } from 'react-native';
import { Button, Card, Title, Paragraph, Modal, Portal, TextInput } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import OfferItem from "../Components/OfferItem"

export default function OffersScreen ({ navigation }) {

    const [dummyOffers, setDummyOffers] = useState([
        {
          id: '1',
          title: 'Pasty Box',
          description: 'Salted Bagel, Sandwich, Bread',
          price: '$5.99',
          itemsLeft: 5,
        },
        {
          id: '2',
          title: 'Cafe Out Exclusive Box',
          description: 'Specials',
          price: '$12.99',
          itemsLeft: 10,
        },
        {
          id: '3',
          title: 'Sweet Box',
          description: 'Donut, Cookie, Muffin',
          price: '$0.99',
          itemsLeft: 3,
        },
        // Add more dummy offers as needed
      ]);

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newPrice, setNewPrice] = useState(0);
    const [newTotalItems, setNewTotalItems] = useState(0);

    const [isModalVisible, setModalVisible] = useState(false);
    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);

    const handleEditPress = (offerId) => {
      // Implement navigation to the edit screen or any other logic
      console.log(`Edit pressed for offer with id: ${offerId}`);
    };
  
    const handleMarkSoldPress = (offerId) => {
      // Implement marking the offer as sold or any other logic
      console.log(`Mark as Sold pressed for offer with id: ${offerId}`);
    };

    const handleSaveChanges = () => {
        // Implement logic to save changes, update the data, etc.
        const newOffer = {
          id: (dummyOffers.length + 1).toString(),
          title: newTitle,
          description: newDescription,
          price: newPrice,
          itemsLeft: parseInt(newTotalItems) || 0,
        };
    
        console.log('Changes saved:', newOffer);
    
        // Update the state with the new offer
        setDummyOffers((prevOffers) => [...prevOffers, newOffer]);

        //Reset the offer variables
        setNewTitle("");
        setNewDescription("");
        setNewPrice(0);
        setNewTotalItems(0);
        // Close the modal
        hideModal();
    };
  
    return (
      <SafeAreaView>
        <ScrollView>
            {dummyOffers.map((item) => (
                <OfferItem
                key={item.id}
                title={item.title}
                description={item.description}
                price={item.price}
                itemsLeft={item.itemsLeft}
                totalItems={item.totalItems}
                onEditPress={() => handleEditPress(item.id)}
                onMarkSoldPress={() => handleMarkSoldPress(item.id)}
                />
            ))}
            <Button
            icon="plus"
            mode="contained"
            onPress={() => {
                // Implement navigation to the screen where you add a new offer
                console.log('Add Offer pressed');
                showModal();
            }}
            style={styles.button}
            >
            Add Offer
            </Button>
        </ScrollView>
            {/* Modal for Editing */}
            <Portal>
                <Modal visible={isModalVisible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
                    <TextInput
                    label="Title"
                    onChangeText={(text) => setNewTitle(text)}
                    mode="outlined"
                    style={styles.input}
                    />
                    <TextInput
                    label="Description"
                    onChangeText={(text) => setNewDescription(text)}
                    mode="outlined"
                    style={styles.input}
                    />
                    <TextInput
                    label="Price"
                    onChangeText={(text) => setNewPrice(text)}
                    mode="outlined"
                    style={styles.input}
                    />
                    <TextInput
                    label="Total Items"
                    onChangeText={(text) => setNewTotalItems(text)}
                    mode="outlined"
                    style={styles.input}
                    />
                    <Button onPress={handleSaveChanges} mode="contained" style={styles.button}>
                    Save
                    </Button>
                </Modal>
            </Portal>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  offerContainer: {
    margin: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 16,
  },
  button: {
    margin: 16,
    backgroundColor: "orange",
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    margin: 16,
    borderRadius: 8,
  },
});
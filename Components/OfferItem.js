//OfferItem.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
  Card,
  Title,
  Paragraph,
  IconButton,
  Modal,
  Portal,
  TextInput,
  Checkbox,
  Button,
  Snackbar,
} from "react-native-paper";
import Ionicons from "react-native-vector-icons/Ionicons";

//API
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { IP_ADDRESS } from "../Functions/GetIP";

export default function OfferItem({
  id,
  title,
  description,
  price,
  itemsLeft,
  totalItems,
  pickupTimes,
  onEditPress,
  reservations,
  onReservationsPress,
  refresh,
}) {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isReservationsModalVisible, setReservationsModalVisible] =
    useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedPrice, setEditedPrice] = useState(price);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const showEditModal = () => setEditModalVisible(true);
  const hideEditModal = () => setEditModalVisible(false);
  const showReservationsModal = () => setReservationsModalVisible(true);
  const hideReservationsModal = () => setReservationsModalVisible(false);

  // Separate state variables to hold edited values temporarily
  const [tempTitle, setTempTitle] = useState(title);
  const [tempDescription, setTempDescription] = useState(description);
  const [tempPrice, setTempPrice] = useState(price);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSaveChanges = async () => {
    // Implement logic to save changes, update the data, etc.
    console.log("Changes saved:", { tempTitle, tempDescription, tempPrice });

    if (!tempTitle || !tempDescription || !tempPrice) {
      setShowError(true);
      setErrorMessage("Please fill all the fields!");
      return;
    }
    if (
      tempTitle === editedTitle &&
      tempDescription === editedDescription &&
      tempPrice === editedPrice
    ) {
      setShowError(true);
      setErrorMessage("No change is made!");
      return;
    }

    // Update the main state with the edited values
    setEditedTitle(tempTitle);
    setEditedDescription(tempDescription);
    // Parse it to integer while passing edited price
    setEditedPrice(parseInt(tempPrice));

    handleAPIModify();
    // Close the modal

    // setTempTitle(title);
    // setTempDescription(description);
    // setTempPrice(price);
    hideEditModal();
  };

  const handleAPIModify = async () => {
    try {
      //setIsOffersLoading(true);
      const userToken = await SecureStore.getItemAsync("userToken");
      const userID = await SecureStore.getItemAsync("userID");
      const apiUrl = `http://${IP_ADDRESS}:8080/api/seller/${userID}/modifyOffer/${id}`;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios
        .post(
          apiUrl,
          {
            itemCount: itemsLeft,
            pickupTimes: pickupTimes,
            offerName: editedTitle,
            description: editedDescription,
            price: editedPrice,
            reserved: true,
          },
          config
        )
        .then((response) => {
          console.log("offer editing successful");
          console.log(response);

          hideEditModal();
          refresh();
        });
    } catch (error) {
      console.error("Error editing offer:", error);
      setErrorMessage("Error editing offer:", error);
      setShowError(true);
    }
  };

  const handleDelete = async () => {
    try {
      //setIsOffersLoading(true);
      const userToken = await SecureStore.getItemAsync("userToken");
      const userID = await SecureStore.getItemAsync("userID");
      console.log(userToken);
      console.log(userID);
      console.log(id);
      const apiUrl = `http://${IP_ADDRESS}:8080/api/seller/${userID}/modifyOffer/${id}/deleteOffer`;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      console.log(apiUrl);
      const response = await axios.delete(apiUrl, config).then((response) => {
        console.log("offer deleted successfully");

        setConfirmDeleteModal(false);
        hideEditModal();
        refresh();
      });
    } catch (error) {
      console.error("Error deleting offer:", error);
      setErrorMessage("Error deleting offer:", error);
      setShowError(true);
    }
  };

  const confirmDelivery = async (reservationID) => {
    try {
      //setIsOffersLoading(true);
      const userToken = await SecureStore.getItemAsync("userToken");
      const userID = await SecureStore.getItemAsync("userID");
      console.log(userToken);
      console.log(userID);
      console.log(id);
      console.log(reservationID);

      const apiUrl = `http://${IP_ADDRESS}:8080/api/seller/${userID}/markSold/${id}/${reservationID}`;
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      console.log(apiUrl);
      const response = await axios.post(apiUrl, {}, config).then((response) => {
        console.log("Reservation delivered successfully");

        //setConfirmDeleteModal(false);
        //hideEditModal();
        hideReservationsModal();
        refresh();
      });
    } catch (error) {
      console.error("Error delivering reservation:", error);
      setErrorMessage("Error delivering reservation:", error);
      setShowError(true);
    }
  };

  const handleDismiss = () => {
    // Reset temp values
    setTempTitle(editedTitle);
    setTempDescription(editedDescription);
    setTempPrice(editedPrice);

    // Close the modal
    hideEditModal();
  };

  return (
    <Card style={styles.offerContainer}>
      <Card.Content style={styles.contentContainer}>
        {/* Title and Edit Icon */}
        <View style={styles.titleContainer}>
          <Title style={styles.title}>{editedTitle}</Title>
          <TouchableOpacity onPress={showEditModal}>
            <IconButton icon="pencil" size={20} />
          </TouchableOpacity>
        </View>
        {/* Description */}
        <Paragraph style={styles.description}>{editedDescription}</Paragraph>
        {/* Pickup Times */}
        <Text style={{ color: "gray", fontStyle: "italic" }}>
          Pickup Times:
        </Text>
        <Paragraph
          style={{ color: "gray", fontStyle: "italic", marginBottom: 10 }}
        >
          {pickupTimes &&
            pickupTimes.map(
              (time) => `${time.pickupTimeStart} - ${time.pickupTimeEnd}, `
            )}
        </Paragraph>
        {/* Price, Reservations button, Items Left */}
        <View style={styles.bottomContainer}>
          <Text style={styles.price}>₺{editedPrice}</Text>
          <TouchableOpacity onPress={onReservationsPress}>
            <Button onPress={showReservationsModal}>Reservations</Button>
          </TouchableOpacity>
          <Text style={styles.itemsLeft}>{`${itemsLeft} items left`}</Text>
        </View>
        {/* Modal for Editing */}
        <Portal>
          <Modal
            visible={isEditModalVisible}
            onDismiss={handleDismiss}
            contentContainerStyle={styles.modalContainer}
          >
            <TextInput
              label="Edit Title"
              value={tempTitle}
              onChangeText={(text) => setTempTitle(text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Edit Description"
              value={tempDescription}
              onChangeText={(text) => setTempDescription(text)}
              mode="outlined"
              style={styles.input}
            />
            <TextInput
              label="Edit Price"
              value={tempPrice.toString()}
              onChangeText={(text) => setTempPrice(text)}
              mode="outlined"
              keyboardType="numeric" // Opens a numerical keyboard
              style={styles.input}
            />
            <Button onPress={handleSaveChanges} mode="contained">
              Save
            </Button>
            <Button
              onPress={() => {
                setConfirmDeleteModal(true);
              }}
              mode="outlined"
              style={{ marginTop: 10 }}
              icon={() => (
                <Ionicons name="trash" size={24} color={"darkorange"} />
              )}
            >
              Delete Offer
            </Button>
          </Modal>
          {/* Modal for Confirming Delete*/}
          <Modal
            visible={confirmDeleteModal}
            onDismiss={() => setConfirmDeleteModal(false)}
            contentContainerStyle={styles.modalContainer}
          >
            <Text>Are you sure you want to delete this offer?</Text>
            <Button
              onPress={() => {
                console.log("Offer deleted");
                handleDelete();
                setConfirmDeleteModal(false);
              }}
              mode="contained"
              buttonColor="red"
              style={{ marginTop: 20 }}
              icon={() => <Ionicons name="trash" size={24} color="white" />}
            >
              Confirm
            </Button>
            <Button
              onPress={() => setConfirmDeleteModal(false)}
              mode="outlined"
              style={{ marginTop: 10 }}
            >
              Cancel
            </Button>
          </Modal>
          {/* Modal for Reservations */}
          <Modal
            visible={isReservationsModalVisible}
            onDismiss={hideReservationsModal}
            contentContainerStyle={styles.modalContainer}
          >
            <Title style={styles.modalTitle}>Reservations</Title>
            {reservations && reservations.length === 0 && (
              <Text>No reservations yet.</Text>
            )}
            {reservations.map((reservation) => (
              <View key={reservation.id} style={styles.reservationContainer}>
                <View style={styles.reservationInfo}>
                  <Text>{reservation.buyerName}</Text>
                  <Text>{reservation.timeslot}</Text>
                </View>
                <IconButton
                  icon="check"
                  color="green"
                  size={24}
                  onPress={() => {
                    confirmDelivery(reservation.id);
                  }}
                />
                {/* <Checkbox
                  status={reservation.isSold ? "checked" : "unchecked"}
                  onValueChange={() => {
                    // Implement logic to toggle the isSold status of the reservation
                  }}
                /> */}
              </View>
            ))}
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
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  offerContainer: {
    margin: 16,
    backgroundColor: "#fff",
    borderColor: "#f26f55",
    borderWidth: 2,
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
  description: {
    marginBottom: 8,
  },
  bottomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontSize: 16,
  },
  markAsSoldButton: {
    backgroundColor: "#f26f55",
    fontSize: 16,
    color: "#ffffff",
  },
  itemsLeft: {
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    margin: 16,
    borderRadius: 8,
  },
  input: {
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 10,
  },
  reservationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 5,
  },
  reservationInfo: {
    flex: 1,
    marginRight: 8,
  },
});

// // OfferItem.js
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Card, Title, Paragraph, IconButton, TextInput, Button } from 'react-native-paper';
// //import EditOfferScreen from './EditOfferScreen';

// const OfferItem = ({ id, title, description, price, itemsLeft, totalItems, onEditPress, onMarkSoldPress }) => {
//   const [editing, setEditing] = useState(false);
//   const [editedTitle, setEditedTitle] = useState(title);
//   const [editedDescription, setEditedDescription] = useState(description);
//   const [editedPrice, setEditedPrice] = useState(price);
//   const [editedItemsLeft, setEditedItemsLeft] = useState(itemsLeft);

//   const handleEditPress = () => {
//     setEditing(true);
//   };

//   const handleSaveChanges = () => {
//     // Implement logic to save changes, update the data, etc.
//     console.log('Changes saved:', { editedTitle, editedDescription, editedPrice, editedItemsLeft });
//     setEditing(false);
//   };

//   const handleCancelEdit = () => {
//     // Implement logic to cancel editing
//     setEditing(false);
//   };

//   return (
//     <Card style={styles.offerContainer}>
//       <Card.Content style={styles.contentContainer}>
//         {/* Title and Edit Icon */}
//         <View style={styles.titleContainer}>
//           <Title style={styles.title}>{editedTitle}</Title>
//           {!editing && (
//             <TouchableOpacity onPress={handleEditPress}>
//               <IconButton icon="pencil" size={20} />
//             </TouchableOpacity>
//           )}
//         </View>

//         {/* Description */}
//         {!editing ? (
//           <Paragraph style={styles.description}>{editedDescription}</Paragraph>
//         ) : (
//           <TextInput
//             label="Description"
//             value={editedDescription}
//             onChangeText={(text) => setEditedDescription(text)}
//             mode="outlined"
//             style={styles.input}
//           />
//         )}

//         {/* Price, Mark as Sold Button, Items Left */}
//         <View style={styles.bottomContainer}>
//           {!editing ? (
//             <>
//               <Text style={styles.price}>{editedPrice}</Text>
//               <TouchableOpacity onPress={onMarkSoldPress}>
//                 <Text style={styles.markAsSoldButton}>Mark as Sold</Text>
//               </TouchableOpacity>
//               <Text style={styles.itemsLeft}>{`${editedItemsLeft}/${totalItems}`}</Text>
//             </>
//           ) : (
//             <>
//               <TextInput
//                 label="Price"
//                 value={editedPrice}
//                 onChangeText={(text) => setEditedPrice(text)}
//                 mode="outlined"
//                 style={styles.input}
//               />
//               <Button onPress={handleSaveChanges} style={styles.saveButton}>
//                 Save
//               </Button>
//               <Button onPress={handleCancelEdit} style={styles.cancelButton}>
//                 Cancel
//               </Button>
//             </>
//           )}
//         </View>
//       </Card.Content>
//     </Card>
//   );
// };

// const styles = StyleSheet.create({
//   offerContainer: {
//     margin: 16,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     padding: 16,
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   description: {
//     marginBottom: 8,
//   },
//   input: {
//     marginBottom: 8,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   price: {
//     fontSize: 16,
//   },
//   markAsSoldButton: {
//     color: '#f26f55',
//     textDecorationLine: 'underline',
//     fontSize: 16,
//   },
//   itemsLeft: {
//     fontSize: 16,
//   },
//   saveButton: {
//     backgroundColor: '#f26f55',
//     marginTop: 8,
//   },
//   cancelButton: {
//     marginTop: 8,
//   },
// });

// export default OfferItem;

// OfferItem.js
// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { Card, Title, Paragraph, IconButton } from 'react-native-paper';

// export default function OfferItem ({ title, description, price, itemsLeft, totalItems, onEditPress, onMarkSoldPress }) {
//   return (
//     <Card style={styles.offerContainer}>
//       <Card.Content style={styles.contentContainer}>
//         {/* Title and Edit Icon */}
//         <View style={styles.titleContainer}>
//           <Title style={styles.title}>{title}</Title>
//           <TouchableOpacity onPress={onEditPress}>
//             <IconButton icon="pencil" size={20} onPress={onEditPress} />
//           </TouchableOpacity>
//         </View>

//         {/* Description */}
//         <Paragraph style={styles.description}>{description}</Paragraph>

//         {/* Price, Mark as Sold Button, Items Left */}
//         <View style={styles.bottomContainer}>
//           <Text style={styles.price}>{price}</Text>
//           <TouchableOpacity onPress={onMarkSoldPress}>
//             <Text style={styles.markAsSoldButton}>Mark as Sold</Text>
//           </TouchableOpacity>
//           <Text style={styles.itemsLeft}>{`${itemsLeft}/${totalItems}`}</Text>
//         </View>
//       </Card.Content>
//     </Card>
//   );
// };

// const styles = StyleSheet.create({
//   offerContainer: {
//     margin: 16,
//     backgroundColor: '#fff',
//   },
//   contentContainer: {
//     padding: 16,
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   description: {
//     marginBottom: 8,
//   },
//   bottomContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//   },
//   price: {
//     fontSize: 16,
//   },
//   markAsSoldButton: {
//     color: '#f26f55',
//     textDecorationLine: 'underline',
//     fontSize: 16,
//   },
//   itemsLeft: {
//     fontSize: 16,
//   },
// });

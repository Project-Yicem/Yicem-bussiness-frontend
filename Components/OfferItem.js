import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, IconButton, Modal, Portal, TextInput, Button } from 'react-native-paper';

export default function OfferItem({ title, description, price, itemsLeft, totalItems, onEditPress, onMarkSoldPress }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedPrice, setEditedPrice] = useState(price);
  
  const showModal = () => setModalVisible(true);
  const hideModal = () => setModalVisible(false);

  // Separate state variables to hold edited values temporarily
  const [tempTitle, setTempTitle] = useState(title);
  const [tempDescription, setTempDescription] = useState(description);
  const [tempPrice, setTempPrice] = useState(price);

  const handleSaveChanges = () => {
    // Implement logic to save changes, update the data, etc.
    console.log('Changes saved:', { tempTitle, tempDescription, tempPrice });

    // Update the main state with the edited values
    setEditedTitle(tempTitle);
    setEditedDescription(tempDescription);
    setEditedPrice(tempPrice);

    // Close the modal
    hideModal();
  };

  const handleDismiss = () => {

    // Reset temp values
    setTempTitle(editedTitle);
    setTempDescription(editedDescription);
    setTempPrice(editedPrice);

    // Close the modal
    hideModal();
  };

  return (
    <Card style={styles.offerContainer}>
      <Card.Content style={styles.contentContainer}>
        {/* Title and Edit Icon */}
        <View style={styles.titleContainer}>
          <Title style={styles.title}>{editedTitle}</Title>
          <TouchableOpacity onPress={showModal}>
            <IconButton icon="pencil" size={20} />
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Paragraph style={styles.description}>{editedDescription}</Paragraph>

        {/* Price, Mark as Sold Button, Items Left */}
        <View style={styles.bottomContainer}>
          <Text style={styles.price}>{editedPrice}</Text>
          <TouchableOpacity onPress={onMarkSoldPress}>
            <Text style={styles.markAsSoldButton}>Mark as Sold</Text>
          </TouchableOpacity>
          <Text style={styles.itemsLeft}>{`${itemsLeft}/${totalItems}`}</Text>
        </View>

        {/* Modal for Editing */}
        <Portal>
          <Modal visible={isModalVisible} onDismiss={handleDismiss} contentContainerStyle={styles.modalContainer}>
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
              value={tempPrice}
              onChangeText={(text) => setTempPrice(text)}
              mode="outlined"
              style={styles.input}
            />
            <Button onPress={handleSaveChanges} mode="contained" >
              Save
            </Button>
          </Modal>
        </Portal>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  offerContainer: {
    margin: 16,
    backgroundColor: '#fff',
    borderColor: '#f26f55',
    borderRadius: 2,
  },
  contentContainer: {
    padding: 16,
    borderColor: "orange",
    borderRadius: 2,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    marginBottom: 8,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
  },
  markAsSoldButton: {
    backgroundColor: '#f26f55',
    fontSize: 16,
    color: "#ffffff",
  },
  itemsLeft: {
    fontSize: 16,
  },
  modalContainer: {
    backgroundColor: 'white',
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
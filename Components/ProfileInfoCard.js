import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { IconButton, Button } from "react-native-paper";

const ProfileInfoCard = ({
  title,
  info,
  isProfilePicture,
  onEditSave,
  isTimeRange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(info);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = () => {
    onEditSave(title, editedInfo);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        {isProfilePicture ? (
          <View style={styles.profilePictureContainer}>
            <Image source={info} style={styles.profilePicture} />
          </View>
        ) : isTimeRange ? (
          <View style={styles.editableText}>
            <Text>Opening Time</Text>
            <TextInput
              value={editedInfo.openingTime}
              onChangeText={(text) =>
                setEditedInfo({ ...editedInfo, openingTime: text })
              }
              editable={isEditing}
              style={styles.editableText}
            />
            <Text>Closing Time</Text>
            <TextInput
              value={editedInfo.closingTime}
              onChangeText={(text) =>
                setEditedInfo({ ...editedInfo, closingTime: text })
              }
              editable={isEditing}
              style={styles.editableText}
            />
          </View>
        ) : (
          <TextInput
            value={editedInfo}
            onChangeText={setEditedInfo}
            editable={isEditing}
            style={styles.editableText}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        {!isProfilePicture && (
          <IconButton
            icon="pencil"
            size={24}
            color="#000000"
            style={styles.editIcon}
            onPress={handleEditPress}
          />
        )}
        {isEditing && (
          <Button
            mode="contained"
            onPress={handleSavePress}
            style={styles.saveButton}
          >
            Save
          </Button>
        )}
      </View>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  editableText: {
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  profilePictureContainer: {
    marginTop: 8,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  editIcon: {
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  saveButton: {
    marginLeft: 8,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
});

export default ProfileInfoCard;

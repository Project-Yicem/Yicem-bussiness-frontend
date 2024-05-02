import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { IconButton, Button } from "react-native-paper";


const ProfileInfoCard = ({
  title,
  info,
  isProfilePicture,
  onEditSave,
  isTimeRange,
  isPassword,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState(info);

  useEffect(() => {
    setEditedInfo(info);
  },[info])

  useEffect(() => {
    setEditedInfo(info);
  },[])

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = async () => {
    if(await onEditSave(editedInfo)){
      setIsEditing(false);
    }
    return;
  };

  const handleCancelPress = () => {
    setEditedInfo(info);
    setIsEditing(false);
  }
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
        ) : isPassword ? ( isEditing ?
          <View style={styles.editableText}>
            <Text>Confirm old Password</Text>
            <TextInput
              value={editedInfo.oldPassword}
              onChangeText={(text) =>
                setEditedInfo({ ...editedInfo, oldPassword: text })
              }
              secureTextEntry
              editable={isEditing}
              style={styles.editableText}
            />
            <Text>New Password</Text>
            <TextInput
              value={editedInfo.newPassword}
              onChangeText={(text) =>
                setEditedInfo({ ...editedInfo, newPassword: text })
              }
              secureTextEntry
              editable={isEditing}
              style={styles.editableText}
            />
          </View> 
          : 
          <View></View>
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
        {!isProfilePicture && !isEditing &&(
          <IconButton
            icon="pencil"
            size={24}
            color="#000000"
            style={styles.editIcon}
            onPress={handleEditPress}
          />
        )}
         {!isProfilePicture && isEditing && (
          <IconButton
            icon="close"
            size={24}
            color="#ff0000"
            style={styles.editIcon}
            onPress={handleCancelPress}
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

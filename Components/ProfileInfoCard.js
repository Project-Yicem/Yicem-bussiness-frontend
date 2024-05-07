import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput } from "react-native";
import { IconButton, Button } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';

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

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [focusedInput, setFocusedInput] = useState("");

  const onDateTimeChange = (event, selectedDate) => {
    if (event.type === "dismissed") {
      // User dismissed the picker, handle cancel action here
      setShowTimePicker(false);
      return;
    }

    const currentTime = selectedDate || new Date();
    setShowTimePicker(false);

    setSelectedDate(currentTime);
    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    // Check if startTime or endTime input is focused and update accordingly
    if (focusedInput === "startTime") {
      setEditedInfo({...editedInfo, openingTime: formattedTime});
    } else if (focusedInput === "closeTime") {
      setEditedInfo({...editedInfo, closingTime: formattedTime});
    }
  };

  const onDateTimeFocus = (input) => {
    setShowTimePicker(true);
    setFocusedInput(input);
  };

  useEffect(() => {
    setEditedInfo(info);
  }, [info]);

  useEffect(() => {
    setEditedInfo(info);
  }, []);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSavePress = async () => {
    if (await onEditSave(editedInfo)) {
      setIsEditing(false);
    }
    return;
  };

  const handleCancelPress = () => {
    setEditedInfo(info);
    setIsEditing(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        {isProfilePicture ? (
          <View style={styles.profilePictureContainer}>
            {info ? (
              <Image source={{ uri: info }} style={styles.profilePicture} />
            ) : (
              <Image
                source={require("../assets/splash.png")}
                style={styles.profilePicture}
              />
            )}
          </View>
        ) : isTimeRange ? (
          <View style={styles.editableText}>
            <Text>Opening Time</Text>
            <TextInput
              value={editedInfo.openingTime}
              onFocus={() => onDateTimeFocus("startTime")}
              editable={isEditing}
              style={styles.editableText}
            />
            <Text>Closing Time</Text>
            <TextInput
              value={editedInfo.closingTime}
              onFocus={() => onDateTimeFocus("closeTime")}
              editable={isEditing}
              style={styles.editableText}
            />
            {showTimePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={selectedDate}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onDateTimeChange}
              />
            )}
          </View>
        ) : isPassword ? (
          isEditing ? (
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
          ) : (
            <View></View>
          )
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
        {!isProfilePicture && !isEditing && (
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
    width: 100,
    height: 100,
    borderRadius: 8,
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

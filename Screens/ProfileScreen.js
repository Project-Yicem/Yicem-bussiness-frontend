// ProfileScreen.js
import React from 'react';
import { View, Image, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Button } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileInfoCard from '../Components/ProfileInfoCard';

const ProfileScreen = () => {
  // Mock business information
  const businessInfo = {
    name: 'Your Business Name',
    email: 'business@example.com',
    password: '********', // Masked password
    phoneNumber: '+1234567890',
    address: '123 Business Street, City, Country',
    // You can replace the image source with the actual path or URL of the profile picture
    profilePicture: require('../assets/businesslogos/logo_bakery.png'),
  };

  const handleEditSave = (field, editedInfo) => {
    // Handle saving the edited information
    console.log(`Edit ${field}: ${editedInfo}`);
    // You can add logic to save the edited information to your data source
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView>
        <View style={styles.profileContainer}>
          <ProfileInfoCard
            title="Business Name"
            info={businessInfo.name}
            isEditable={true}
            onEditSave={handleEditSave}
          />
          <ProfileInfoCard
            title="Email"
            info={businessInfo.email}
            isEditable={true}
            onEditSave={handleEditSave}
          />
          <ProfileInfoCard
            title="Password"
            info={businessInfo.password}
            isEditable={true}
            onEditSave={handleEditSave}
          />
          <ProfileInfoCard
            title="Phone Number"
            info={businessInfo.phoneNumber}
            isEditable={true}
            onEditSave={handleEditSave}
          />
          <ProfileInfoCard
            title="Address"
            info={businessInfo.address}
            isEditable={true}
            onEditSave={handleEditSave}
          />
          <ProfileInfoCard
            title="Profile Picture"
            isProfilePicture={true}
            info={businessInfo.profilePicture}
            isEditable={true}
            onEditSave={handleEditSave}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    padding: 16,
    margin: 16,
    borderWidth: 2,
    borderColor: '#f26f55',
    borderRadius: 10,
    backgroundColor: "#ffffff",
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 16,
  },
  editButton: {
    marginTop: 16,
  },
});

export default ProfileScreen;
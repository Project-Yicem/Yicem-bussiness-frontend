import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles, { theme } from './Styles/styles';

import OfferScreen from './Screens/OfferScreen';
import HistoryScreen from './Screens/HistoryScreen';
import ProfileScreen from './Screens/ProfileScreen';
import AnayticsScreen from './Screens/AnalyticsScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Offers') {
        iconName = focused ? 'cafe' : 'cafe-outline';
      } else if (route.name === 'History') {
        iconName = focused ? 'time' : 'time-outline';
      } else if (route.name === 'Profile') {
        iconName = focused ? 'person' : 'person-outline';
      } else if (route.name === 'Analytics') {
        iconName = focused ? 'analytics' : 'analytics-outline';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: "white", // Use the primary color from the theme
    tabBarInactiveTintColor: 'white',
    tabBarStyle: {
      backgroundColor: "#01857A",//theme.colors.primary, // Set the background color of the bottom tab
    },
    tabBarLabelStyle: {
      color: 'white', // Set the label color
    },
    headerStyle: {
      backgroundColor: theme.colors.primary, // Set the background color of the header
    },
    headerTitleAlign: 'center', // Center align the header title
    headerTintColor: "white", // Use the primary color from the theme for the header text
  })}
  >
    <Tab.Screen name="Offers" component={OfferScreen} />
    <Tab.Screen name="History" component={HistoryScreen} />
    <Tab.Screen name="Profile" component={ProfileScreen} />
    <Tab.Screen name="Analytics" component={AnayticsScreen} />
  </Tab.Navigator>
);

export default MainTabs;
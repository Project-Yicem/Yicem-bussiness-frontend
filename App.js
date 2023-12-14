import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

// Import your screens
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import WaitingScreen from './Screens/WaitingScreen';
import OffersScreen from './Screens/OfferScreen';
import HistoryScreen from './Screens/HistoryScreen';
import ProfileScreen from './Screens/ProfileScreen';
import MainTabs from './MainTabs';

import styles, { theme } from './Styles/styles';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// const MainTabs = () => (
//   <Tab.Navigator>
//     <Tab.Screen name="Offers" component={OffersScreen} />
//     <Tab.Screen name="History" component={HistoryScreen} />
//     <Tab.Screen name="Profile" component={ProfileScreen} />
//   </Tab.Navigator>
// );

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Waiting" component={WaitingScreen} />
          <Stack.Screen name="MainHome" component={MainTabs} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}



// import React from 'react';
// import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import LoginScreen from './Screens/LoginScreen';
// import RegisterScreen from './Screens/RegisterScreen';
// import WaitingScreen from './Screens/WaitingScreen';
// import OffersScreen from './Screens/OfferScreen';
// import HistoryScreen from './Screens/HistoryScreen';
// import ProfileScreen from './Screens/ProfileScreen';
// import styles, { theme } from './Styles/styles';

// const Tab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <PaperProvider theme={theme}>
//       <NavigationContainer>
//         <Tab.Navigator
//           initialRouteName="Waiting"
//           screenOptions={({ route }) => ({
//             tabBarIcon: ({ focused, color, size }) => {
//               let iconName;
//               let rn = route.name;

//               if (rn === 'Offers') {
//                 iconName = focused ? 'home' : 'home-outline';
//               } else if (rn === 'History') {
//                 iconName = focused ? 'list' : 'list-outline';
//               } else if (rn === 'Profile') {
//                 iconName = focused ? 'settings' : 'settings-outline';
//               }

//               // You can return any component that you like here!
//               return <Ionicons name={iconName} size={size} color={color} />;
//             },
//           })}
//           tabBarOptions={{
//             activeTintColor: 'tomato',
//             inactiveTintColor: 'grey',
//             labelStyle: { paddingBottom: 10, fontSize: 10 },
//             style: { padding: 10, height: 70 },
//           }}
//         >
//           <Tab.Screen name="Waiting" component={WaitingScreen} />
//           <Tab.Screen name="Offers" component={OffersScreen} />
//           <Tab.Screen name="History" component={HistoryScreen} />
//           <Tab.Screen name="Profile" component={ProfileScreen} />
//         </Tab.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }


// import React from 'react';
// import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import LoginScreen from './Screens/LoginScreen';
// import RegisterScreen from './Screens/RegisterScreen';
// import WaitingScreen from './Screens/WaitingScreen';
// import MainTabs from './MainTabs'; // Import the MainTabs component
// import styles, { theme } from './Styles/styles';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <PaperProvider theme={theme}>
//       <NavigationContainer>
//         <Stack.Navigator
//           screenOptions={{
//             headerShown: false,
//           }}
//         >
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Register" component={RegisterScreen} />
//           <Stack.Screen name="Waiting" component={WaitingScreen} />
//           <Stack.Screen name="MainTabs" component={MainTabs} /> {/* Use MainTabs as a screen */}
//         </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }



// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// import LoginScreen from './Screens/LoginScreen';
// import RegisterScreen from './Screens/RegisterScreen';
// import WaitingScreen from './Screens/WaitingScreen';
// import OffersScreen from './Screens/OfferScreen';
// import HistoryScreen from './Screens/HistoryScreen';
// import ProfileScreen from "./Screens/ProfileScreen";

// import styles, { theme } from './Styles/styles';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <PaperProvider theme={theme}>
//       <NavigationContainer>
//         <Stack.Navigator
//         screenOptions={{
//           headerShown: false
//         }}
//         >
//           <Stack.Screen name="Login" component={LoginScreen} />
//           <Stack.Screen name="Register" component={RegisterScreen} />
//           <Stack.Screen name="Waiting" component={WaitingScreen} />
//           <Stack.Screen name="Offer" component={OffersScreen} />
//           <Stack.Screen name="History" component={HistoryScreen} />
//           <Stack.Screen name="Profile" component={ProfileScreen} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </PaperProvider>
//   );
// }
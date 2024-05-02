import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#f26f55", //warm color
    accent: '#fdbcb4',  //warm color
  },
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.accent,
    },
    input: {
      marginBottom: 16,
      width: '80%', 
    },
    button: {
      marginBottom: 16,
      width: '80%', 
      backgroundColor: theme.colors.primary,
    },
    hollowButton: {
      marginBottom: 16,
      marginTop: 16,
      width: '80%', 
      borderWidth: 2,  // Set the border width
      borderColor: theme.colors.primary,  // Set the border color
      backgroundColor: 'transparent',  // Make the inner part transparent
      paddingVertical: 8,  // Adjust padding as needed
      paddingHorizontal: 16,  // Adjust padding as needed
      borderRadius: 8,  // Set border radius as needed
      
    },
    image: {
      width: 300,
      height: 200,
      resizeMode: 'contain',
    },
    signupText: {
      textAlign: 'center',
      color: theme.colors.primary,
      fontSize: 16,
    },
    text: {
      textAlign: 'center',
      width: '80%',
      color: "black",
      fontSize: 16,
    },
    searchBar: {
      margin: 16,
      //marginTop: 40,
      backgroundColor: "#ffffff",
      borderWidth: 1,
      borderColor: "#000000" // Change the color as needed
    },
    timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  });

  export default styles;
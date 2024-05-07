import { StyleSheet } from "react-native";
import { DefaultTheme } from "react-native-paper";

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: "#f26f55", //warm color
    accent: "#fdbcb4", //warm color
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  input: {
    marginBottom: 16,
    width: "80%",
  },
  timeContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  phoneContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "80%",
    marginBottom: 20,
  },
  timeInput: {
    flex: 1,
    marginBottom: 16,
  },
  button: {
    marginBottom: 16,
    width: "80%",
    backgroundColor: theme.colors.primary,
  },
  hollowButton: {
    marginBottom: 16,
    marginTop: 16,
    width: "80%",
    borderWidth: 2, // Set the border width
    borderColor: theme.colors.primary, // Set the border color
    backgroundColor: "transparent", // Make the inner part transparent
    paddingVertical: 8, // Adjust padding as needed
    paddingHorizontal: 16, // Adjust padding as needed
    borderRadius: 8, // Set border radius as needed
  },
  image: {
    width: 300,
    height: 200,
    resizeMode: "contain",
  },
  signupText: {
    textAlign: "center",
    color: theme.colors.primary,
    fontSize: 16,
  },
  text: {
    textAlign: "center",
    width: "80%",
    color: "black",
    fontSize: 16,
  },
  searchBar: {
    margin: 16,
    //marginTop: 40,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#000000", // Change the color as needed
  },
  // timeContainer: {
  //   flexDirection: "row",
  //   //justifyContent: "space-between",
  //   alignItems: "center",
  //   width:"%80",
  //   marginBottom: 20,
  // },
  separator: {
    fontSize: 20,
    marginHorizontal: 5,
  },

  //carousel
  carouselItem: {
    backgroundColor: theme.colors.primary,
    borderRadius: 10,
    padding: 20,
    width: 300,
    height: 200,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    marginBottom: 10,
  },
  cardText: {
    color: "#fff",
    fontSize: 16,
  },
  paginationContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary, // Using theme.primary for active dot color
    marginHorizontal: 8,
  },
  paginationDotInactive: {
    backgroundColor: "white", // Inactive dots are white
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10, // Adjust left margin for spacing
  },
  dropdownContainer: {
    flex: 1, // Make Dropdown fill available space
    marginRight: 10, // Adjust right margin for spacing
  },
  dropdown: {
    width: "100%", // Make Dropdown fill its container
  },

  centeredText:{
    color: '#888', // Gray color for the text
    fontSize: 16,
    textAlign: 'center',
    marginRight: 10,
  }
});

export default styles;

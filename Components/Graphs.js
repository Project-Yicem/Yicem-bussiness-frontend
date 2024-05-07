import React from 'react';
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { BarChart } from 'react-native-chart-kit';
import { theme } from '../Styles/styles';
import { Card } from 'react-native-paper';

// Component for weekly bar chart
const WeeklyGraph = ({ data }) => {
    const ProcessedData = {
        labels: data.labels,
        datasets: [
          {
            data: data.data,
          },
        ],
      }
  return (
    <Card style={styles.graphContainer}>
            <Card.Content>
                <BarChart
                    style={styles.graphStyle}
                    showBarTops={false}
                    withInnerLines={true}
                    data={ProcessedData}
                    width={Dimensions.get('window').width - 60} // Adjust the width to create a gap at the end
                    height={220}
                    yAxisLabel="Sold "
                    yAxisSuffix=''
                    chartConfig={chartConfig}
                    verticalLabelRotation={0}
                />
            </Card.Content>
        </Card>
  );
};

// Component for yearly bar chart
const YearlyGraph = ({ data }) => {
    const ProcessedData = {
        labels: data.labels,
        datasets: [
          {
            data: data.data,
          },
        ],
    };

    // const aspectRatio = 0.5;
    return (
        <Card style={styles.graphContainer}>
            <Card.Content>
                <BarChart
                    style={styles.graphStyle}
                    showBarTops={false}
                    withInnerLines={true}
                    data={ProcessedData}
                    width={Dimensions.get('window').width - 60} // Adjust the width to create a gap at the end
                    height={220}
                    yAxisLabel="Sold "
                    yAxisSuffix=''
                    chartConfig={chartConfig}
                    verticalLabelRotation={0}
                />
            </Card.Content>
        </Card>
    );
};

const chartConfig = {
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    barPercentage: 0.3,
    height: 5000,
    fillShadowGradient: `rgba(255, 122, 0, 1)`,
    fillShadowGradientOpacity: 1,
    decimalPlaces: 0, // optional, defaults to 2dp
    color: (opacity = 1) => `rgba(255, 152, 0, ${opacity})`, // Change the color to orange
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    marginLeft: -60, // Adjust this value to reduce the spacing on the left side
    propsForVerticalLabels:{
        marginLeft:0,
    }
};

const styles = StyleSheet.create({
    graphContainer: {
        borderWidth: 2,
        borderColor: theme.colors.primary,
        backgroundColor:"#ffffff",
        borderRadius: 10, // Adjust the value to control the roundness
        padding:0,
        margin:0,
    },
    graphStyle: {
        flex: 1,
        //alignItems: "center",
        //justifyContent: "center",
    },
});

export { WeeklyGraph, YearlyGraph };


// import React from 'react';
// import { View, Text, StyleSheet, Dimensions } from "react-native";
// import { BarChart } from 'react-native-chart-kit';

// // Component for weekly bar chart
// const WeeklyGraph = ({ data }) => {
//   return (
//     <View>
//       <BarChart
//         data={{
//           labels: data.labels,
//           datasets: [
//             {
//               data: data.data,
//             },
//           ],
//         }}
//         width={Dimensions.get('window').width - 20}
//         height={220}
//         yAxisSuffix=""
//         chartConfig={{
//           backgroundColor: '#FFCC80',
//           backgroundGradientFrom: '#FFCC80',
//           backgroundGradientTo: '#FF6F00',
//           decimalPlaces: 0, // optional, defaults to 2dp
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//           propsForDots: {
//             r: '6',
//             strokeWidth: '2',
//             stroke: '#ffa726',
//           },
//         }}
//         verticalLabelRotation={30}
//       />
//     </View>
//   );
// };

// // Component for yearly bar chart
// const YearlyGraph = ({ data }) => {
//   return (
//     <View>
//       <BarChart
//         data={{
//           labels: data.labels,
//           datasets: [
//             {
//               data: data.data,
//             },
//           ],
//         }}
//         width={Dimensions.get('window').width - 20}
//         height={220}
//         yAxisSuffix=""
//         chartConfig={{
//           backgroundColor: '#ffffff',
//           color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
//           style: {
//             borderRadius: 16,
//           },
//           propsForDots: {
//             r: '6',
//             strokeWidth: '2',
//             stroke: '#ffa726',
//           },
//         }}
//         verticalLabelRotation={30}
//       />
//     </View>
//   );
// };

// const chartConfig = {
//     backgroundGradientFrom: "#1E2923",
//     backgroundGradientFromOpacity: 0,
//     backgroundGradientTo: "#08130D",
//     backgroundGradientToOpacity: 0.5,
//     color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//     strokeWidth: 2, // optional, default 3
//     barPercentage: 0.5,
//     useShadowColorFromDataset: false // optional
//   };

// export { WeeklyGraph, YearlyGraph };


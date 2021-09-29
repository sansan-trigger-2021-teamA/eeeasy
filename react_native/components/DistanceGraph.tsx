import React from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";

import { LineChart } from "react-native-chart-kit";

const windowWidth = Dimensions.get("window").width;

const data = {
  labels: ["7月", "8月", "9月", "10月"],
  datasets: [
    {
      data: [210, 123, 176, 290],
      color: (opacity = 1) => "#e34a6f",
    },
  ],
};

const chartConfig = {
  backgroundColor: "white",
  backgroundGradientFrom: "#fff",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "black",
  backgroundGradientToOpacity: 0,
  decimalPlaces: 0,
  color: (opacity = 1) => "black",
};

export const DistanceGraph = () => {
  return (
    <View style={styles.container}>
      <LineChart
        data={data}
        chartConfig={chartConfig}
        width={windowWidth * 0.75}
        height={170}
        fromZero={true}
        withInnerLines={false}
        bezier
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
});

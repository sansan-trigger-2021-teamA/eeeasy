import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import Constants from "expo-constants";
import { ToggleComponent } from "../components/ToggleComponent";

export const TransmissionInformationSetting = () => {
  return (
    <View style={styles.container}>
      <View style={{ width: "70%" }}>
        <Text style={{ fontSize: 16 }}>
          使用停止したいデータはオフにしてください
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          flex: 1,
          flexDirection: "column",
          alignSelf: "center",
          paddingTop: Constants.statusBarHeight,
          width: "70%",
        }}
      >
        <View style={styles.toggleContainer}>
          <Text>健康診断結果データ</Text>
          <ToggleComponent />
        </View>
        <View style={styles.toggleContainer}>
          <Text>GPSデータ</Text>
          <ToggleComponent />
        </View>
        <View style={styles.toggleContainer}>
          <Text>心拍数データ</Text>
          <ToggleComponent />
        </View>
        <View style={styles.toggleContainer}>
          <Text>フィットネストラッキング</Text>
          <ToggleComponent />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    paddingTop: Constants.statusBarHeight,
    width: "100%",
  },
  buttons: {
    paddingVertical: "5%",
    borderWidth: 1,
  },
  title: {
    fontSize: 25,
    paddingTop: "10%",
    paddingBottom: "2%",
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 35,
  },
  toggleArea: {
    flexDirection: "row",
    // justifyContent: "flex-end",
  },
});

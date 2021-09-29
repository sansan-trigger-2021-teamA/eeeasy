import Constants from "expo-constants";
import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-material-ui";
import { Text, View } from "../components/Themed";
import { useNavigation } from "@react-navigation/native";

export default function SendInfo() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <Button
          text="身分証の送信"
          onPress={() => {
            navigation.navigate("SendIdCard");
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="健康診断データの送信"
          onPress={() => {
            navigation.navigate("SendHealthCheckDataScreen");
          }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          text="ウェアラブル端末との連携"
          onPress={() => alert("ウェアラブル端末との連携")}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button text="送信情報の設定" onPress={() => alert("送信情報の設定")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
    marginBottom: "40%",
  },
  buttonContainer: {
    height: 100,
    width: "100%",
    padding: 10,
    backgroundColor: "#FFFFFF",
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
  },
});

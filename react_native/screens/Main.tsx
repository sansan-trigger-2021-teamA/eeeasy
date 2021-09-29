import * as React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import  AsyncStorage  from "@react-native-async-storage/async-storage"
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { UserContext } from "../context/UserContext";
import { Button } from "react-native-material-ui";
import * as Location from "expo-location";
import { useEffect } from "react";
import { RewardGraph } from "../components/RewardGraph";
import { DistanceGraph } from "../components/DistanceGraph";

export default function Main({ navigation }: RootTabScreenProps<"Main">) {
  const context = React.useContext(UserContext);
  const [graph, setGraph] = React.useState(false);

  React.useEffect(() => {
    AsyncStorage.getItem("User").then((user) => {
      if(user){
        context.setUser(JSON.parse(user))
        return
      }
      navigation.navigate("Modal");
    })
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      // console.log(location);
    })();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollView}>
        <View lightColor="white" style={styles.hello}>
          <Text style={styles.helloText}>
            こんにちは {context.user.userName} さん
          </Text>
        </View>
        <View
          style={styles.notify}
          lightColor="#f5f5f5"
          darkColor="rgba(255,255,255,0.1)"
        >
          <Text>ここに通知が来るンゴ</Text>
        </View>
        <View
          style={styles.graphArea}
          lightColor="white"
          darkColor="rgba(255,255,255,0.1)"
        >
          <View style={{ marginVertical: 20 }}>
            <Text style={{ fontSize: 20 }}>{graph ? "移動距離" : "報酬"}</Text>
          </View>
          {graph ? <DistanceGraph /> : <RewardGraph />}
        </View>
      </View>
      <View style={{ flexDirection: "row", marginTop: 70, paddingBottom: 190 }}>
        <Button text="報酬" onPress={() => setGraph(false)} />
        <Button text="移動距離" onPress={() => setGraph(true)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  hello: {
    marginLeft: 20,
    marginVertical: 40,
    width: "80%",
  },
  helloText: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
  },
  scrollView: {
    width: "100%",
    textAlign: "center",
  },
  notify: {
    height: 188,
    width: "80%",
    left: "10%",
    textAlign: "center",
    borderRadius: 22,
    borderStyle: "solid",
    borderWidth: 1,
  },
  graphArea: {
    height: 188,
    marginTop: 30,
    width: "80%",
    left: "10%",
    textAlign: "center",
    alignItems: "center",
  },
});

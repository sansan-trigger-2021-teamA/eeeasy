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

export default function Main({ navigation }: RootTabScreenProps<"Main">) {
  const context = React.useContext(UserContext);

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
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      // let location = await Location.getCurrentPositionAsync({});
      // console.log(location);
    })();
  }, []);

  const userName = () => {
    return "sansan"
  }
  const name = "sansan"


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View lightColor="white" style={styles.hello}>
          <Text style={styles.hello}>
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
          style={styles.distance}
          lightColor="#f5f5f5"
          darkColor="rgba(255,255,255,0.1)"
        >
          <Text>テスト</Text>
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", marginBottom: 20 }}>
        <Button text="報酬" onPress={() => alert("Simple Button pressed")} />
        <Button
          text="移動距離"
          onPress={() => alert("Simple Button pressed")}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  hello: {
    fontSize: 20,
    marginLeft: 20,
    marginTop: 20,
    width: "80%",
  },
  scrollView: {
    width: "100%",
    textAlign: "center",
    marginHorizontal: 20,
  },
  notify: {
    height: 188,
    top: 50,
    // marginTop: 20,
    width: "80%",
    left: "10%",
    textAlign: "center",
    borderRadius: 22,
    borderStyle: "solid",
    borderWidth: 1,
  },
  distance: {
    height: 188,
    top: 50,
    marginTop: 20,
    width: "80%",
    left: "10%",
    textAlign: "center",
    borderRadius: 22,
    borderStyle: "solid",
    borderWidth: 1,
  },
  graph: {
    width: "80%",
    height: "40%",
    borderStyle: "solid",
    borderWidth: 1,
  },
});

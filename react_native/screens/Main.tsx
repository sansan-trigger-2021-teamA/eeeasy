import * as React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import  AsyncStorage  from "@react-native-async-storage/async-storage"
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { UserContext } from "../context/UserContext";
import { Button } from "react-native-material-ui";
import * as Location from "expo-location";
import { useEffect, useRef,useState } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Subscription } from '@unimodules/core';
import { RewardGraph } from "../components/RewardGraph";
import { DistanceGraph } from "../components/DistanceGraph";

  
export default function Main({ navigation }: RootTabScreenProps<"Main">) {
  const notificationListener = useRef<Subscription>();
  const responseListener = useRef<Subscription>();
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState<Notifications.Notification>();
  useEffect(() => {
    // 通知を受信した時の振る舞いを設定
    let registerForPushNotificationsAsync = async () => {
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync()
        let finalStatus = existingStatus
        if (existingStatus !== 'granted') {
          // 通知の権限がない場合は、再度通知の権限を確認します
          const { status } = await Notifications.requestPermissionsAsync()
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!')
        } else {
          // Pushトークンの取得 
          const token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
          return token;
        }
      }
      
    };
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token))

    // アプリがフォアグラウンドの状態で通知を受信したときに起動
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification)
    })

    // ユーザーが通知をタップまたは操作したときに発生します
    // （アプリがフォアグラウンド、バックグラウンド、またはキルされたときに動作します）
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      alert('ユーザーが通知をタップしました')
      console.log(response)
    })

    // アンマウント時にリスナーを削除
    return () => {
      const notification = notificationListener.current
      notification && Notifications.removeNotificationSubscription(notification)
      const response = responseListener.current
      response && Notifications.removeNotificationSubscription(response)
    }
  }, []);
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

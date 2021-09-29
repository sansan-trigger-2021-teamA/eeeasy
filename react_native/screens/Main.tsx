import * as React from 'react';
import { StyleSheet, ScrollView,SafeAreaView,Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as Location from "expo-location";
import { useEffect, useRef,useState } from 'react';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Subscription } from '@unimodules/core';

export default function Main({ navigation }: RootTabScreenProps<'Main'>) {
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
  
  const userName = () => {
    return "sansan"
  }
  const name = "sansan"

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.hello}>こんにちは{name}</Text>
        <View style={styles.notify} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
          <Text>ここに通知が来るンゴ</Text>
        </View>
        <View style={styles.notify} lightColor="#eee" darkColor="rgba(255,255,255,0.1)">
          <Text>テスト</Text>
        </View>
      </ScrollView>
      <View　style={{ flexDirection: 'row',marginBottom:20,}}>
        <Button 
          title="Press me"
          onPress={() => alert('Simple Button pressed')}
        />
        <Button 
          title="Press me2"
          onPress={() => alert('Simple Button pressed')}
        />
      </View>
    </SafeAreaView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  hello:{
    fontSize:10,
  },
  scrollView: {
    width: '100%',
    textAlign: 'center',
    marginHorizontal: 20,
  },
  notify:{
  height: 188,
  top: 50,
  marginTop:20,
  width: '80%',
  left:"10%",
  textAlign: 'center',
  borderRadius: 22,
  borderStyle:"solid",
  borderWidth:1
  },
  graph:{
    width: '80%',
    height: '40%',
    borderStyle:"solid",
    borderWidth:1
  }
});


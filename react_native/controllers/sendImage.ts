import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from "axios"
import {getEmail} from "./getEmail"
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';


export const sendImage = async(image: any) => {
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
      registerForPushNotificationsAsync().then(async (token) =>         
        await getEmail().then(email =>{
        axios.post("https://shugznedv3.execute-api.ap-northeast-1.amazonaws.com/api/set-image",{
            email:email,
            pushtoken:token,
        }).then(res=>       
            axios({
                // POSTを指定する
                            method: 'POST',
                //　APIのURLを指定
                            url: res.data.body,
                            headers: {
                //　ファイルを送れるようmultipart/form-datを指定する
                                'Content-Type': 'multipart/form-data',
                // ここでPUTに置き換える
                                'X-HTTP-Method-Override': 'PUT',
                            },
                // ファイルが入ったデータ
                            data: image,
            })
            .then(response => {
                console.log('成功');

            })
            .catch(error => {
                console.log('失敗');
            })
        )})
        )
        return 
}
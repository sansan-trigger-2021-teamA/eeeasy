import Constants from 'expo-constants';
import * as React from 'react';
import { StyleSheet,Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function SendInfo() {
  type info = {
    title: string,
    message: string,
  }
  const buttonsInfo:info[] = [
    {
      title: '健康診断データの送信',
      message: '健康診断'
    },
    {
      title: 'ウェアラブル端末との連携',
      message: '健康診断'
    },
    {
      title: '送信情報の設定',
      message: '健康診断'
    },
  ]
  return (
    <View style={styles.container}>
      {buttonsInfo.map((info,key) =>{
        return(
          <View key={key} style={styles.buttonContainer}>
            <Button
              title={info.title}
              onPress={() =>alert(info.message)}
            />
          </View>
        )
      })}  
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  buttons: {
    paddingVertical:"5%",
    borderWidth:1
  },
  title: {
    fontSize: 25,
    paddingTop:"10%",
    paddingBottom:"2%",
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '100%',
    marginBottom:"40%"
  },
  buttonContainer: {
    height: 100,
    width: "100%",
    padding: 10,
    backgroundColor: '#FFFFFF',
    margin: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

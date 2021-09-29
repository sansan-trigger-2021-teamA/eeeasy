import * as React from 'react';
import { StyleSheet, ScrollView,SafeAreaView,Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import * as Location from "expo-location";
import { useEffect } from 'react';



export default function Main({ navigation }: RootTabScreenProps<'Main'>) {

  
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


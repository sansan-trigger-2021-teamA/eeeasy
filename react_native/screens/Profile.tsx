import * as React from 'react';
import { StyleSheet,Button } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

//職業
export default function Profile() {
    const profile = {
        name:"茂野　吾郎",
        sex:"男",
        age:"21",
        job:"学生"
    }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>確認&編集</Text> 
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.infoText}>name:{profile.name}</Text> 
      <Text style={styles.infoText}>sex:{profile.sex}</Text>     
      <Text style={styles.infoText}>age:{profile.age}</Text> 
      <Text style={styles.infoText}>job:{profile.job}</Text> 
      <Button 
      title="職業を変更する"
      onPress={() => alert('職業変更未実装')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop:"5%"
  },
  button:{
    marginTop:"10%"
  },
  infoText: {
    paddingVertical:"5%",
    fontSize:20
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

import * as React from "react";
import { Platform, StyleSheet, TextInput } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import DropDownPicker from "react-native-dropdown-picker";

import { Button } from "react-native-material-ui";

import { RadioButton } from "react-native-paper";
import { shouldUseActivityState } from "react-native-screens";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "@react-navigation/native";
import { User } from "../context/UserContext";
import { getUserProfile } from "../controllers/getUserProfile"
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


export default function RegisterProfile() {
  const [openJobSelect, setOpenJobSelect] = React.useState(false);
  const [userName, setUserName] = React.useState<string>("");
  const [sex, setSex] = React.useState<string>("");
  const [job, setJob] = React.useState<string>("");
  const context = React.useContext(UserContext);
  const navigation = useNavigation();
  const [year, setYear] = React.useState<string>("");
  const [month, setMonth] = React.useState<string>("");
  const [day, setDay] = React.useState<string>("");
  //this is 車輪の再発明
  const calcAge = (birthDay:Date) => {
      const today = new Date();
      const thisYearBirthday = new Date(
        today.getFullYear(),
        birthDay.getMonth() - 1,
        birthDay.getDate()
      );
      const ageNow = today.getFullYear() - birthDay.getFullYear();
      return ageNow
  }

  const handleSubmit = () => {
    const numberMonth = Number(month);
    const lessMonth = numberMonth - 1;
    const birthday = new Date(year + "/" + lessMonth.toString() + "/" + day);
    getUserProfile().then(async (userProfile) => {
      const profile: User = {
        id: userProfile.sub ,
        userName: userName,
        birthday: birthday,
        sex: sex,
        job: job,
      };
      await axios.post("https://shugznedv3.execute-api.ap-northeast-1.amazonaws.com/api/create-user",{
        name:profile.userName, 
        email:userProfile.email,
        gender:profile.sex,
        age:calcAge(profile.birthday),
        sub:userProfile.sub, 
        job:profile.job
      })
      await AsyncStorage.setItem("User", JSON.stringify(profile));
      context.setUser(profile);
      navigation.navigate("Root");
      
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.Box}>
        <Text>ユーザーネーム</Text>
        <View style={styles.usernameBox}>
          <TextInput
            style={styles.usernameInput}
            value={userName}
            onChangeText={setUserName}
          />
        </View>
        <Text>生年月日</Text>
        <View style={styles.rowBox}>
          <TextInput style={styles.input} onChangeText={setYear} />
          <Text>年</Text>
          <TextInput style={styles.input} onChangeText={setMonth} />
          <Text>月</Text>
          <TextInput style={styles.input} onChangeText={setDay} />
          <Text>日</Text>
        </View>
        <Text>性別</Text>
        <View style={styles.rowBox}>
          <Text>男性</Text>
          <View style={styles.RadioButton}>
            <RadioButton
              value="男性"
              color="blue"
              status={sex === "男性" ? "checked" : "unchecked"}
              onPress={() => setSex("男性")}
            />
          </View>
          <Text>女性</Text>
          <View style={styles.RadioButton}>
            <RadioButton
              value="女性"
              color="blue"
              status={sex === "女性" ? "checked" : "unchecked"}
              onPress={() => setSex("女性")}
            />
          </View>
          <Text>その他</Text>
          <View style={styles.RadioButton}>
            <RadioButton
              value="その他"
              color="blue"
              status={sex === "その他" ? "checked" : "unchecked"}
              onPress={() => setSex("その他")}
            />
          </View>
        </View>
        <Text>職業</Text>
        <View style={styles.selectBox}>
          <DropDownPicker
            open={openJobSelect}
            value={job}
            items={[
              { label: "学生", value: "学生" },
              { label: "会社員", value: "会社員" },
              { label: "その他", value: "その他" },
            ]}
            setOpen={setOpenJobSelect}
            setValue={setJob}
            labelStyle={{
              fontSize: 18,
              textAlign: "center",
            }}
            placeholder="職業を選択してください"
            style={{
              zIndex: 10,
              position: "relative",
              elevation: Platform.OS === "android" ? 10 : 5,
            }}
          />
          <View style={styles.Button}>
            <Button text="登録" onPress={handleSubmit} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  Box: {
    width: "80%",
    justifyContent: "center",
  },
  rowBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },
  RadioButton: {
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 8,
    opacity: 0.5,
  },
  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 30,
    opacity: 0.8,
  },
  selectBox: {
    marginVertical: 20,
  },
  Button: {
    marginVertical: 20,
  },
  usernameBox: {
    marginHorizontal: "auto",
    marginVertical: 20,
  },
  usernameInput: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 15,
    opacity: 0.8,
  },
});

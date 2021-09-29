import * as React from "react";
import { StyleSheet, Platform, ColorPropType } from "react-native";
import { Button } from "react-native-material-ui";
import { Text, View } from "../components/Themed";
import Dialog from "react-native-dialog";
import DropDownPicker from "react-native-dropdown-picker";
import { Appearance, useColorScheme } from "react-native-appearance";
import { Avatar } from "react-native-material-ui";
import { UserContext } from "../context/UserContext";
import Constants from "expo-constants";

Appearance.getColorScheme();

// ダミーデータ
const profile = {
  name: "茂野　吾郎",
  sex: "男",
  age: "21",
  job: "学生",
};

//職業
export default function Profile() {
  const context = React.useContext(UserContext);
  const [visible, setVisible] = React.useState(false);
  const [job, setJob] = React.useState(context.user?.job);
  const [openJobSelect, setOpenJobSelect] = React.useState(false);
  const colorScheme = useColorScheme();
  const [age, setAge] = React.useState<number>(0);

  React.useEffect(() => {
    calcAge();
  }, []);

  const calcAge = () => {
    const birthDay = new Date(context.user?.birthday);
    console.log(birthDay)
    if (birthDay) {
      const today = new Date();
      const thisYearBirthday = new Date(
        today.getFullYear(),
        birthDay.getMonth() - 1,
        birthDay.getDate()
      );
      const ageNow = today.getFullYear() - birthDay.getFullYear();
      setAge(ageNow);
    }
  };

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleDelete = () => {
    context.setUser({ ...context.user, job: job });
    setVisible(false);
  };

  return (
    <View style={styles.container}>
      <Avatar iconSize={150} size={150} text={context.user.userName} />
      <View lightColor="white" style={{ marginTop: 20 }}>
        <Text style={styles.infoText}>名前:{context.user?.userName}</Text>
        <Text style={styles.infoText}>性別:{context.user?.sex}</Text>
        <Text style={styles.infoText}>年齢:{age}</Text>
        <Text style={styles.infoText}>職業:{job}</Text>
      </View>
      <View>
        <Button text="職業を変更" onPress={showDialog} />
      </View>
      <Dialog.Container visible={visible} contentStyle={styles.dialog}>
        <Dialog.Title>職業を変更</Dialog.Title>
        <Dialog.Description>現在の職業を選択してください</Dialog.Description>
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
            marginVertical: 30,
          }}
        />
        <Dialog.Button label="キャンセル" onPress={handleCancel} />
        <Dialog.Button label="決定" onPress={handleDelete} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: 300,
  },
  infoText: {
    paddingVertical: "5%",
    fontSize: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  dialog: {
    padding: 20,
  },
});

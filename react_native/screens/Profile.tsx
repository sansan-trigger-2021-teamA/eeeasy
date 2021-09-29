import * as React from "react";
import { StyleSheet, Platform, ColorPropType } from "react-native";
import { Button } from "react-native-material-ui";
import { Text, View } from "../components/Themed";
import Dialog from "react-native-dialog";
import DropDownPicker from "react-native-dropdown-picker";
import { Appearance, useColorScheme } from "react-native-appearance";
import { color } from "react-native-reanimated";
<<<<<<< HEAD
=======
import { UserContext } from "../context/UserContext";
>>>>>>> origin/main

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
    const birthDay = context.user?.birthday;
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
<<<<<<< HEAD
    // The user has pressed the "Delete" button, so here you can do your own logic.
    // ...Your logic
=======
    context.setUser({ ...context.user, job: job });
>>>>>>> origin/main
    setVisible(false);
  };

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      {/* <Text style={styles.title}>確認&編集</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
      <Text style={styles.infoText}>name:{profile.name}</Text>
      <Text style={styles.infoText}>sex:{profile.sex}</Text>
      <Text style={styles.infoText}>age:{profile.age}</Text>
      <Text style={styles.infoText}>job:{profile.job}</Text>
=======
      <Text style={styles.infoText}>name:{context.user?.userName}</Text>
      <Text style={styles.infoText}>sex:{context.user?.sex}</Text>
      <Text style={styles.infoText}>age:{age}</Text>
      <Text style={styles.infoText}>job:{job}</Text>
>>>>>>> origin/main
      <View>
        <Button
          text="職業を変更"
          onPress={showDialog}
          style={
            colorScheme === "dark"
              ? { ...{ text: styles.buttonWhite } }
              : { ...{ text: styles.buttonBlack } }
          }
        />
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
    flex: 1,
    alignItems: "center",
    paddingTop: "5%",
<<<<<<< HEAD
  },
  buttonWhite: {
    color: "white",
  },
=======
  },
  buttonWhite: {
    color: "white",
  },
>>>>>>> origin/main
  buttonBlack: {
    color: "black",
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

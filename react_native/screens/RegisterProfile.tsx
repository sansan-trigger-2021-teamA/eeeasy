import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import DropDownPicker from "react-native-dropdown-picker";

import { Button } from "react-native-material-ui";

import { RadioButton } from "react-native-paper";
import { shouldUseActivityState } from "react-native-screens";

export default function RegisterProfile({
  navigation,
}: RootTabScreenProps<"RegisterProfile">) {
  const [openJobSelect, setOpenJobSelect] = React.useState(false);
  const [sex, setSex] = React.useState<string | null>(null);
  const [job, setJob] = React.useState(null);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>プロフィール登録</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <View style={styles.Box}>
        <Text>性別</Text>
        <View style={styles.RadioBox}>
          <Text>男性</Text>
          <View style={styles.RadioButton}>
            <RadioButton value="男性" color="blue" status="checked" />
          </View>
          <Text>女性</Text>
          <View style={styles.RadioButton}>
            <RadioButton value="女性" color="blue" />
          </View>
          <Text>その他</Text>
          <View style={styles.RadioButton}>
            <RadioButton value="その他" color="blue" />
          </View>
        </View>
        <Text>職業</Text>
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
        <Button text="次へ" />
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
  RadioBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  RadioButton: {
    borderWidth: 1,
    borderRadius: 50,
    marginHorizontal: 8,
    opacity: 0.5,
  },
});

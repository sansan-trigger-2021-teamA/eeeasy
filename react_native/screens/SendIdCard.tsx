import Constants from "expo-constants";
import * as React from "react";
import { StyleSheet, Image, Platform } from "react-native";
import { Text, View } from "../components/Themed";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { Button } from "react-native-material-ui";
import { Appearance, useColorScheme } from "react-native-appearance";
import { useNavigation } from "@react-navigation/native";
Appearance.getColorScheme();

interface imageType {
  image: string;
}

export default function SendIdCard() {
  const [image, setImage] = React.useState<string>("");
  const navigation = useNavigation();

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const {
          status,
        } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("アルバムへのアクセス許可がありません");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 40 }}>
        <Text>モザイク処理を施した身分証を提出してください</Text>
      </View>
      <Button text="送信する画像を選択" onPress={pickImage} />
      {image !== "" && (
        <>
          <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
          <Button
            text="送信する"
            onPress={() => {
              navigation.navigate("Root");
            }}
          />
        </>
      )}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          ご提出可能な身分証
        </Text>
      </View>
      <View style={{ marginTop: 20 }}>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 20 }}>・免許証</Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 20 }}>・保険証</Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 20 }}>・学生証</Text>
        </View>
        <View style={{ marginVertical: 5 }}>
          <Text style={{ fontSize: 20 }}>・社員証</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: Constants.statusBarHeight,
  },
  buttons: {
    paddingVertical: "5%",
    borderWidth: 1,
  },
  title: {
    fontSize: 25,
    paddingTop: "10%",
    paddingBottom: "2%",
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
    marginBottom: "40%",
  },
  buttonContainer: {
    height: 100,
    width: "100%",
    padding: 10,
    backgroundColor: "#FFFFFF",
    margin: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonWhite: {
    color: "white",
  },
  buttonBlack: {
    color: "black",
  },
});

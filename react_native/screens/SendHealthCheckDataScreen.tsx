import Constants from "expo-constants";
import * as React from "react";
import { StyleSheet, Image, Platform } from "react-native";
import { View } from "../components/Themed";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-material-ui";
import { Appearance, useColorScheme } from "react-native-appearance";
import { Camera } from "expo-camera";
import { useNavigation } from "@react-navigation/native";
import { sendImage } from '../controllers/sendImage';
Appearance.getColorScheme();

interface imageType {
  image: string;
}

export default function SendHealthCheckDataScreen() {
  const [image, setImage] = React.useState<imageType | null>(null);
  const navigation = useNavigation();

  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await Camera.requestPermissionsAsync();
        if (status !== "granted") {
          alert("カメラの使用許可がありません");
        }
      }
    })();
  }, []);

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
    });

    if (!result.cancelled) {
      setImage({ image: result.uri });
    }
  };

  return (
    <View style={styles.container}>
      <Button text="送信する画像を撮影" onPress={takePhoto} />
      {image && (
        <>
          <Image
            source={{ uri: image.image }}
            style={{ width: 300, height: 300 }}
          />
          <Button
            text="送信する"
            onPress={() => {
              navigation.navigate("Root");
            }}
          />
        </>
      )}
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

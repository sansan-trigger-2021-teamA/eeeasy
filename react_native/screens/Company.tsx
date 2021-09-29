import * as React from "react";
import { Text, View } from "../components/Themed";
import { ListRenderItemInfo, StyleSheet } from "react-native";
import { Button } from "react-native-material-ui";

type Props = {
  name: string;
};

const Company = (listRenderItemInfo: ListRenderItemInfo<Props>) => {
  const style = StyleSheet.create({
    item: {
      height: 100,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    name: {
      fontSize: 20,
      marginRight: "10%",
    },
    separator: {
      //marginVertical:5,
      height: 1,
      width: "100%",
      opacity: 0.8,
    },
  });

  return (
    <>
      <View style={style.item}>
        <View style={{ flexDirection: "column", marginRight: 30 }}>
          <Text style={style.name}>{listRenderItemInfo.item.name}</Text>
          <Text style={{ paddingTop: 10, fontSize: 13 }}>
            取ろうとしてる情報
          </Text>
        </View>
        <Button text="承認" onPress={() => alert("Simple Button pressed")} />
        <Button text="拒否" onPress={() => alert("Simple Button pressed")} />
      </View>
      <View style={style.separator} lightColor="#E2C792" darkColor="#E2C792" />
    </>
  );
};

export default Company;

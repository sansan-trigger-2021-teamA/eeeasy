import * as React from "react";
import { StyleSheet, SafeAreaView, ScrollView, FlatList } from "react-native";
import Company from "./Company";
import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Constants from "expo-constants";

export default function WaitingCompany() {
  type dummy = {
    id?: string;
    name: string;
  };
  const dummyCompany: dummy[] = [
    {
      id: "1",
      name: "sansan",
    },
    {
      id: "2",
      name: "yahoo",
    },
    {
      id: "3",
      name: "google",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={dummyCompany}
        renderItem={Company}
        style={{ height: "10%", width: "80%" }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    //marginTop: Constants.statusBarHeight,
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
});

import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
} from "react-native";
import { Text, View } from "../components/Themed";
import { Appearance, useColorScheme } from "react-native-appearance";

interface CouponInterface {
  id: number;
  companyName: string;
  couponName: string;
}

const CouponList: CouponInterface[] = [
  { id: 1, companyName: "a", couponName: "a's coupon" },
  { id: 2, companyName: "b", couponName: "b's coupon" },
  { id: 3, companyName: "c", couponName: "c's coupon" },
  { id: 4, companyName: "d", couponName: "d's coupon" },
  { id: 5, companyName: "e", couponName: "e's coupon" },
  { id: 6, companyName: "f", couponName: "f's coupon" },
  { id: 7, companyName: "g", couponName: "g's coupon" },
  { id: 8, companyName: "h", couponName: "h's coupon" },
];

const ITEM_WIDTH = Dimensions.get("window").width;
Appearance.getColorScheme();

export default function Coupons() {
  const colorScheme = useColorScheme();
  return (
    <SafeAreaView
      style={
        colorScheme === "light"
          ? styles.containerForWhite
          : styles.containerForBlack
      }
    >
      <ScrollView style={styles.scrollView}>
        <FlatList
          data={CouponList}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.coupon}>
              <ImageBackground
                source={{ uri: "https://source.unsplash.com/random" }}
                style={styles.imageStyle}
              >
                <Text style={styles.getStartedText}>{item.companyName}</Text>
                <Text style={styles.getStartedText}>{item.couponName}</Text>
              </ImageBackground>
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerForWhite: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    padding: 16,
    backgroundColor: "white",
  },
  containerForBlack: {
    flex: 1,
    justifyContent: "center",
    // paddingTop: Constants.statusBarHeight,
    padding: 16,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "100%",
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    color: "white",
  },
  scrollView: {
    width: "100%",
    textAlign: "center",
    marginVertical: 20,
  },
  coupon: {
    width: ITEM_WIDTH / 2,
    paddingVertical: 30,
  },
  imageStyle: {
    width: ITEM_WIDTH / 2,
    height: ITEM_WIDTH / 3,
    // margin: 1,
    resizeMode: "cover",
  },
});

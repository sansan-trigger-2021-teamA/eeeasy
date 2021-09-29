import * as React from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  FlatList,
  Dimensions,
  ImageBackground,
  ListRenderItem,
} from "react-native";
import { Text, View } from "../components/Themed";
import { Appearance, useColorScheme } from "react-native-appearance";

interface CouponInterface {
  id: number;
  companyName: string;
  couponName: string;
}

const CouponList: CouponInterface[] = [
  { id: 1, companyName: "企業A", couponName: "クーポンA" },
  { id: 2, companyName: "企業B", couponName: "クーポンB" },
  { id: 3, companyName: "企業C", couponName: "クーポンC" },
  { id: 4, companyName: "企業D", couponName: "クーポンD" },
  { id: 5, companyName: "企業E", couponName: "クーポンE" },
  { id: 6, companyName: "企業F", couponName: "クーポンF" },
  // { id: 7, companyName: "g", couponName: "g's coupon" },
  // { id: 8, companyName: "h", couponName: "h's coupon" },
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
      <FlatList
        data={CouponList}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.coupon}>
            <ImageBackground
              source={{ uri: "https://source.unsplash.com/random" }}
              // source={require("../assets/images/coupon.png")}
              style={styles.imageStyle}
            >
              <Text style={styles.getStartedText}>{item.companyName}</Text>
              <Text style={styles.getStartedText}>{item.couponName}</Text>
            </ImageBackground>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerForWhite: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "white",
  },
  containerForBlack: {
    flex: 1,
    justifyContent: "center",
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
    resizeMode: "cover",
  },
});

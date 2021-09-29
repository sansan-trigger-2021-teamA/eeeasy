/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import ModalScreen from "../screens/ModalScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import Main from "../screens/Main";
import SendInfo from "../screens/SendInfo";
import WaitingCompany from "../screens/WaitingCompany";
import Coupon from "../screens/Coupon";
import Profile from "../screens/Profile";
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import SendHealthCheckDataScreen from "../screens/SendHealthCheckDataScreen";
import TermOfServiceModal from "../screens/TermOfServiceModal";

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SendHealthCheckDataScreen"
        component={SendHealthCheckDataScreen}
        options={{ headerShown: true, title: "健康診断データの送信" }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group>
        <Stack.Screen
          name="Modal"
          component={TermOfServiceModal}
          options={{
            headerBackVisible: false,
            title: "利用規約",
            headerStyle: {
              backgroundColor: "#2A2B37",
            },
            headerTintColor: "#E2C792",
          }}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen
          name="RegisterProfile"
          component={ModalScreen}
          options={{
            headerShown: true,
            title: "プロフィール登録",
            headerStyle: {
              backgroundColor: "#2A2B37",
            },
            headerTintColor: "#E2C792",
          }}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
        tabBarStyle: {
          backgroundColor: "#2A2B37",
        },
      }}
    >
      <BottomTab.Screen
        name="Main"
        component={Main}
        options={({ navigation }: RootTabScreenProps<"Main">) => ({
          title: "トップページ",
          headerStyle: {
            backgroundColor: "#2A2B37",
          },
          headerTintColor: "#E2C792",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="SendInfo"
        component={SendInfo}
        options={{
          title: "データの送信",
          headerStyle: {
            backgroundColor: "#2A2B37",
          },
          headerTintColor: "#E2C792",
          tabBarIcon: ({ color }) => <TabBarIcon name="upload" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="WaitingCompany"
        component={WaitingCompany}
        options={{
          title: "企業一覧",
          headerStyle: {
            backgroundColor: "#2A2B37",
          },
          headerTintColor: "#E2C792",
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Coupon"
        component={Coupon}
        options={{
          title: "クーポン",
          headerStyle: {
            backgroundColor: "#2A2B37",
          },
          headerTintColor: "#E2C792",
          tabBarIcon: ({ color }) => <TabBarIcon name="gift" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "プロフィール",
          headerStyle: {
            backgroundColor: "#2A2B37",
          },
          headerTintColor: "#E2C792",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return (
    <FontAwesome
      size={30}
      style={{ marginBottom: -3, color: "#E2C792" }}
      {...props}
    />
  );
}

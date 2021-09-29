// import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import { StyleSheet } from "react-native";
import Amplify from "@aws-amplify/core";
import awsmobile from "./src/aws-exports";
// @ts-ignore
import { withAuthenticator } from "aws-amplify-react-native";
import { UserContext, User, AuthProvider } from "./context/UserContext";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { StatusBar } from "react-native";

Amplify.configure({
  ...awsmobile,
  Analytics: {
    disabled: true,
  },
});

const LOCATION_TASK_NAME = "background-location-task";

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log(error);
    return;
  }
  if (data) {
    console.log(data);
    // do something with the locations captured in the background
  }
});

Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
  timeInterval: 1000,
});

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <AuthProvider>
        <SafeAreaProvider>
          <StatusBar barStyle="light-content" />
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </AuthProvider>
    );
  }
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ["phone_number", "email"],
  },
  // includeGreetings: true,
});

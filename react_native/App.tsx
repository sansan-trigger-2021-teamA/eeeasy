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
import { backgroundGeoLocations } from './controllers/backgroundGeoLocations'

Amplify.configure({
  ...awsmobile,
  Analytics: {
    disabled: true,
  },
});


//backgroundGeoLocations()
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

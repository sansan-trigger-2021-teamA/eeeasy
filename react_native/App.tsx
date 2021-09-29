import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { StyleSheet} from 'react-native'; 
import Amplify from '@aws-amplify/core';
import awsmobile from './src/aws-exports';
import {withAuthenticator} from 'aws-amplify-react-native';
//import { registerTask } from './controllers/backendGeoLocation'
import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"
import * as Location from 'expo-location';

Amplify.configure({
  ...awsmobile,
  Analytics: {
    disabled: true,
  },
});

const LOCATION_TASK_NAME = 'background-location-task';

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    console.log(error)
    return;
  }
  if (data) {
    console.log(data);
    // do something with the locations captured in the background
  }
});

Location.startLocationUpdatesAsync(LOCATION_TASK_NAME,{
  timeInterval:1000,
})

function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}

export default withAuthenticator(App, {
  signUpConfig: {
    hiddenDefaults: ["phone_number", "email"],
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

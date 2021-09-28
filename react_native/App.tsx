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

Amplify.configure({
  ...awsmobile,
  Analytics: {
  disabled: true,
},});


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
    hiddenDefaults: ['phone_number','email']
  }});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

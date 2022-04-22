import { StatusBar } from 'expo-status-bar';
import React, {useContext, useState} from 'react';
import { StyleSheet, Text, View , SafeAreaView} from 'react-native';
import GlobalProvider from './src/context/Provider';
import AppNavContainer from './src/navigations';
// import LoginScreen from './screens/LoginScreen';
import { ImageBrowser } from 'expo-image-picker-multiple';

export default function App() {

  return (
    <GlobalProvider>
    <AppNavContainer/>
    </GlobalProvider>

  ); 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

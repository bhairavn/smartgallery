import {NavigationContainer} from '@react-navigation/native';
import { Text } from 'react-native';
import HomeNavigator from './HomeNavigator';
import AuthNavigator from './AuthNavigator';
import DrawerNavigator from './DrawerNavigator';
import React,{useContext} from 'react';
import { GlobalContext } from '../context/Provider';


const AppNavContainer=()=>{

const {
    authState:{isLoggedIn}}=useContext(GlobalContext);

console.log('isLoggedIn :>> ',isLoggedIn);


    return(
    <NavigationContainer>
        {isLoggedIn ? <DrawerNavigator/>: <AuthNavigator/>  }
    </NavigationContainer>
    );
}

export default AppNavContainer;
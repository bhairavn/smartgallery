import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import React from 'react';
import { HOME_NAVIGATOR } from '../constants/routeNames';
import Settings from '../screens/Settings';

const DrawerNavigator=()=>{
    const Drawer = createDrawerNavigator();
    return(
    <Drawer.Navigator >
        <Drawer.Screen name={HOME_NAVIGATOR} options={{headerShown: false}} component={HomeNavigator}></Drawer.Screen>  
        <Drawer.Screen name="Settings" options={{headerShown: false}} component={Settings}></Drawer.Screen>     
    </Drawer.Navigator>
);
}

export default DrawerNavigator;

// screenOptions={{headerShown:false}}
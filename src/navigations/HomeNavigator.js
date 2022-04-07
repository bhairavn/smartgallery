import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import { DISPLAY_GALLERY, SETTINGS } from '../constants/routeNames';
import DisplayGallery from '../screens/DisplayGallery';
import Settings from '../screens/Settings';

const HomeNavigator=()=>{
    const HomeStack = createStackNavigator();
    return(
    <HomeStack.Navigator initialRouteName={DISPLAY_GALLERY}>
        <HomeStack.Screen name={DISPLAY_GALLERY} component={DisplayGallery}></HomeStack.Screen>  
        <HomeStack.Screen name={SETTINGS} component={Settings}></HomeStack.Screen>  
    </HomeStack.Navigator>
);
}

export default HomeNavigator;
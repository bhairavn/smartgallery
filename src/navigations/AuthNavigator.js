import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { LOGIN, REGISTER } from "../constants/routeNames";
import Register from "../screens/Register";
import Login from "../screens/Login";


const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  return (
    <AuthStack.Navigator screenOptions={{headerShown:false}} initialRouteName={LOGIN}>
      <AuthStack.Screen name={LOGIN} component={Login}></AuthStack.Screen>
      <AuthStack.Screen name={REGISTER} component={Register}></AuthStack.Screen>
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;

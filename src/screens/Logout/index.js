import React, {useContext, useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import logoutUser from '../../context/actions/logoutUser';
import {GlobalContext} from '../../context/Provider';

const Logout = () => {
  const {authDispatch} = useContext(GlobalContext);

  useEffect(() => {
    logoutUser()(authDispatch);
    console.log(authDispatch);
  }, []);

  return <ActivityIndicator />;
};

export default Logout;
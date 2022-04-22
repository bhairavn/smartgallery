import React from 'react';
import { Text , View} from "react-native";
import LoginComponent from '../../components/Login';
import { useFocusEffect } from "@react-navigation/native";
import { useState, useContext } from "react";
import { KeyboardAvoidingView } from 'react-native';
import { GlobalContext } from "../../context/Provider";
import loginUser from '../../context/actions/loginUser';

const Login =() =>{

  const [form, setForm] = useState({});

  const {
    authDispatch,
    authState: { error, loading},
  } = useContext(GlobalContext);


  const onSubmit = () => {
    if (form.userName && form.password ) {
      console.log(form);
      loginUser(form)(authDispatch);
    }
    };
  
    const onChange = ({ name, value }) => {
      setForm({ ...form, [name]: value });
    };
  
  return(
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <LoginComponent
         onSubmit={onSubmit}
         onChange={onChange}
         form={form}
         error={error}
         loading={loading}
        />
      </KeyboardAvoidingView>
  );
};


export default Login;
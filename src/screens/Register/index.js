import React from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { useState, useContext } from "react";
import RegisterComponent from "../../components/Register";
import { GlobalContext } from "../../context/Provider";
import envs from "../../config/env";
import { KeyboardAvoidingView } from "react-native";
import register, {clearAuthState} from "../../context/actions/register";
import { LOGIN } from "../../constants/routeNames";

const Register = () => {
  const [form, setForm] = useState({});
  const { navigate } = useNavigation();
  const [errors, setErrors] = useState({});

  const { BACKEND_URL } = envs;

  const {
    authDispatch,
    authState: { error, loading, data },
  } = useContext(GlobalContext);

  React.useEffect( () => {
      if (data) {
        navigate(LOGIN);
      }
  }, [data]);

  // console.log("BACKEND_URL:>>", envs);
  // console.log("__DEV__>>", __DEV__);
  
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        if (data || error) {
          clearAuthState()(authDispatch);
        }
      };
    }, [data, error]),
  );

  const onChange = ({ name, value }) => {
    setForm({ ...form, [name]: value });

    if (value !== "") {
      if (name === "password") {
        if (value.length < 6) {
          setErrors((prev) => {
            return { ...prev, [name]: "This field needs min 6 characters" };
          });
        } else {
          setErrors((prev) => {
            return { ...prev, [name]: null };
          });
        }
      } else {
        setErrors((prev) => {
          return { ...prev, [name]: null };
        });
      }
    } else {
      setErrors((prev) => {
        return { ...prev, [name]: "This field is required" };
      });
    }
    
  };

  const onSubmit = () => {
    if (!form.userName) {
      setErrors((prev) => {
        return {...prev, userName: 'Please add a username'};
      });
    }
    if (!form.firstName) {
      setErrors((prev) => {
        return {...prev, firstName: 'Please add a  first name'};
      });
    }
    if (!form.lastName) {
      setErrors((prev) => {
        return {...prev, lastName: 'Please add a last name'};
      });
    }
    if (!form.email) {
      setErrors((prev) => {
        return {...prev, email: 'Please add a email'};
      });
    }
    if (!form.password) {
      setErrors((prev) => {
        return {...prev, password: 'Please add a password'};
      });
    }
    if (
      Object.values(form).length === 5 &&
      Object.values(form).every((item) => item.trim().length > 0) &&
      Object.values(errors).every((item) => !item)
    ) {
      register(form)(authDispatch)((response) => {
        navigate(LOGIN, {data: response});
      });
      
    console.log("doneregis");
    console.log(form);

    }

  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <RegisterComponent
        onSubmit={onSubmit}
        onChange={onChange}
        form={form}
        errors={errors}
        error={error}
        loading={loading}
      />
      {/* <Text>hi from Register</Text> */}
    </KeyboardAvoidingView>
  );
};

export default Register;

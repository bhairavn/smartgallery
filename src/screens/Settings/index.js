import { Text, View,Alert,Switch,StyleSheet,Image } from "react-native";
import { useState,useContext } from "react";
import React from "react";
import CustomButton from "../../components/common/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import logoutUser from "../../context/actions/logoutUser";
import { GlobalContext } from "../../context/Provider";
import { HOME_NAVIGATOR } from '../../constants/routeNames';
import { urisdata } from "./ImageGallery";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FS from "expo-file-system";
// import * as RNFS from 'react-native-fs';
import * as MediaLibrary from 'expo-media-library';
import axios from 'axios';
import * as Progress from 'react-native-progress';


const Settings = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [LoadingG, setLoadingG] = useState(false);

  const [pr,setpr]=useState(0.0);
  const [generating, setgenerating] = useState(false);

  
  const {
    authDispatch,
    authState: { error, loading},
  } = useContext(GlobalContext);

  const imageUpload = (imagePath) => {
    const imageData = new FormData()
    // imageData.append('submit', 'ok')
    imageData.append({
      uri: imagePath,
      type:"image/jpg",
      fileName: 'image.jpg',
    })
    api="http://192.168.29.196:5000/image";
    // console.log("form data", imageData)
    axios({
      method: 'post',
      url: api,
      data: imageData,
    headers: {
      "Content-Type": "multipart/form-data",
    }
    })
      .then(function (response) {
        console.log("image upload successfully", response.data)
      }).then((error) => {
        console.log("error riased", error)
      })
return response.data
  }

  uriToBase64 = async (uri) => {
    // console.log(uri);
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };

  const onSubmitGL = async() => {
    console.log("helloGL");
    setLoadingG(!LoadingG);

    try {
      const value = await AsyncStorage.getItem("PhotosData");
      if (value !== null) {
          console.log("Loaded from async");
          pdata=JSON.parse(value);
          setgenerating(!generating);
          for (var i=0; i < pdata.length; i++) {

            console.log(i);
            uri=pdata[i].uri
            let myAssetId = uri.slice(5);
            let returnedAssetInfo = await MediaLibrary.getAssetInfoAsync(myAssetId);
            console.log("data1")
            console.log(returnedAssetInfo.localUri);
            console.log("data2")
             let base64 = await uriToBase64(returnedAssetInfo.localUri);
             imagePath=base64;
             const imageData = new FormData()
             // imageData.append('submit', 'ok')
             imageData.append({
               uri: imagePath,
               type:"image/jpg",
               fileName: 'image.jpg',
             })
             api="http://192.168.29.196:5000/image";
             // console.log("form data", imageData)
             await axios({
               method: 'post',
               url: api,
               data: imageData,
             headers: {
               "Content-Type": "multipart/form-data",
             }
             })
               .then(function (response) {
                 console.log("image upload successfully", response.data)
                 console.log("\nlbel generated",response.data );
                 pdata[i].Label = response.data;
               }).then((error) => {
                 console.log("error riased", error)
               })            
            pdata[i].type="image";
          console.log(i);
          setpr((i+1)/pdata.length)
         }        
      }
      onSubmitReset();
      
      AsyncStorage.setItem("PhotosData",JSON.stringify(pdata), (err) => {
        if(err){
            console.log("an error");
            throw err;
        }
        console.log("success");
        setgenerating(false);
        setLoadingG(false);
      
    }).catch((err)=> {
        console.log("error is: " + err);
    });
  } catch (error) {
      // Error retrieving data
  }

  };

  const onSubmitLL = () => {
    console.log("***helloLL");
    setLoading(!Loading);
    onSubmitReset();

    AsyncStorage.setItem("PhotosData",JSON.stringify(urisdata.assets), (err)=> {
      if(err){
          console.log("an error");
          throw err;
      }
      console.log("success");
  }).catch((err)=> {
      console.log("error is: " + err);
  });
    setTimeout(() => {setLoading(false);  navigation.navigate(HOME_NAVIGATOR);}, 2000);
  };


  const onSubmitReset = () => {
    console.log("helloReset");
    // console.log({urisdata});
    AsyncStorage.removeItem("PhotosData", (err)=> {
      if(err){
          console.log("an error");
          throw err;
      }
      console.log("successful reset");
  }).catch((err)=> {
      console.log("error is: " + err);
  });
  };

  const onSubmitD = async() => {
    console.log("helloD");
    // console.log({urisdata});
    try {
      const value = await AsyncStorage.getItem("PhotosData");
      if (value !== null) {
          console.log("Loaded from async");
          console.log(value);
          pdata=JSON.parse(value);
          console.log(pdata.length);
      }
  }
  catch (error) {
    // Error retrieving data
}
}

  const onSubmitLogout = () => {
    console.log("Logout");
    // navigation.toggleDrawer();
    Alert.alert('Logout!', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        onPress: () => {},
      },

      {
        text: 'OK',
        onPress: () => {
          logoutUser()(authDispatch);
        },
      },
    ]);
  };

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {setIsEnabled(previousState => !previousState);};

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={{ paddingTop: 7, paddingHorizontal: 20 }}>
        Load Library
      </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <CustomButton onPress={onSubmitLL} primary loading={Loading} title="Load Library" />
      </View>

      <Text style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        Generate Labels
      </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <CustomButton onPress={onSubmitGL} primary loading={LoadingG} title="Generate Labels" />
      </View>
      { generating ? 
      (<View style={{alignItems: 'center',}}>
      <Progress.Bar progress={pr} width={200} />
      </View>):<></>}

      <Text style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        Reset Database
      </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <CustomButton onPress={onSubmitReset} primary title="Reset Database" />
      </View>
      {/* <Text style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        display Database
      </Text> */}
      {/* <View style={{ paddingHorizontal: 20 }}>
        <CustomButton onPress={onSubmitD} primary title="Display Database" />
      </View> */}

      <View style={{ paddingTop: 20, paddingHorizontal: 20 , flexDirection: 'row',alignItems:'center' }}>
      <Text style={{ paddingRight: 20 }}>
        Dark Mode
      </Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      </View>
      {/* <View>
      <Image source={{uri: ur}}style={{width: 200, height: 200}}/>
      <Text>hello</Text>
      </View> */}       
      <View style={styles.bottom}>
          <CustomButton
            style={styles.button}
            onPress={onSubmitLogout}
            title="Logout" 
            primary
            />
        </View>
    </SafeAreaView>
  );
};
export default Settings;


const styles = StyleSheet.create({
    flex: {
      flex: 1,
    },
    container: {
      paddingTop: 50,
      position: 'relative',
    },
    emptyStay: {
      textAlign: 'center',
    },
    countBadge: {
      paddingHorizontal: 8.6,
      paddingVertical: 5,
      borderRadius: 50,
      position: 'absolute',
      right: 3,
      bottom: 3,
      justifyContent: 'center',
      backgroundColor: '#0580FF',
    },
    countBadgeText: {
      fontWeight: 'bold',
      alignSelf: 'center',
      padding: 'auto',
      color: '#ffffff',
    },
    divider: {
      height: 1,
      borderWidth: 3,
      borderColor: 'purple',
    },
    nameValueContainer: {
      flexDirection: 'row',
    },
    textName: {
      width: 100,
      textAlign: 'right',
      paddingRight: 10,
    },
    textValue: {
      fontWeight: 'bold',
    },
    screenBottomPadding: {
      height: 30,
    },
    textNoSelection: {
      fontSize: 20,
      fontStyle: 'italic',
      height: 50,
      paddingTop: 20,
      textAlign: 'center',
      width: '100%',
    },
    bottom: {
      flex: 1,
      justifyContent: 'flex-end',
      marginBottom: 10,
      paddingHorizontal: 20
    },
  });

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

const Settings = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [ur,setur]=useState("file:///var/mobile/Media/DCIM/103APPLE/IMG_3362.JPG");

  const {
    authDispatch,
    authState: { error, loading},
  } = useContext(GlobalContext);

  const toServer = async (mediaFile) => {
    console.log("media-",Object.keys(mediaFile));

    uri ="http://192.168.29.196:5000/image";
    console.log("data3");
    let response = await FS.uploadAsync(uri, 
      mediaFile.uri,
      {
      headers: {
        "content-type": "image/jpeg",
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
    console.log(response);

    console.log(response.headers);
    // console.log(response.body);
  };

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
    console.log("\n\n\n");
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
  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  uriToBase64 = async (uri) => {
    // console.log(uri);
    let base64 = await FS.readAsStringAsync(uri, {
      encoding: FS.EncodingType.Base64,
    });
    return base64;
  };

  const onSubmitGL = async() => {
    console.log("helloGL");
    try {
      const value = await AsyncStorage.getItem("PhotosData");
      if (value !== null) {
          console.log("Loaded from async");
          pdata=JSON.parse(value);
          
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
             console.log("\n\n\n");
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
         }        
        //  setur(returnedAssetInfo.localUri);
      }
      onSubmitReset();
      
      AsyncStorage.setItem("PhotosData",JSON.stringify(pdata), (err) => {
        if(err){
            console.log("an error");
            throw err;
        }
        console.log("success");
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
    setTimeout(() => {setLoading(false);  navigation.navigate(HOME_NAVIGATOR);}, 100);
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
        <CustomButton onPress={onSubmitGL} primary title="Generate Labels" />
      </View>

      <Text style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        Reset Database
      </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <CustomButton onPress={onSubmitReset} primary title="Reset Database" />
      </View>
      <Text style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        display Database
      </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <CustomButton onPress={onSubmitD} primary title="Display Database" />
      </View>

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

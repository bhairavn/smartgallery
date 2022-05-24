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
    // console.log("media-",mediaFile);
    let type = mediaFile.type;
    let schema = "http://";
    let host = "192.168.29.196";
    let route = "";
    let port = "5000";
    let url = "";
    let content_type = "";
    type === "image"
      ? ((route = "/image"), (content_type = "image/jpeg"))
      : ((route = "/video"), (content_type = "video/mp4"));
    url = schema + host + ":" + port + route;
    uri ="http://192.168.29.196:5000/image"
    let response = await FS.uploadAsync(url, mediaFile.uri, {
      headers: {
        "content-type": content_type,
      },
      httpMethod: "POST",
      uploadType: FS.FileSystemUploadType.BINARY_CONTENT,
    });
    console.log(response);

    console.log(response.headers);
    console.log(response.body);
  };

  const imageUpload = (imagePath) => {
    const imageData = new FormData()
    imageData.append("file", {
      uri: imagePath,
      fileName: 'image.jpg',
    })
    api="http://192.168.29.196:5000/image";
    console.log("form data", imageData)
    console.log("\n\n\n");
    // axios({
    //   method: 'post',
    //   url: api,
    //   data: imageData,
    // headers: {
    //   "Content-Type": "multipart/form-data",
    // }
    // })
    fetch(api, {
      // headers: {
      //   'Content-Type': 'multipart/form-data'
      // },
      method: 'POST',
      body: imageData
    })
      .then(function (response) {
        console.log("image upload successfully", response.data)
      }).then((error) => {
        console.log("error riased", error)
      })

  }


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


  const onSubmitGL = async() => {
    console.log("helloGL");
    try {
      const value = await AsyncStorage.getItem("PhotosData");
      if (value !== null) {
          console.log("Loaded from async");
          pdata=JSON.parse(value);
          
          for (var i=0; i < pdata.length; i++) {
            pdata[i].Label = "Generated";
            pdata[i].type="image";
            result=pdata[i]
            // imageUpload(result)
            // if (result.type == "image") {
            //   console.log("inif");
            //   // let base64 = await uriToBase64(result.uri);
            //   console.log("inifb");
            //   await toServer({
            //     type: result.type,
            //     // base64: base64,
            //     uri: result.uri,
            //   });
            // } else {
            //   let base64 = await uriToBase64(result.uri);
            //   await this.toServer({
            //     type: result.type,
            //     base64: base64,
            //     uri: result.uri,
            //   });
            // }
         }
        //  console.log(pdata[0]);
         
         uri=pdata[0].uri
         
        //  const destPath = RNFS.CachesDirectoryPath + '/MyPic.jpg';
    // console.log(await MediaLibrary.getAssetInfoAsync(pdata[0].id))
    // 'ph-upload' + asset.uri.substring(2);
    
      let uri = uri;
      let myAssetId = uri.slice(5);
      let returnedAssetInfo = await MediaLibrary.getAssetInfoAsync(myAssetId);
      console.log(returnedAssetInfo.localUri); // you local uri link to get the file
      imageUpload(returnedAssetInfo.localUri);

    // console.log(RNFS.copyAssetsFileIOS(uri, destPath));
    //      try {
    //        await RNFS.copyAssetsFileIOS(uri, destPath);
    //        console.log('destPath', destPath);
    //        } catch (error) {console.log(error);} 
     
    //        navigation.navigate('SelectedPicture', {
    //          uri: 'file://' + destPath,
    //            }); 
          console.log("datatatatta")
          console.log(returnedAssetInfo);
          // const ur=returnedAssetInfo.localUri;
         setur(returnedAssetInfo.localUri);
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
      <View>
      <Image source={{uri: ur}}style={{width: 200, height: 200}}/>
      <Text>hello</Text>
      </View>

       
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

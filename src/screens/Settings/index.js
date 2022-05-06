import { Text, View,Alert, } from "react-native";
import { useState } from "react";
import React from "react";
import CustomButton from "../../components/common/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet } from "react-native";
import ImageBrowserScreen from "./ImageBrowserScreen";
import Logout from "../../screens/Logout/index";
import logoutUser from "../../context/actions/logoutUser";
import { GlobalContext } from "../../context/Provider";
import { useContext } from "react";

const Settings = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [chosenAssets, setChosenAssets] = useState([]);
  _getHeaderLoader = () => (
    <ActivityIndicator size='small' color={'#ffffff'}/>
  );

  const {
    authDispatch,
    authState: { error, loading},
  } = useContext(GlobalContext);


  const imagesCallback = (callback) => {
    console.log("hello2");

    callback.then(async (photos) => {
      console.log(photos);

      const cPhotos = [];
      for(let photo of photos) {
        const pPhoto = await _processImageAsync(photo.uri);
        cPhotos.push({
          uri: pPhoto.uri,
          name: photo.filename,
          type: 'image/jpg'
        })
      }
    })
    .catch((e) => console.log(e));
  };

  async function _processImageAsync(uri) {
    const file = await ImageManipulator.manipulateAsync(
      uri,
      [{resize: { width: 1000 }}],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return file;
  };

  // _renderDoneButton = (count, onSubmit) => {
  //   if (!count) return null;
  //   return <TouchableOpacity title={'Done'} onPress={onSubmit}>
  //     <Text onPress={onSubmit}>Done</Text>
  //   </TouchableOpacity>
  // }


  // updateHandler = (count, onSubmit) => {
  //   callback.setOptions({
  //     title: `Selected ${count} files`,
  //     headerRight: () => _renderDoneButton(count, onSubmit)
  //   });
  // };

  const updateHandler = (count, onSubmit) => {
    console.log(callback.then(async (photos)))
    console.log(`count: ${count}  ::  onSubmit: ${JSON.stringify(onSubmit)}`);
  };
  
  const emptyStayComponent = <Text style={styles.emptyStay}>Empty =(</Text>;
  const noCameraPermissionComponent = (
    <Text style={styles.emptyStay}>No access to camera</Text>
  );

  const NameValueRow = ({ name, value }) => {
    return (
      <View style={styles.nameValueContainer}>
        <Text style={styles.textName}>{name}: </Text>
        <Text style={styles.textValue}>{value}</Text>
      </View>
    );
  };

  renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );


  const AssetInfo = ({ assetInfo }) => {
    //
    // table of properties: https://docs.expo.io/versions/v39.0.0/sdk/media-library/#asset
    //
    return (
      <View key={`${assetInfo.id}`} style={{ borderBottomWidth: 1 }}>
        <NameValueRow name={'filename'} value={assetInfo.filename} />
        <NameValueRow name={'mediaType'} value={assetInfo.mediaType} />
        <NameValueRow name={'width'} value={assetInfo.width} />
        <NameValueRow name={'height'} value={assetInfo.height} />
      </View>
    );
  };


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onSubmitRL = () => {
    console.log("helloRL");
    setModalVisible(!isModalVisible);
  };
  const onSubmitGL = () => {
    console.log("helloGL");
  };
  const onSubmitReset = () => {
    console.log("helloReset");
  };
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

  return (
    <SafeAreaView style={{flex: 1}}>
      <Text style={{ paddingTop: 7, paddingHorizontal: 20 }}>
        Load Library
      </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <CustomButton onPress={onSubmitRL} primary title="Load Library" />
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

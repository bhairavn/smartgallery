import { Text, View } from "react-native";
import { useState } from "react";
import React from "react";
import CustomButton from "../../components/common/CustomButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import { ImageBrowser } from "expo-image-picker-multiple";
import { StyleSheet } from "react-native";
import { launchImageLibraryAsync } from "expo-image-picker-multiple";

const Settings = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [chosenAssets, setChosenAssets] = useState([]);
  

  const imagesCallback = (callback) => {
    callback
      .then((photos) => {
          console.log(photos);
        setChosenAssets(photos);
      })
      .catch((e) => console.log(e));
  };

  console.log(chosenAssets)
  
  const updateHandler = (count, onSubmit) => {
    console.log(`count: ${count}  ::  onSubmit: ${JSON.stringify(onSubmit)}`);
  };

  const renderSelectedComponent = (number) => (
    <View style={styles.countBadge}>
      <Text style={styles.countBadgeText}>{number}</Text>
    </View>
  );

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
    console.log("hello");
    setModalVisible(!isModalVisible);
  };


  return (
    <SafeAreaView>
      <Text style={{ paddingTop: 20, paddingHorizontal: 20 }}>
        ADD Images into the Database
      </Text>
      <View style={{ paddingHorizontal: 20 }}>
        <CustomButton onPress={onSubmitRL} primary title="Load Library" />
      </View>

      <Modal isVisible={isModalVisible}>
        <View style={{ flex: 1,paddingHorizontal: 25 }}>
          <ImageBrowser
            max={10000}
            onChange={updateHandler}
        callback={imagesCallback}
        renderSelectedComponent={renderSelectedComponent}
        emptyStayComponent={emptyStayComponent}
        noCameraPermissionComponent={noCameraPermissionComponent}

          />
          <View style={{ flexDirection: "row" }}>
            <View style={{flex:1, paddingHorizontal: 20 }}>
              <CustomButton title="Hide modal" primary onPress={toggleModal} />
            </View>
            <View style={{flex:1, paddingHorizontal: 20 }}>
              <CustomButton
                title="Done"
                primary
                // onPress={}
              />
            </View>
          </View>
        </View>
        <View style={styles.divider} />
      {chosenAssets.length > 0 ?
        chosenAssets.map((asset) => <AssetInfo assetInfo={asset} />)
      : <Text style={styles.textNoSelection}>No images selected</Text>}
      <View style={styles.screenBottomPadding} />

      </Modal>
       
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
  });

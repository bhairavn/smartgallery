import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
} from 'react-native';
import ImageGallery from '../Settings/ImageGallery';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Searchbar } from 'react-native-paper';
import CustomButton from '../../components/common/CustomButton';
import ImageTile from '../Settings/ImageTile';
import { ImageBackground } from 'react-native';
import { Button } from 'react-native';
const {width} = Dimensions.get('window');

const DisplayGallery = () => {
  const [farr, setarr] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [Filter, setFilter] = useState(true);

  const onChangeSearch = query => setSearchQuery(query);

  const onSearch = async() => {
    // console.log(searchQuery);
  try {
    const value = await AsyncStorage.getItem("PhotosData");
    if (value !== null) {
        console.log("Loaded from async");
        console.log(searchQuery);
        // console.log(value);
        pdata=JSON.parse(value);
        // console.log(pdata.length);
        var imageuri = []
        for (var i=0; i <pdata.length; i++) {
          
          // if (pdata[i].Label == searchQuery ){
            if (typeof pdata[i].Label!== 'undefined')
            { 
            if(pdata[i].Label.toLowerCase().match(searchQuery.toLowerCase())){
          // console.log((pdata[i]));
          console.log("infor");
          imageuri = [...imageuri, pdata[i]];
          }
        }
       }
    }
      // console.log(imageuri.length);
      setarr(imageuri);
      setFilter(false);
      // return imageuri;
  }
  catch (error) {
    // Error retrieving data
    console.log(error);
  }
    }
  if (!searchQuery){
    imageuri=[];
    // setFilter(true);
  }
  console.log("*")
  console.log(farr);


  renderImageTile = ({item, index}) => {
    return (
      <ImageTile
        item={item}
        index={index}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: "row" , justifyContent: 'space-evenly'}}>
      <Searchbar
      style={{width:3.3*width/4}}
      placeholder="Search"
      onChangeText={onChangeSearch}
      onIconPress={onSearch}
      value={searchQuery} 
    />
    <CustomButton style={{width:width*0.7/4,backgroundColor:'grey'}} onPress={()=>{setFilter(true)
      , setSearchQuery('')
      }} primary title="Reset"/>
    </View>
    {Filter ? (
    <ImageGallery  
    max={1}
    onChange={()=>{}}
   callback={()=>{}}
   />):(

<View style={styles.container}>

<FlatList
  data={farr}
  keyExtractor={item => item.id}
  numColumns={4}
  renderItem={({item}) => 
   (
  <View style={{ position: 'relative' }}>
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <ImageBackground
      style={{ width: width / 4, height: width / 4 }}
      source={{uri : item.uri}} >
    </ImageBackground>
  </View>
  </View> 
  )
  }
  />
</View>
)
}
      </SafeAreaView>
  );
};
export default DisplayGallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  titleStyle: {
    padding: 16,
    fontSize: 20,
    color: 'white',
    backgroundColor: 'green',
  },
  imageContainerStyle: {
    flex: 1,
    flexDirection: 'column',
    margin: 1,
  },
  imageStyle: {
    height: 120,
    width: '100%',
  },
  fullImageStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '98%',
    resizeMode: 'contain',
  },
  modelStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  closeButtonStyle: {
    width: 25,
    height: 25,
    top: 50,
    right: 20,
    position: 'absolute',
  },
});
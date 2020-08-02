import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import { Image} from 'react-native';

export default function SplashScreenVideo  ({navigation})  {
    setTimeout(()=>{navigation.replace('Home')},15000)
  return(<Image
            style={{ width: 100, height: 100 ,margin:170}}
            source={require('./loo.png')}
          />) 
};
SplashScreenVideo.navigationOptions = ({ navigation }) => ({
  title: 'Login',
  headerShown: false,
  headerMode:'none',
});
const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold'
  },
  innerText: {
    color: 'red'
  }
});



import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Reset from './components/Reset';
import Services from './components/Services';
import HomeScreen from './src/HomeScreen/HomeScreen';
import AdminServices from './components/AdminServices';
import SplashScreenVideo from './components/SplashScreenVideo';


const RootStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    Home: Home,
    Reset: Reset,
    Services:Services,
    HomeScreen : HomeScreen ,
    AdminServices:AdminServices,
    SplashScreenVideo:SplashScreenVideo,
  },
  {
    initialRouteName: 'SplashScreenVideo',
   
    defaultNavigationOptions: {
      headerTitleStyle: {
        fontWeight: 'bold',
        fontStyle:'oblique',
        
      },
    },
  },
);

const RootContainer = createAppContainer(RootStack);

export default function App() {
  return (
    <RootContainer />
  )
}
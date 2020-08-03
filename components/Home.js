import React, { useState, useEffect } from 'react';
import {  Text ,Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import HomeScreen from './../src/HomeScreen/HomeScreen';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import { FAB } from 'react-native-paper';
import { Container, Header, View, Button,  Footer, FooterTab,Badge, Fab } from 'native-base';



export default function Home({ navigation }) {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
     
    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);
     
    if (initializing) return null;
     
    if (!user) {
        return navigation.navigate('Login');
    }
   
    return (
        <>
      
        <HomeScreen/>
           <Footer>
          <FooterTab>
            <Button  style={{ backgroundColor: "white" }}  badge vertical>
              <Badge><Text>2</Text></Badge>
              <Icon name="apps"  style={{ backgroundColor: "#FF9501" }} />
              <Text>Apps</Text>
            </Button>
            <Button style={{ backgroundColor: "white" }} vertical>
              <Icon name='person'  style={{ backgroundColor: "#FF9501" }} />
              <Text>About Me</Text>
            </Button>
            <Button style={{ backgroundColor: "white" }}  badge vertical  onPress={()=>navigation.navigate('AdminServices')}>
              <Badge ><Text>51</Text></Badge>
              <Icon active name="folder"  style={{ backgroundColor: "#FF9501" }}/>
              <Text>Services</Text>
            </Button>
            {(('shaaprombo@gmail.com'==user.email))||(('kanyoualex@gmail.com'==user.email)) ? (
            <Button style={{ backgroundColor: "white" }} vertical onPress={() => navigation.navigate('Services')} >
            <Icon name="home"  style={{ backgroundColor: "#FF9501" }} />
            <Text>New</Text>
          </Button>
        ) : null}

            
          </FooterTab>
        </Footer>
      </>
    );
}

Home.navigationOptions = ({ navigation }) => ({
    title: '  Just Pay',
    headerRight: () => 
            <Button  transparent style={{ backgroundColor: "white" ,margin:20}}  onPress={() => {auth().signOut()}} >
              <Icon name='cancel'   />
              <Text>Log out</Text>
            </Button>,
                
         
            headerLeft: () =>    <Image
            style={{ width: 50, height: 50,marginLeft: 20 }}
            source={require('./loo.png')}
          />,
});

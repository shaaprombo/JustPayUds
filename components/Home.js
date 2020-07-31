import React, { useState, useEffect } from 'react';
import {  Text ,Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import HomeScreen from './../src/HomeScreen/HomeScreen';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { Container, Header, View, Button, Icon, Footer, FooterTab,Badge, Fab } from 'native-base';



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
      
        <HomeScreen  />
           <Footer>
          <FooterTab>
            <Button light badge vertical>
              <Badge><Text>2</Text></Badge>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button light vertical>
              <Icon name="person" />
              <Text>About Me</Text>
            </Button>
            <Button light  badge vertical  onPress={()=>navigation.navigate('AdminServices')}>
              <Badge ><Text>51</Text></Badge>
              <Icon active name="pulse" />
              <Text>Services</Text>
            </Button>
            {'shaaprombo@gmail.com'==user.email ? (
            <Button light vertical onPress={() => navigation.navigate('Services')} >
            <Icon name="home" />
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
    headerRight: () => <Button
            buttonStyle={{ padding: 5, marginRight: 20, backgroundColor: 'transparent' }}
            icon={
                <Icon
                    name="cancel"
                   
                />
            }
            onPress={() => {auth().signOut()}} />,
            headerLeft: () =>    <Image
            style={{ width: 50, height: 50,marginLeft: 20 }}
            source={require('./loo.png')}
          />,
});

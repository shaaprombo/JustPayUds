import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Fab, Footer, FooterTab,
   Text, Button, Icon, Left, Body, Right , View, Badge } from 'native-base';
import  { useState, useEffect } from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import database from '@react-native-firebase/database';


export default   function HomeScreen ({ navigation }){
  const [services, setServices] = React.useState([]);
  React.useEffect(() => {
    const userRef=database().ref('/Services');
    const OnloadingListener=userRef.on('value',snapshot=>{
      setServices([]);
      snapshot.forEach(function(childSnapshot){
         setServices(services=> [...services,childSnapshot.val()]);
      });

    });
    return ()=>{userRef.off('value', OnloadingListener)}
}, []);
 


    return (
      <Container>
      
        
       
        <Content>
          
         {
           services.map((item,idex)=>(
            <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri:item.image}} />
                <Body>
                  <Text>{item.Nom}</Text>
                  <Text note>{item.Description}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri:item.image}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent >
                  <Icon active name="thumbs-up"/>
           <Text>{item.Prix} Frcfa</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
           <Text>4 </Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
          

           ))
         }

       
        </Content>
     
      
      </Container>
    );
  }

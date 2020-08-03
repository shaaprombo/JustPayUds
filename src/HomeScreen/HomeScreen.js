import React, { Component } from 'react';
import { Image ,FlatList} from 'react-native';
import { Icon } from 'react-native-elements';
import { Container, Header, Content, Card, CardItem,
   Thumbnail, Fab, Footer, FooterTab, Input,List,
   Text, Button,Left, Body, Right , View, Badge ,Item} from 'native-base';
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
import _ from 'lodash'


export default   function HomeScreen ({ navigation }){
  const [services, setServices] = React.useState([]);
  const [servicesFind, setServicesFind] = React.useState([]);
  React.useEffect(() => {
    const userRef=database().ref('/Services');
    const OnloadingListener=userRef.on('value',snapshot=>{
      setServices([]);
      snapshot.forEach(function(childSnapshot){
         setServices(services=> [...services,childSnapshot.val()]);
         setServicesFind(servicesFind=> [...servicesFind,childSnapshot.val()]);
       
      });

    });
    return ()=>{userRef.off('value', OnloadingListener)}
}, []);

handlesearch=(text)=>{
  const formattedQuery=text.toLowerCase()
    const services=_.filter(servicesFind,photo=>{
    if(photo.Nom.includes( formattedQuery)){
      return true
    }
    return false
  })
 setServices(services)
}
 
_renderItem=({item,index})=>{
  return(
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
          <Icon active name="home"/>
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
  

  )
}

    return (
      <Container>
        <Header searchBar rounded      style={{ backgroundColor: '#ff8000' }}
          androidStatusBarColor="#cc7a00" >
          <Item>
          <Icon name="search" />
            <Input placeholder="Search" onChangeText={handlesearch}  />
          </Item>
        </Header>
        
       
        <Content>
          <List>
            <FlatList
            data ={services} 
            renderItem={_renderItem}
            keyExtractor={(item,index)=>index.toString()}
            />
          </List>
        

       
        </Content>
     
      
      </Container>
    );
  }

import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, Body, Right, Thumbnail, Text ,Button, Icon } from 'native-base';
import database from '@react-native-firebase/database';

export default function AdminServices({ navigation }){

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
          <List>
          {
           services.map((item,idex)=>(
            <ListItem avatar>
              <Left>
                <Thumbnail source={{ uri:item.image}} />
              </Left>
              <Body>
                <Text>{item.Nom}</Text>
                <Text note>{item.Description}</Text>
              </Body>
              <Right>
                <Text note>{item.Prix} Frcfa</Text>
              </Right>
            </ListItem>

           ))
        }

          </List>
        </Content>
      </Container>
    );
  }

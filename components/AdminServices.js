import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Left, 
  Body, Right, Thumbnail, Text ,Button, Icon , Switch ,Separator , H1, H2, H3, Card,Label } from 'native-base';
import database from '@react-native-firebase/database';

export default function AdminServices({ navigation }){


    const [services, setServices] = React.useState([]);

  const deleteUser =Item =>{
    database()
    .ref('Services/'+Item.Id)
    .remove()
    .then(()=>{})
    .catch(err=>{
      console.log(err);
    });
    alert('jggfhfg')
  };

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
        <Separator bordered>
           
           </Separator>
       
           <Text></Text>
          <Left>
              <H2  style={{
          padding: 10,
          
       
        }}>Gestion des services</H2>
         
              <Text  style={{
          padding: 10,
          fontStyle: "italic",
       
        }}>espace de maintenance des services</Text>
         </Left>


          {
           services.map((item,idex)=>(
           <ListItem icon>
            <Left>
              <Button style={{ backgroundColor: "#FF9501" }} onPress={()=>deleteUser(item)}>
                <Icon active name="trash" />
              </Button>
            </Left>
            <Body>
              <Text>{item.Nom}</Text>
            </Body>
            <Right>
              <Switch value={false} />
            </Right>
          </ListItem>

           ))
        }

        </Content>
      </Container>
    );
  }

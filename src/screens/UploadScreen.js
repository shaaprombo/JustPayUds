import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  Image
} from 'react-native';
import { Icon } from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import firebase from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {submitService} from './../../components/ApiServices';
import database from '@react-native-firebase/database';
import { Text,Thumbnail,Container, Header, Left, Body, Right, Title, Subtitle,
   Content, Form, Item, Input,Button,CardItem,Separator , H1, H2, H3, Card,Label } from 'native-base'








export default function UploadScreen() {

const [image, setImage] = useState(null);
const [uploading, setUploading] = useState(false);
const [transferred, setTransferred] = useState(0);
const [NomService, setNomService] = useState('');
const [PrixService, setPrixService] = useState('');
const [DescriptionService, setDescriptionService] = useState('');
const [services, setServices] = React.useState([]);
const [Lien, setLien] = React.useState([]);
const [Id, setId] = useState(null);

//const [confirmPassword, setConfirmPassword] = useState('');



  const onFooterLinkPress = () => {
        navigation.navigate('Login')
        
  }
    
  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log(source);
        setImage(source);
      }
    });
  };

  const uploadImage = async () => {
    
    const { uri } = image;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);

    const task = storage()
      .ref(filename)
      .putFile(uploadUri);
      console.log("voici le"+uploadUri);
    // set progress state
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    task.then(imageSnapshot=>{
      console.log('first pas man');
      storage().ref(imageSnapshot.metadata.fullPath)
      .getDownloadURL()
      .then(downloadURL=>{
        


    submitService(Id,NomService, PrixService, DescriptionService,downloadURL)
    .then(result => {
      setId(null);
      setNomService('');
      setPrixService('');
      setDescriptionService('');
     
       
    }).catch(error => {
        console.log(error);
    });
    alert('yes ok!');
       
        console.log(" ok"+" " +downloadURL);
       

      });
    });

    try {
      await task;
    } catch (e) {
      console.error(e);
    }
    setUploading(false);
    Alert.alert(
      'Photo uploaded!',
      'Your photo has been uploaded to Firebase Cloud Storage!'
    );
    
    setImage(null);
    setNomService('');
    setPrixService('');
    setDescriptionService('');
     
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
          
       
        }}>Nouveau service</H2>
         
              <Text  style={{
          padding: 10,
          fontStyle: "italic",
       
        }}>remplissez les informations de ce nouveau service</Text>
         </Left>
     
            
          
         
   
          
    
      
        
      <Form>
        <Item floatingLabel >
          <Label>Name</Label>          
            <Input onChangeText={(text) => setNomService(text)}/>
        </Item>
        <Item floatingLabel last>
              <Label>Prix</Label>
              <Input onChangeText={(text) => setPrixService(text)}/>
         </Item>
          <Item floatingLabel last>
              <Label>Description</Label>
              <Input onChangeText={(text) => setDescriptionService(text)} />
          </Item>  

       </Form>
       <Separator bordered>
           
          </Separator>
      
       <Button  block warning   onPress={selectImage}>
           <Icon name="photo" color="white" />
              <Text>Add photo</Text>
        </Button>   
        <Text></Text>             
               
        {image !== null ? (
          <Thumbnail large source={{uri:image.uri}} />
        ) : null}

        {uploading ? (
          <View >
            <Progress.Bar progress={transferred} width={300} />
          </View>
        ) : (
          <Button block info  onPress={uploadImage}>
          <Icon name="save" color="white" />
             <Text>Add Services</Text>
       </Button>
          
        )}
           </Content>
      </Container>
        
     
  );
}


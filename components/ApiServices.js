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
import database from '@react-native-firebase/database';
import { Text,Thumbnail,Container, Header, Left, Body, Right, Title, Subtitle,
   Content, Form, Item, Input,Button,CardItem,Separator , H1, H2, H3, Card,Label } from 'native-base'








export const submitService = (Id,NomService, PrixService, DescriptionService,image) => {
  return new Promise(function(resolve, reject){
     let key;
     if(Id!=null){
         key=Id;
     }else{
         key=database().ref().push().key;
     }

      let dataToSave = { 
          Id:key, 
          Nom: NomService,
          Prix: PrixService,
          Description: DescriptionService,
          image: image ,
      };
      database()
          .ref('Services/'+key)
          .update(dataToSave)
          .then(snapshot=>{
              resolve(snapshot);
          })
          .catch(err => {
              reject(err);
          });
  });
};


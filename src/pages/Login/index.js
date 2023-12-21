import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, TextInput, Image, TouchableOpacity, KeyboardAvoidingView, Platform, View, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import fb from '../../services/firebase/firebase';
import uuid from 'react-native-uuid';

import { getAuth, onAuthStateChanged } from 'firebase/auth';

import Contacts from '../../services/sqlite/Contacts';
import Chats from '../../services/sqlite/Chat';
import Messages from '../../services/sqlite/Messages';
import styles from './styles';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import PictureInit from '../../services/sqlite/PictureInit';

export default function Login() {

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  //const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(true);
  //const [contactID, setContactID] = useState('');
  //const [contactName, setContactName] = useState('');
  //const [contactPicture, setContactPicture] = useState('');

  function navigateToContacts(userName, userPassword) {
    if(userName.length > 0 && userPassword.length > 5){
      fb.loginUser(userName, userPassword)
      onAuthStateChanged(getAuth(), (user) =>{
        if(user) {
          navigation.navigate('Contacts', {userName});
        }
      })
    }else{
        Alert.alert('Warning','You must put a valid name and password to continue', [
            {text: 'OK'}
        ])
    }
    newUserName(userName)
  }

  function navigateToRegister() {
      navigation.navigate('Register');
  }

  function isVisible() {
    setVisible(!visible)
  }

  function newContact(){
    const contactID = "1";//uuid.v4();
    const contactName = 'User';
    const contactPicture = require("../../assets/JokerPicture.png");
    const newData = {
      contactID,
      contactName,
      contactPicture,
    }
    //console.log(newData);
    //Contacts.createTBContacts()
    //Contacts.createContact(newData)
    //  .then( contact => console.log(contact) )
    //  .catch( err => console.log(err) )
    Contacts.allContact()
      .then( contact => console.log(contact) )
      .catch( err => console.log(err) )
    //Chats.allChat()
    //  .then( contact => console.log(contact) )
    //  .catch( err => console.log(err) )
    //Messages.allMessages()
    //  .then( contact => console.log(contact) )
    //  .catch( err => console.log(err) )
    //Contacts.deleteAll()
    //Chats.createTBChat()
    // Chats.deleteAll()
    // Messages.createTBMessages()
    // Messages.deleteAll()
  }

  function newUserName(name){
    const picture = require("../../assets/JokerPicture.png");
    const newName = {
      name,
      picture,
    }
    Contacts.updateContact("1", newName)
      .then( contact => console.log(contact) )
      .catch( err => console.log(err) )
  }

  useEffect(() => newContact(),[]);
  useEffect(() => {
    PictureInit.yusukeInit();
    PictureInit.annInit();
    PictureInit.ryujiInit();
    PictureInit.annInit();
    PictureInit.makotoInit();
    PictureInit.futabaInit();
    PictureInit.goroInit();
    PictureInit.haruInit();
  }, [])

  return (
      <ImageBackground source={require("../../assets/CleanBackground.png")} resizeMode="stretch" style={styles.background}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} 
            style={styles.container}
          >
            <View style={styles.inner}>
              <Image 
                  source={require("../../assets/LoginLogo.png")} 
                  resizeMode="stretch" 
                  style={styles.image}>
              </Image>
              <Text style={styles.text}>Welcome to the Navi App!</Text>
              <TextInput 
                  style={styles.input} 
                  placeholder='Enter your name' 
                  placeholderTextColor={'white'}
                  onChangeText={(value) => setName(value)}
                  maxLength={25}
                  autoCorrect={false}
              />
              <TextInput 
                  style={styles.input} 
                  placeholder='Enter your Password' 
                  placeholderTextColor={'white'}
                  onChangeText={(value) => setPassword(value)}
                  maxLength={25}
                  autoCorrect={false}
                  secureTextEntry={visible}
              />
              {visible ? 
                <Text onPress={()=>{isVisible()}}>Show Password</Text>
                :
                <Text onPress={()=>{isVisible()}}>Hide Password</Text>
              }
              <View style={styles.buttonLayout}>
                <TouchableOpacity style={styles.button} onPress={() => navigateToContacts(name, password)}>
                  <Text style={styles.buttontext}>
                    Login
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigateToRegister()}>
                  <Text style={styles.buttontext}>
                    SignUp
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
      </ImageBackground>
  );
}

import React, { useState, useEffect } from 'react';
import { Text, ImageBackground, TextInput, Image, Alert, TouchableOpacity, KeyboardAvoidingView, Platform, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import uuid from 'react-native-uuid';

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
  const [submitted, setSubmitted] = useState(false);
  const [visible, setVisible] = useState(true);
  //const [contactID, setContactID] = useState('');
  //const [contactName, setContactName] = useState('');
  //const [contactPicture, setContactPicture] = useState('');

  var firebaseConfig = {
    apiKey: "AIzaSyBrn8PcNGwMuMC3GTs9S75cWZwlAfQVoqg",
    authDomain: "naviapp-48f99.firebaseapp.com",
    projectId: "naviapp-48f99",
    storageBucket: "naviapp-48f99.appspot.com",
    messagingSenderId: "824854218169",
    appId: "1:824854218169:web:a03fd81e56d01f42352268"
  };

  const app = initializeApp(firebaseConfig);
  const fdb = getFirestore(app)
  const auth = getAuth(app);

  function navigateToContacts(userName, userPassword) {
    if(name.length > 0 && password.length > 5){
      signInWithEmailAndPassword(auth, userName.replace(/ /g, '') + '@navi.com', userPassword)
        .then((userCredential) => {
            var user = userCredential.user;
            Alert.alert('Success' ,`Logged in as ${userName}`, [{text: 'OK'}])
            newUserName(userName)
            setSubmitted(!submitted);
            navigation.navigate('Contacts', {userName});
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            Alert.alert('Error', errorMessage, [{text: 'OK'}])
        });
    }else{
      Alert.alert('Warning','You must put a valid name and password to continue', [
        {text: 'OK'}
      ])
    }
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

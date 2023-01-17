import React, { useState } from 'react';
import { Text, View, ImageBackground, TextInput, Image, Alert, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Login() {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [submitted, SetSubmitted] = useState(false);

    function navigateToContacts(userName) {
      if(name.length > 0){
        SetSubmitted(!submitted);
        navigation.navigate('Contacts', {userName});
      }else{
        Alert.alert('Warning','You must put a name to continue', [
          {text: 'OK'}
        ])
      }
    }

    return (
        <ImageBackground source={require("../../assets/CleanBackground.png")} resizeMode="stretch" style={styles.background}>
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} style={styles.container}>
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
                />
                <TouchableOpacity style={styles.button} onPress={() => navigateToContacts(name)}>
                  <Text style={styles.buttontext}>
                    Login
                  </Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}

/*<PressableButton
  onPressFunction={onPressHandler}
/>
{submitted ?
  <Text style={styles.text}>Registered as {name}</Text>
  :
  null
}*/
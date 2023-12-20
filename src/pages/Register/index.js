import { React, useState } from "react";
import { ImageBackground, View, KeyboardAvoidingView, Image, Text, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
//import fb from '../../services/firebase/firebase';
import styles from './styles';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

export default function Register() {
    
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(true);

    var firebaseConfig = {
        apiKey: "AIzaSyBrn8PcNGwMuMC3GTs9S75cWZwlAfQVoqg",
        authDomain: "naviapp-48f99.firebaseapp.com",
        projectId: "naviapp-48f99",
        storageBucket: "naviapp-48f99.appspot.com",
        messagingSenderId: "824854218169",
        appId: "1:824854218169:web:a03fd81e56d01f42352268"
    };

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    
    function navigateBack() {
        navigation.goBack();
    }

    function isVisible() {
        setVisible(!visible)
    }

    function createUser(userName, userPassword) {
        if(userName.includes('@') === false && userName.includes('.') === false){
            if(userName.length > 0 && userPassword.length > 5){
                createUserWithEmailAndPassword(auth, userName.replace(/ /g, '') + '@navi.com', userPassword)
                    .then((userCredential) => {
                        var user = userCredential.user;
                        Alert.alert('Success' ,`User ${userName} created successfully`, [{text: 'OK'}])
                        navigation.navigate('Login');
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        Alert.alert('Error', errorMessage, [{text: 'OK'}])
                    });
                
            }else{
                Alert.alert('Warning','You must put a valid name and password to continue (@ and . are not allowed)', [
                {text: 'OK'}
                ])
            }
        }else{
            Alert.alert('Warning','You must put a valid name and password to continue (@ and . are not allowed)', [
                {text: 'OK'}
                ])
        }
    }

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
                    <Text style={styles.text}>Register to the Navi App!</Text>
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
                        <TouchableOpacity style={styles.button} onPress={() => {createUser(name, password)}}>
                            <Text style={styles.buttontext}>
                                Create
                            </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => {navigateBack()}}>
                            <Text style={styles.buttontext}>
                                Back
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}
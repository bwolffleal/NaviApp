import { React, useState } from "react";
import { ImageBackground, View, KeyboardAvoidingView, Image, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import styles from './styles'

export default function Register() {
    
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    
    function navigateBack() {
        navigation.goBack();
    }

    function isVisible() {
        setVisible(!visible)
      }
  
    function isPasswordShown() {
    if (visible){
        return secureTextEntry;
    }
    }

    function createUser(userName, userPassword) {
        if(name.length > 0 && password.length > 0){
          //newUserName(userName)
          //setSubmitted(!submitted);
          console.log(`User Name: ${userName}`)
          console.log(`Password: ${userPassword}`)
          navigation.navigate('Login');
        }else{
          Alert.alert('Warning','You must put a valid name and password to continue', [
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
                        secureTextEntry
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
import React from 'react';
import { Text, View, ImageBackground, Image, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

import db from '../../../openDatabase';
import styles from './styles';

export default function Profile({route}) {

    const navigation = useNavigation();
    const { userName } = route.params;

    function navigateBack() {
        navigation.goBack();
    }

    function showEmail(userEmail) {
        Alert.alert('Email', userEmail.replace(/ /g, '') + '@navi.com', [{text: 'OK'}])
    }

    return (
        <ImageBackground source={require("../../assets/Background.png")} resizeMode="stretch" style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.button} onPress={navigateBack}>
                        <Feather name="corner-up-left" size={30}/>
                    </TouchableOpacity>
                </View>
                <Image source={require("../../assets/JokerPicture.png")} 
                    resizeMode="stretch" 
                    style={styles.image}>
                </Image>
                <Text style={styles.text} onPress={() => Alert.alert('User Name', userName, [{text: 'OK'}])}>User Name: {userName}</Text>
                <Text style={styles.text} onPress={() => Alert.alert('Codename', 'Joker', [{text: 'OK'}])}>Codename: Joker</Text>
                <Text style={styles.text} onPress={() => showEmail(userName)}>Email: {userName.replace(/ /g, '')}@navi.com</Text>
            </View>
        </ImageBackground>
    );
}

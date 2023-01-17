import React from 'react';
import { ImageBackground, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Configurations() {

    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack();
    }

    function navigateToLogin() {
        navigation.navigate('Login');
    }

    return (
        <ImageBackground source={require("../../assets/Background.png")} resizeMode="stretch" style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.button} onPress={navigateBack}>
                        <Feather name="corner-up-left" size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contacts}>
                    <TouchableOpacity style={styles.contactInfo}>
                            <Feather name="tool" size={30}/>
                            <Text style={styles.contactName}>Options 1</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactInfo}>
                            <Feather name="tool" size={30}/>
                            <Text style={styles.contactName}>Options 2</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactInfo}>
                            <Feather name="tool" size={30}/>
                            <Text style={styles.contactName}>Options 3</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactInfo} onPress={navigateToLogin}>
                            <Feather name="log-out" size={30}/>
                            <Text style={styles.contactName}>Log Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

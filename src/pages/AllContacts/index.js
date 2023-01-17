import { React, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground, Text, View, Image, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';


export default function AllContacts() {

    const navigation = useNavigation();
    const [name, setName] = useState('');

    function navigateBack() {
        navigation.goBack();
    }

    function contactInfo(contactName) {
        setName(contactName) 
        console.log(name)
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
                    <FlatList data={[1]} keyExtractor={contact => String(contact)} showsVerticalScrollIndicator={false} renderItem={()=>(
                        <View>
                            <TouchableOpacity style={styles.contactInfo} onPress={() => contactInfo('Ryuji Sakamoto')}>
                                <Image source={require("../../assets/SkullPicture.png")} 
                                    resizeMode="stretch" 
                                    style={styles.image}>
                                </Image>
                                <Text style={styles.contactName}>Ryuji Sakamoto</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contactInfo} onPress={() => contactInfo('Ann Takamaki')}>
                                <Image source={require("../../assets/PantherPicture.png")} 
                                    resizeMode="stretch" 
                                    style={styles.image}>
                                </Image>
                                <Text style={styles.contactName}>Ann Takamaki</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contactInfo} onPress={() => contactInfo('Yusuke Kitagawa')}>
                                <Image source={require("../../assets/FoxPicture.png")} 
                                    resizeMode="stretch" 
                                    style={styles.image}>
                                </Image>
                                <Text style={styles.contactName}>Yusuke Kitagawa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contactInfo} onPress={() => contactInfo('Makoto Nijima')}>
                                <Image source={require("../../assets/QueenPicture.png")} 
                                    resizeMode="stretch" 
                                    style={styles.image}>
                                </Image>
                                <Text style={styles.contactName}>Makoto Nijima</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contactInfo} onPress={() => contactInfo('Futaba Sakura')}>
                                <Image source={require("../../assets/OraclePicture.png")} 
                                    resizeMode="stretch" 
                                    style={styles.image}>
                                </Image>
                                <Text style={styles.contactName}>Futaba Sakura</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contactInfo} onPress={() => contactInfo('Haru Okumura')}>
                                <Image source={require("../../assets/NoirPicture.png")} 
                                    resizeMode="stretch" 
                                    style={styles.image}>
                                </Image>
                                <Text style={styles.contactName}>Haru Okumura</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.contactInfo} onPress={() => contactInfo('Goro Akechi')}>
                                <Image source={require("../../assets/CrowPicture.png")} 
                                    resizeMode="stretch" 
                                    style={styles.image}>
                                </Image>
                                <Text style={styles.contactName}>Goro Akechi</Text>
                            </TouchableOpacity>
                        </View>
                    )}/>
                </View>
            </View>
        </ImageBackground>
    );
}
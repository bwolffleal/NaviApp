import { React, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


import styles from './styles';

export default function Contacts({route}) {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [searchTab, SetSearchTab] = useState(false);
    const [moreTab, SetMoreTab] = useState(false);
    const { userName } = route.params;

    function navigateToChat() {
        SetSearchTab(false);
        SetMoreTab(false);
        navigation.navigate('Chat');
    }

    function navigateToConfigurations() {
        SetSearchTab(false);
        SetMoreTab(false);
        navigation.navigate('Configurations');
    }

    function navigateToAllContacts() {
        SetSearchTab(false);
        SetMoreTab(false);
        navigation.navigate('AllContacts');
    }

    function navigateToProfile() {
        SetSearchTab(false);
        SetMoreTab(false);
        navigation.navigate('Profile', {userName});
    }

    function openMoreMenu() {
        SetMoreTab(!moreTab);
    }

    function openSearch() {
        SetSearchTab(!searchTab);   
    }

    return (
        <ImageBackground source={require("../../assets/Background.png")} resizeMode="stretch" style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    {searchTab ?
                        <TextInput 
                            style={styles.input} 
                            placeholder='Enter contact name' 
                            placeholderTextColor={'white'}
                            onChangeText={(value) => setName(value)}
                            maxLength={25}
                        />
                        :
                        null
                    }
                    <TouchableOpacity style={styles.button} onPress={openSearch}>
                        <Feather name="search" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather name="more-vertical" size={30} onPress={openMoreMenu}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contacts}>
                    <FlatList data={[1, 2, 3, 4, 5, 6, 7]} keyExtractor={contact => String(contact)} showsVerticalScrollIndicator={false} renderItem={()=>(
                        <TouchableOpacity style={styles.contactInfo} onPress={navigateToChat}>
                            <Image source={require("../../assets/SkullPicture.png")} 
                                resizeMode="stretch" 
                                style={styles.image}>
                            </Image>
                            <Text style={styles.contactName}>Ryuji Sakamoto</Text>
                        </TouchableOpacity>
                    )}/>
                </View>
                {moreTab ?
                    <View style={styles.closeTab}>
                            <TouchableOpacity  style={styles.closeTab} onPress={openMoreMenu}>
                            </TouchableOpacity>
                    </View>
                    :
                    null
                }
                {moreTab ?
                    <View style={styles.configMenu}>
                        <View>
                            <TouchableOpacity style={styles.config} onPress={navigateToProfile}>
                                <Text style={styles.text}>Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.config} onPress={navigateToAllContacts}>
                                <Text style={styles.text}>New Chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.config} onPress={navigateToConfigurations}>
                                <Text style={styles.text}>Settings</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    null
                }
            </View>
        </ImageBackground>
    );
}

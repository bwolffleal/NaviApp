import { React, useState, useEffect, useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

import ContactsList from '../../services/sqlite/Contacts';
import ChatsList from '../../services/sqlite/Chat';
import MessagesList from '../../services/sqlite/Messages';
import styles from './styles';

export default function Contacts({route}) {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [searchTab, setSearchTab] = useState(false);
    const [moreTab, setMoreTab] = useState(false);
    const [contactChange, setContactChange] = useState(false);
    const [paramChange, setParamChange] = useState(false);
    const [contactData, setcontactData] = useState();
    const [chatData, setChatData] = useState();
    const [participantsData, setParticipantsData] = useState();
    const { userName } = route.params;
    let participantsNav = [];


    function handleContactList() {
        ChatsList.allChat()
            .then( contact => setcontactData(contact) )
            .catch( err => console.log(err) )
        handleContactChange()
    };

    useFocusEffect(useCallback(() => handleContactList(), []))
    //useEffect(() => handleContactList(), [])
    //useEffect(() => console.log(contactData), [])
    useEffect(() => handleContactSearch(name), [name])
    //useEffect(() => navigateToChat(chatData), [paramChange])

    function handleContactSearch(contactName) {
        ChatsList.findChatName(contactName)
            .then( contact => setcontactData(contact) )
            .catch( err => console.log(err) )
        if(name == ""){
            handleContactList()
        }
        handleContactChange()
    }

    function navigateToChat(item) {
        setSearchTab(false);
        setMoreTab(false);
        //if(paramChange == false) {
        MessagesList.findParticipants(item.chatID)
            //.then( participants => setParticipantsData({...participantsData, participants}) )
            .then( participants => console.log(participants) )
            //.then( participants => participantsNav = participants )
            .catch( err => console.log(err) )
        //}
        setChatData(item)
        //if(paramChange == true) {
            navigation.navigate('Chat', {item, participantsData});
        //}
        setParamChange(!paramChange)
    }

    function navigateToConfigurations() {
        setSearchTab(false);
        setMoreTab(false);
        navigation.navigate('Configurations');
    }

    function navigateToAllContacts() {
        setSearchTab(false);
        setMoreTab(false);
        setContactChange(!contactChange);
        navigation.navigate('AllContacts');
    }

    function navigateToProfile() {
        setSearchTab(false);
        setMoreTab(false);
        navigation.navigate('Profile', {userName});
    }

    function openMoreMenu() {
        setMoreTab(!moreTab);
    }

    function openSearch() {
        setSearchTab(!searchTab);
        if(searchTab == false){
            handleContactList()
        }
        else{
           setName("") 
        }   
    }

    function handleContactChange() {
        setContactChange(!contactChange)
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
                            autoCorrect={false}
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
                    <FlatList data={contactData} keyExtractor={item => item.chatID} showsVerticalScrollIndicator={false} extraData={contactChange} renderItem={({item})=>(
                        <TouchableOpacity style={styles.contactInfo} onPress={() => navigateToChat(item)}>
                            <Image source={{uri: "/Users/bernardoleal/Desenvolvimento/NaviApp/src"+item.chatPicture}} 
                                resizeMode="stretch" 
                                style={styles.image}>
                            </Image>
                            <Text style={styles.contactName}>{item.chatName}</Text>
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

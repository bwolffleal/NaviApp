import { React, useState, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground, Text, View, Image, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import ContactsList from '../../services/sqlite/Contacts';
import ChatsList from '../../services/sqlite/Chat';
import MessagesList from '../../services/sqlite/Messages';
import styles from './styles';


export default function AllContacts() {

    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [chatName, setChatName] = useState('Group Chat');
    const [contactID, setContactID] = useState('');
    const [contactData, setContactData] = useState();
    const [chatID, setChatID] = useState();
    const [messageID, setMessageID] = useState([]);
    const [chatPicture, setChatPicture] = useState();
    const [checkedContact, setCheckedContact] = useState([]);
    const [contactChange, setContactChange] = useState(false);
    

    const isChecked = (id) => {
        return checkedContact.includes(id);
    };

    const toggleItem = (id) => {
        if (isChecked(id)) {
            setCheckedContact(checkedContact.filter(item => item !== id));
        }
        else {
            setCheckedContact([...checkedContact, id]);
        }
    };

    function navigateBack() {
        navigation.goBack();
        //console.log(userName)
        //let navName = userName.name
        //navigation.navigate('Contacts', {navName});
    }

    async function handleCreateChat([allContactsID]) {
        setMessageID(uuid.v4())
        if(allContactsID.length == 0) {
            Alert.alert('Warning','You must select at least one contact to continue', [
                {text: 'OK'}
            ])
        }
        if(allContactsID.length > 0) {
            handleChatCreation()
        }
    }

    function settingChatPicture(checkedContact) {
        setContactID(checkedContact)
        if(checkedContact.length > 0) {
            ContactsList.findContactPicture(checkedContact[0])
                .then( contact => setChatPicture(contact.picture) )
                .catch( err => console.log(err) )
            if(checkedContact.length == 1) {
                ContactsList.findContactID(checkedContact[0])
                    .then( contact => setChatName(contact.name) )
                    .catch( err => console.log(err) )
            } 
        }
    }

    function handleChatCreation() {
        ChatsList.createChat({chatID, chatName, chatPicture})
        const text = 'Has joined the chat'
        const time = new Date().getHours()+':'+new Date().getMinutes()
        let newChatParticipants = []
        let newMessageID = []
        for(let i=0; i<contactID.length; i++){
            newChatParticipants = contactID[i]
            newMessageID = messageID[i]
            MessagesList.createMessages({
                newMessageID,
                newChatParticipants,
                chatID,
                text,
                time,
            })
        }
        newChatParticipants = "1";
        newMessageID = uuid.v4();
        MessagesList.createMessages({
            newMessageID,
            newChatParticipants,
            chatID,
            text,
            time,
        })
        navigateBack()
    }

    function handleContactSearch(contactName) {
        ContactsList.findContactName(contactName)
            .then( contact => setContactData(contact) )
            .catch( err => console.log(err) )
        if(name === ""){
            handleContactList()
        }
        handleContactChange()
    }

    function handleContactChange() {
        setContactChange(!contactChange)
    }

    function handleContactList() {
        ContactsList.allContact()
            .then( contact => setContactData(contact) )
            .catch( err => console.log(err) )
        ContactsList.findContactID("1")
            .then( userName => setUserName(userName) )
            .catch( err => console.log(err) )
    };

    function handleChatName(name) {
        if(name.length < 1) {
            setChatName("Group Chat")
        }
        else {
            setChatName(name)  
        }

    }

    useEffect(() => handleContactList(), [])
    useEffect(() => setChatID(uuid.v4()), [])
    useEffect(() => setMessageID([...messageID, uuid.v4()]), [checkedContact])
    useEffect(() => settingChatPicture(checkedContact), [checkedContact])
    useEffect(() => handleContactSearch(name), [name])

    return (
        <ImageBackground source={require("../../assets/Background.png")} resizeMode="stretch" style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Enter contact name' 
                        placeholderTextColor={'white'}
                        onChangeText={(value) => setName(value)}
                        maxLength={25}
                        autoCorrect={false}
                    />
                    <TouchableOpacity style={styles.button} onPress={() => handleCreateChat([checkedContact])}>
                        <Feather name="plus" size={30}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={navigateBack}>
                        <Feather name="corner-up-left" size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contacts}>
                    {checkedContact.length < 2 ?
                        null
                        :
                        <TextInput
                            onLayout={() => setChatName("Group Chat")}
                            style={styles.chatNameInput} 
                            placeholder='Enter chat name' 
                            placeholderTextColor={'white'}
                            onChangeText={(value) => handleChatName(value)}
                            maxLength={25}
                            autoCorrect={false}
                        />
                    }
                    <FlatList data={contactData} keyExtractor={item => item.contactID} showsVerticalScrollIndicator={false} extraData={contactChange} renderItem={({item})=>(
                        <TouchableOpacity style={styles.contactInfo} onPress={()=>toggleItem(item.contactID)}>
                            <Image source={item.picture}
                                resizeMode="stretch" 
                                style={styles.image}>
                            </Image>
                            {isChecked(item.contactID) ?
                                <Text style={styles.contactNameSelected}>{item.name}</Text>
                                :
                                <Text style={styles.contactName}>{item.name}</Text>
                            }
                        </TouchableOpacity>
                    )}/>
                </View>
            </View>
        </ImageBackground>
    );
}
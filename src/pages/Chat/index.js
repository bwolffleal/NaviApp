import { React, useState, useCallback, useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import uuid from 'react-native-uuid';

import MessagesList from '../../services/sqlite/Messages';
import ContactsList from '../../services/sqlite/Contacts';
import styles from './styles';
import { set } from 'react-native-reanimated';

export default function Chat({route}) {

    const navigation = useNavigation();
    const [message, setMessage] = useState('');
    const [messageData, setMessageData] = useState();
    const [participantsData, setParticipantsData] = useState([{ newChatParticipants: '' }]);
    const [participantsPicture, setParticipantsPicture] = useState([]);
    const [textInputHeight, setTextInputHeight] = useState(30);
    const [messagesChange, setMessagesChange] = useState(false);
    //const [loadIDS, setLoadIDS] = useState(false);
    //const chatID = "5f62335a-9daf-4759-aa70-6f8c1923076f";
    //const { chatID } = route.params;
    const { item } = route.params;
    //let participantsD = []

    function navigateBack() {
      navigation.goBack();
    }

    function showChatMessages(ID) {
        setMessagesChange(!messagesChange)
        MessagesList.findMessages(ID)
            .then(message => setMessageData(message))
            .catch(err => console.log(err))
        MessagesList.findParticipants(ID)
            .then( participants => setParticipantsData(participants) )
            //.then( participants => participantsD = participants )
            .catch( err => console.log(err) )
        //console.log(participantsD)
        //showMessagesChange()
        //console.log(item)
        //console.log(item2)
        seeImage()
    }

    function showMessagesChange() {
        console.log(participantsData)
        MessagesList.findMessages(item.chatID)
            .then(message => setMessageData(message))
            .catch(err => console.log(err))
    }

    function handleMessage(text, newChatParticipants, newMessageID, time, chatID) {
        if(text.length != 0) {
            MessagesList.createMessages({
                newMessageID,
                newChatParticipants,
                chatID,
                text,
                time,
            })
            setMessage("")
            setMessagesChange(!messagesChange)
            //Keyboard.dismiss()
        }
    }

    function isUser(id) {
        if(id === "1") {
            return false
        } else{
            return true
        }
    }

    function seeImage() {
        //console.log(participantsData[0].newChatParticipants)
        for(let i = 0; i < participantsData.length-1; i++) {
            ContactsList.findContactPicture(participantsData[i].newChatParticipants)
            //ContactsList.findContactPicture(participantsData)
                .then( picture => setParticipantsPicture(picture.picture) )
                .catch( err => console.log(err) )
            //setParticipantsPicture(...participantsPicture, participantsPicture)
            console.log(participantsPicture)
        }
        //console.log(participantsPicture[0])
    }

    useEffect(() => showChatMessages(item.chatID), [])
    useEffect(() => showMessagesChange(), [messagesChange])
    useEffect(() => seeImage(), [participantsData])

    const textInputStyle = useCallback(() => { return {...styles.input, height: Math.max(textInputHeight, 30)}}, [textInputHeight])
    
    return (
        <ImageBackground source={require("../../assets/Background.png")} resizeMode="stretch" style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <FlatList data={[1]} keyExtractor={contact => String(contact)} showsHorizontalScrollIndicator={false} extraData={participantsData} horizontal={true} renderItem={()=>(
                        <View style={styles.participants}>
                            <Image source={require("../../assets/JokerPicture.png")} 
                                resizeMode="stretch" 
                                style={styles.participantsImage}>
                            </Image>
                            <Image source={participantsPicture} 
                                resizeMode="stretch" 
                                style={styles.participantsImage}>
                            </Image>
                        </View>
                    )}/>
                    <TouchableOpacity style={styles.button} onPress={navigateBack}>
                        <Feather name="corner-up-left" size={30}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.messages}>
                    <FlatList data={messageData} keyExtractor={item => item.newMessageID} initialNumToRender={20} inverted extraData={messageData} contentContainerStyle={{ flexDirection: 'column-reverse' }} renderItem={({item})=>(
                        <View style={styles.chat}>
                            {isUser(item.newChatParticipants) ?
                            <View style={styles.friendChatbox}>
                                <Image source={participantsPicture} 
                                    resizeMode="stretch" 
                                    style={styles.friendImage}>
                                </Image>
                                <Text style={styles.friendMessage}>{item.text} ({item.time})</Text>
                            </View>
                            :
                            <View style={styles.userChatbox}>
                                <Text style={styles.userMessage}>{item.text} ({item.time})</Text>
                                <Image source={require("../../assets/JokerPicture.png")} 
                                    resizeMode="stretch" 
                                    style={styles.userImage}>
                                </Image>
                            </View>                            
                            }
                        </View>
                    )}/>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? -34 : 0} style={styles.textBox}>
                    <TextInput 
                        style={textInputStyle()} 
                        placeholder='Message' 
                        placeholderTextColor={'black'}
                        textAlignVertical='top'
                        multiline={true}
                        scrollEnabled={true}
                        onContentSizeChange={event => {setTextInputHeight(event.nativeEvent.contentSize.height)}}
                        lineBreakStrategyIOS='push-out'
                        value={message}
                        onChangeText={(message) => setMessage(message)}
                    />
                    <TouchableOpacity onPress={() => handleMessage(message, "1", uuid.v4(), new Date().getHours()+':'+('0'+new Date().getMinutes()).slice(-2), item.chatID)}>
                        <Feather name='send' size={30} color='#fff'/>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
}

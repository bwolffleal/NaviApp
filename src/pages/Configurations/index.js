import { React, useState } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import ContactsList from '../../services/sqlite/Contacts';
import ChatsList from '../../services/sqlite/Chat';
import MessagesList from '../../services/sqlite/Messages';
import styles from './styles';
import { TextInput } from 'react-native-gesture-handler';


export default function Configurations() {

    const navigation = useNavigation();
    const [nameTab, setNameTab] = useState(false);
    const [deleteTab, setDeleteTab] = useState(false);
    const [userName, setUserName] = useState('');

    function navigateBack() {
        navigation.goBack();
    }

    function navigateToLogin() {
        navigation.navigate('Login');
    }

    function handleNameTab() {
        setNameTab(!nameTab)
    }

    function handleDeleteTab() {
        setDeleteTab(!deleteTab)
    }
    
    function handleNameChange(userName) {
        if(userName.length > 0){
            newUserName(userName)
            navigation.navigate('Contacts', {userName});
        }else{
            Alert.alert('Warning','You must put a name to continue', [
              {text: 'OK'}
            ])
        }
    }

    function newUserName(name){
        const picture = require("../../assets/JokerPicture.png");
        const newName = {
          name,
          picture,
        }
        ContactsList.updateContact("1", newName)
          .then( contact => console.log(contact) )
          .catch( err => console.log(err) )
    }

    function handleDeleteChat() {
        console.log('deleted')
        setDeleteTab(!deleteTab)
        MessagesList.deleteAll()
        MessagesList.createTBMessages()
        ChatsList.deleteAll()
        ChatsList.createTBChat()
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
                            <Text style={styles.contactName}>Options</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactInfo} onPress={handleNameTab}>
                            <Feather name="edit" size={30}/>
                            <Text style={styles.contactName}>Change Name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactInfo} onPress={handleDeleteTab}>
                            <Feather name="message-circle" size={30}/>
                            <Text style={styles.contactName}>Delete chats</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contactInfo} onPress={navigateToLogin}>
                            <Feather name="log-out" size={30}/>
                            <Text style={styles.contactName}>Log Out</Text>
                    </TouchableOpacity>
                </View>
                {nameTab ?
                    <View style={styles.closeTab}>
                        <TouchableOpacity  style={styles.closeTab} onPress={handleNameTab}>
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
                {nameTab ?
                    <View style={styles.configMenu}>
                        <View>
                            <TextInput 
                                style={styles.input}
                                placeholder='Enter new name' 
                                placeholderTextColor={'white'}
                                onChangeText={(value) => setUserName(value)}
                                maxLength={25}
                                autoCorrect={false}
                            />
                            <View style={styles.inputOptions}>
                                <TouchableOpacity style={styles.config} onPress={() => handleNameChange(userName)}>
                                    <Text style={styles.text}>OK</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.config} onPress={handleNameTab}>
                                    <Text style={styles.text}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }
                {deleteTab ?
                    <View style={styles.closeTab}>
                        <TouchableOpacity  style={styles.closeTab} onPress={handleDeleteTab}>
                        </TouchableOpacity>
                    </View>
                    :
                    null
                }
                {deleteTab ?
                    <View style={styles.configMenu}>
                        <View>
                            <Text style={styles.deleteText}>Delete all chats?</Text>
                            <View style={styles.inputOptions}>
                                <TouchableOpacity style={styles.config} onPress={() => handleDeleteChat()}>
                                    <Text style={styles.text}>OK</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.config} onPress={handleDeleteTab}>
                                    <Text style={styles.text}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    :
                    null
                }
            </View>
        </ImageBackground>
    );
}

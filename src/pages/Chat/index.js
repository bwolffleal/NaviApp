import { React, useState, setState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Chat() {

    const navigation = useNavigation();
    const [message, setMessage] = useState('');

    function navigateBack() {
      navigation.goBack();
    }

    return (
        <ImageBackground source={require("../../assets/Background.png")} resizeMode="stretch" style={styles.background}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <FlatList data={[1]} keyExtractor={contact => String(contact)} showsHorizontalScrollIndicator={false} horizontal={true} renderItem={()=>(
                        <View style={styles.participants}>
                            <Image source={require("../../assets/JokerPicture.png")} 
                                resizeMode="stretch" 
                                style={styles.participantsImage}>
                            </Image>
                            <Image source={require("../../assets/SkullPicture.png")} 
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
                    <FlatList data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]} keyExtractor={message => String(message)} initialNumToRender={20} inverted contentContainerStyle={{ flexDirection: 'column-reverse' }} renderItem={()=>(
                        <View style={styles.chat}>
                            <View style={styles.userChatbox}>
                                <Text style={styles.userMessage}>Text Text Text Text Text</Text>
                                <Image source={require("../../assets/JokerPicture.png")} 
                                    resizeMode="stretch" 
                                    style={styles.userImage}>
                                </Image>
                            </View>
                            <View style={styles.friendChatbox}>
                                <Image source={require("../../assets/SkullPicture.png")} 
                                    resizeMode="stretch" 
                                    style={styles.friendImage}>
                                </Image>
                                <Text style={styles.friendMessage}>Text Text Text</Text>
                            </View>
                        </View>
                    )}/>
                </View>
                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} style={styles.textBox}>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Message' 
                        placeholderTextColor={'black'}
                        textAlignVertical='top'
                        multiline='true'
                        //onContentSizeChange={(event)=>{this.setState({height: event.nativeEvent.contentSize.height})}}
                        textBreakStrategy='simple'
                        onChangeText={(value) => setMessage(value)}
                    />
                    <TouchableOpacity>
                        <Feather name='send' size={30} color='#fff'/>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        </ImageBackground>
    );
}

import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Constants.statusBarHeight + 10,
        paddingLeft: 150,
        paddingRight: 30,
        flexDirection: 'row',
    },
    background: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        paddingTop: 15,
        marginLeft: 10,
    },
    participants: {
        flexDirection: "row",
    },
    participantsImage: {
        width: 60,
        height: 60,
        marginRight: 5,
    },
    userImage: {
        width: 60,
        height: 60,
    },
    textBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#000',
        paddingTop: 5,
        paddingRight: 20,
        paddingLeft: 30,
    },
    input: {
        backgroundColor: '#fff',
        height: 30,
        width: 300,
        fontSize: 18,
        color: '#000',
        borderRadius: 5,
        paddingLeft: 5,
        marginBottom: 25,
    },
    chat: {
        flex: 1,
    },  
    messages: {
        flex: 1,
        marginTop: 50,
    },
    userMessage: {
        margin: 20,
        marginRight: 0,
        marginLeft: 50,
        color: "#fff",
        padding: 10,
        backgroundColor: "#000",
    },
    userChatbox: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: 20,
        alignItems: "center",
    },
    friendImage: {
        width: 60,
        height: 60,
    },
    friendMessage: {
        margin: 20,
        marginLeft: 0,
        marginRight: 50,
        color: "#fff",
        padding: 10,
        backgroundColor: "#000",
    },
    friendChatbox: {
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: 20,
        alignItems: "center",
    },
});
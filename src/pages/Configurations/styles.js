import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Constants.statusBarHeight + 30,
        paddingHorizontal: 40,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 60,
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
    image: {
        width: 60,
        height: 60,
        marginRight: 5,
    },
    contactName: {
        flex: 1,
        padding: 12,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#ffffff',
        backgroundColor: '#000000',
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    image: {
        width: 80,
        height: 80,
    },
    button: {
        
    },
    contacts: {
        
    }, 
    text: {
        color: '#fff',
        fontSize: 20,
    },
    input: {
        backgroundColor: '#000000',
        borderRadius: 5,
        height: 50,
        width: 182,
        margin: 3,
        textAlign: 'center',
        color: '#fff',
    },
    deleteText: {
        backgroundColor: '#000000',
        borderRadius: 5,
        height: 50,
        width: 182,
        margin: 3,
        textAlign: 'center',
        color: '#fff',
        padding: 12,
        fontSize: 20,
    },
    inputOptions: {
        flexDirection: 'row',
    },
    configMenu: {
        backgroundColor: '#c90910',
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 2,
        alignItems: 'flex-end',
        padding: 5,
        margin: 5,
        width: 200,
        position: 'absolute',
        marginLeft: 95,
        marginTop: 300,
    },
    closeTab: {
        flex: 1,
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.5,
        width: 1000,
        height: 1000,
    },
    config: {
        backgroundColor: '#000',
        width: 90,
        height: 50,
        borderRadius: 5,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
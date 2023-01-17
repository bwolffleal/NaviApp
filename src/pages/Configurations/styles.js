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
});
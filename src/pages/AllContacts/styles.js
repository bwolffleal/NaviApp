import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Constants.statusBarHeight + 10,
        paddingLeft: 40,
        flexDirection: 'row-reverse',
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
        width: 80,
        height: 80,
    },
    contacts: {
        flex: 1,
        marginLeft: 40,
        marginRight: 40,
        paddingTop: 70,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
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
});
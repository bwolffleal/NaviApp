import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Constants.statusBarHeight + 10,
        paddingHorizontal: 40,
        flexDirection: 'row',
        justifyContent: 'flex-end',
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
    contactNameSelected: {
        flex: 1,
        padding: 12,
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000000',
        backgroundColor: '#ffffff',
    },
    input: {
        backgroundColor: '#000000',
        borderRadius: 5,
        height: 30,
        width: 140,
        textAlign: 'center',
        color: '#fff',
        marginTop: 15,
    },
    chatNameInput: {
        backgroundColor: '#000000',
        borderRadius: 5,
        height: 30,
        width: 310,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 10,
    },
});
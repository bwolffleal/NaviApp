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
    contacts: {
        flex: 1,
    },
    background: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
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
    image: {
        width: 80,
        height: 80,
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
    },
    button: {
        paddingRight: 15,
    },
    input: {
        backgroundColor: '#000000',
        borderRadius: 5,
        height: 30,
        width: 140,
        textAlign: 'center',
        color: '#fff',
    },
    configMenu: {
        backgroundColor: '#c90910',
        borderRadius: 5,
        borderColor: '#000',
        borderWidth: 2,
        alignItems: 'flex-end',
        padding: 5,
        margin: 5,
        width: 170,
        marginLeft: 180,
        position: 'absolute',
        marginTop: 120,
    },
    config: {
        backgroundColor: '#000',
        width: 150,
        height: 50,
        borderRadius: 5,
        margin: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    closeTab: {
        position: 'absolute',
        width: 1000,
        height: 1000,
    },
});
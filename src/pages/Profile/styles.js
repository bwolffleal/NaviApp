import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    header:{
        paddingTop: Constants.statusBarHeight + 30,
        marginBottom: 10,
        justifyContent: 'flex-end',

    },
    background: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        flexDirection: 'row',
        width: 240,
        margin: 10,
        padding: 10,
        marginLeft: 70,
        marginRight: 70,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#000',
        fontWeight: 'bold',
        maxHeight: 38,
    },
    image: {
        height: 240,
        width: 240,
        marginTop: 50,
    },
    button: {
        marginLeft: 280,
    },
});
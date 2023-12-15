import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    inner: {
        alignItems: 'center',
    },
    background: {
        flex: 1,
        backgroundColor: '#000',
    },
    text: {
        color: '#000',
        fontSize: 20,
        fontStyle: 'italic',
        margin: 10,
    },
    image: {
        width: 200,
        height: 200,
    },
    input: {
        width: 200,
        height: 30,
        color: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#000',
        borderColor: '#fff',
        borderWidth: 2,
        textAlign: 'center',
        margin: 10,
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 5,
        width: 60,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    buttontext: {
        fontSize: 18,
        color: '#fff',
    },
});
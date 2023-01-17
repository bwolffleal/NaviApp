import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PressableButton = (props) => {
    return(
        <TouchableOpacity style={styles.button} onPress={props.onPressFunction}>
          <Text style={styles.buttontext}>
            Login
          </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
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
})

  export default PressableButton;
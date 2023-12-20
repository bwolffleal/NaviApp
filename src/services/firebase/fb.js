import { Alert } from "react-native";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyBrn8PcNGwMuMC3GTs9S75cWZwlAfQVoqg",
    authDomain: "naviapp-48f99.firebaseapp.com",
    projectId: "naviapp-48f99",
    storageBucket: "naviapp-48f99.appspot.com",
    messagingSenderId: "824854218169",
    appId: "1:824854218169:web:a03fd81e56d01f42352268"
};

const app = initializeApp(firebaseConfig);
const fdb = getFirestore(app);
const auth = getAuth(app);

export const registerUser = async (userName, userPassword) => {
    try {
        if(userName.includes('@') === false && userName.includes('.') === false){
            if(userName.length > 0 && userPassword.length > 5){
                await createUserWithEmailAndPassword(auth, userName.replace(/ /g, '') + '@navi.com', userPassword)
                    .then((userCredential) => {
                        var user = userCredential.user;
                        Alert.alert('Success' ,`User ${userName} created successfully`, [{text: 'OK'}])
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        Alert.alert('Error', errorMessage, [{text: 'OK'}])
                    });
                
            }else{
                Alert.alert('Warning','You must put a valid name and password to continue (@ and . are not allowed)', [
                {text: 'OK'}
                ])
            }
        }else{
            Alert.alert('Warning','You must put a valid name and password to continue (@ and . are not allowed)', [
                {text: 'OK'}
                ])
        }
    }
    catch(e) {
        Alert.alert(`Error while creating account: ${e}`, [{text: 'OK'}])
    }
}

export const loginUser = async (userName, userPassword) => {
    try {
        if(userName.length > 0 && userPassword.length > 5){
            const response = await signInWithEmailAndPassword(auth, userName.replace(/ /g, '') + '@navi.com', userPassword)
            const token = await response.userCredential
            Alert.alert('Log in successfull', `User: ${token}`, [{text: 'OK'}])
                // .then((userCredential) => {
                //         var user = userCredential.user;
                //         Alert.alert('Success' ,`Logged in as ${userName}`, [{text: 'OK'}])
                //         //setSubmitted(!submitted);
                // })
                // .catch((error) => {
                //         var errorCode = error.code;
                //         var errorMessage = error.message;
                //         Alert.alert('Log in failed', 'Wrong credentials', [{text: 'OK'}])
                // });
        }else{
            Alert.alert('Warning','You must put a valid name and password to continue', [
                {text: 'OK'}
            ])
        }
    }
    catch(e) {
        Alert.alert(`There was an error while loging in: ${e}`, [{text: 'OK'}])
    }
}

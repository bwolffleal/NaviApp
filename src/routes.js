import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';

const AppStack = createStackNavigator();
const Drawer = createDrawerNavigator();

import Login from './pages/Login';
import Contacts from './pages/Contacts';
import Chat from './pages/Chat';
import Configurations from './pages/Configurations';
import AllContacts from './pages/AllContacts';
import Profile from './pages/Profile';

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen name="Login" component={Login} />
                <AppStack.Screen name="Contacts" component={Contacts} />
                <AppStack.Screen name="Chat" component={Chat} />
                <AppStack.Screen name="Configurations" component={Configurations} />
                <AppStack.Screen name="AllContacts" component={AllContacts} />
                <AppStack.Screen name="Profile" component={Profile} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
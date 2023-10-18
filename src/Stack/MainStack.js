import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import Home from '../Screens/Home';
import AddItem from '../Screens/AddItem';

const Tab = createBottomTabNavigator();

export default function MainStack() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={Home} />
            <Tab.Screen name='AddItem' component={AddItem} />
        </Tab.Navigator>
    )
}

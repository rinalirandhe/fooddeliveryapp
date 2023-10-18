import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Splash from './Screens/Splash';
import Login from './Screens/Login';
import ToggleSwitch from 'toggle-switch-react-native';
import i18n from '../i18n';
import { t } from 'i18next';
import MainStack from './Stack/MainStack';

const Stack = createNativeStackNavigator();
export default function AppNavigator() {
    const [toggleSwitch, setToggleSwitch] = useState(false);

    const toggleLanguage = () => {
        i18n.changeLanguage(toggleSwitch ? 'en' : 'hi');
        setToggleSwitch(prevState => !prevState);
    };

    const toogleButton = () => {
        return (
            <View>
                <View style={styles.header}>
                    <ToggleSwitch
                        isOn={toggleSwitch}
                        onColor="green"
                        offColor="red"
                        label=""
                        labelStyle={{ color: "black", fontWeight: "900" }}
                        size="medium"
                        onToggle={toggleLanguage}
                    />
                </View>
            </View>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Splash' component={Splash} options={{ headerShown: false }} />
                <Stack.Screen name='Login' component={Login}
                    options={{
                        headerShown: true,
                        headerBackVisible: false,
                        headerTitle: t('login'),
                        headerTitleAlign: 'center',
                        headerTitleStyle: { fontSize: 25, fontWeight: '800' },
                        headerRight: () => (
                            <View style={{ marginRight: 10 }}>
                                {toogleButton()}
                            </View>
                        ),
                    }} />
                <Stack.Screen name='MainStack' component={MainStack} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    header: {
        // width: '100%',
        // borderWidth: 1,
        // borderColor: '#000',
        // backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50
    }
})
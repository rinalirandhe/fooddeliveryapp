import { GoogleSignin } from '@react-native-google-signin/google-signin'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

GoogleSignin.configure({
    webClientId: ""
})

export default function Login({ navigation }) {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <View><Text style={styles.title}>{t("welcome")}</Text></View>
            <View><TextInput style={styles.inputStyle} placeholder='Enter Email' placeholderTextColor={'#000'} /></View>
            <View><TextInput style={styles.inputStyle} placeholder='Enter Password' placeholderTextColor={'#000'} /></View>
            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("MainStack")}><Text style={styles.loginText}>{t("login")}</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 40,
        fontWeight: '800',
        color: '#000',
        marginTop: 70,
        marginBottom: 70,
        alignSelf: 'center'
    },
    inputStyle: {
        borderWidth: 1,
        borderColor: '#000',
        alignSelf: 'center',
        paddingHorizontal: 20,
        width: '100%',
        backgroundColor: '#f8f8f8',
        color: '#000',
        fontSize: 18,
        marginBottom: 15,
        borderRadius: 8,
        shadowColor: '#000',
        elevation: 1
    },
    loginBtn: {
        height: 50,
        backgroundColor: 'orange',
        alignSelf: 'center',
        borderRadius: 10,
        marginTop: 50,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    loginText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#000'
    }
})
import React, { useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Splash({ navigation }) {
    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Login')
        }, 3000)
    }, [])
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Food App</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        fontSize: 20,
        fontWeight: '800',
        color: 'red'
    }
})
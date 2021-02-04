import React from 'react'
import { View } from "react-native"
import { SafeAreaView } from 'react-native-safe-area-context'
import T from '../components/t'
import Home from './home'
import s from "./style"

function HomeView({ navigation }) {

    return (
        <View style={s.root}>
            <Home />
        </View>
    )
}


export default HomeView

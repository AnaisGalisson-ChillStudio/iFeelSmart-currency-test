import React from 'react'
import { View } from "react-native"
import T from '../components/t'
import s from "./style"
function HomeView({ navigation }) {

    return (
        <View style={s.root}>
            <T id="common:title" />
        </View>
    )
}


export default HomeView

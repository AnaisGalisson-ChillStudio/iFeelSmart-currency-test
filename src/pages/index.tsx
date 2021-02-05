import React from 'react'
import { View } from "react-native"
import Home from './home'
import s from "./style"

function HomeView() {

    return (
        <View style={s.root}>
            <Home />
        </View>
    )
}


export default HomeView

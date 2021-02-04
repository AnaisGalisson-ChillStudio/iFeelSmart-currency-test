
import React from 'react'
import { FieldErrorProps } from "./field-error"
import { StyleSheet, View } from "react-native"
import T from '../t';
import s from "./style"
/* 
*/
function FieldError(p: FieldErrorProps) {
    return (
        <View style={s.root} >
            {p.errors && p.errors[p.name]?.message ? <T style={{ color: "red" }} text={p.errors[p.name]["message"]} /> : null}
        </View>
    )
}

export default FieldError

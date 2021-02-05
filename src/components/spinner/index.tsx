import React from 'react'
import { Spinner as Spin } from "native-base"
import useSpinner from '../../hooks/use-spinner'
import s from "./style"
export function Spinner(props) {
    const spinner = useSpinner()
    
    return (
        spinner.loading > 0 && <Spin style={s.spinner} />

    )
}

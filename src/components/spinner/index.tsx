import React from 'react'
import { Spinner as Spin } from "native-base"
import useSpinner from '../../hooks/use-spinner'

export function Spinner(props) {
    const spinner = useSpinner()
    return (
        spinner.loading > 0 && <Spin style={{ zIndex: 1, top: "50%", left: "45%", position: "absolute" }} />

    )
}

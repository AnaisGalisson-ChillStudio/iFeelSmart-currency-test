import React from 'react'
import { TranslateProps } from './t';
import { Translation } from 'react-i18next';
import { H1, H2, H3, Text } from "native-base"
import { theme } from "../../styles/theme"

function T(p: TranslateProps) {
    const withVariant = (content: any) => {
        let Variant;
        const { style, ...otherProps } = p
        let tagName;
        switch (p.variant) {
            case "h1":
                Variant = H1;
                tagName = "h1"
                break;
            case "h2":
                Variant = H2;
                tagName = "h2"
                break;
            case "h3":
                Variant = H3;
                tagName = "h3"
                break;
            default:
                tagName = "default"
                Variant = Text;
                break;
        }
        return <Variant {...otherProps} style={{ ...theme[tagName], ...style }} >{content}</Variant>
    }
    return (
        <Translation>
            {
                t => withVariant(p.text ? p.text : t(p.id))
            }
        </Translation>
    )
}

export default T
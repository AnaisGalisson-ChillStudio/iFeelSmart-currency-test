import React, { memo } from 'react'
import { TranslateProps } from './t';
import { Translation } from 'react-i18next';
import { Text } from "native-base"
import { theme } from "../../styles/theme"

/*
 T   is a component used to display a translated text
 It wrapp native base Variant to display 
*/
const T  = (p: TranslateProps)  => { 
    return (
        <Translation>
            {
                t =>   <Text style={{ ...theme[p.variant], ...p.style }} >{p.text ? p.text : t(p.id, p.values)}</Text>
            }
        </Translation>
    )
 }
export default memo(T)

import React, { useState } from 'react'
import { IconInputProps } from "./icon-input"
import s from "./style"
import { Icon, Input, Item, View } from 'native-base'

/* 
* Input with Left Icon
*/
function IconInput({ placeholder, onChange, rightIconName, leftIconName, ...p }: IconInputProps) {

    return (
        <View>
            <Item style={s.item} >
                {leftIconName && <Icon active type="FontAwesome" name={leftIconName} />}
                <Input placeholder={placeholder}  onChangeText={onChange} {...p} />
                {rightIconName && <Icon active type="FontAwesome" name={rightIconName} />}
            </Item>
        </View>
    )
}

export default IconInput

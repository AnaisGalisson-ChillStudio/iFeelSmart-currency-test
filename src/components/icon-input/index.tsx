
import React, { useEffect, useState } from 'react'
import { IconInputProps } from "./icon-input"
import s from "./style"
import { Icon, Input, Item, View, Label } from 'native-base'
import FieldError from '../field-error'
import { Controller, useFormContext } from 'react-hook-form';
import T from '../t'

/* 
* Input with Left/Right Icon
*/
function IconInput({ placeholder, onChangeText, rightIconName, leftIconName, name, rules, defaultValue, ...p }: IconInputProps) {
    const { control, errors } = useFormContext();


    return (
        <View>
            <Item rounded style={s.item} >
                <Controller
                    rules={rules}
                    name={name}
                    control={control}
                    defaultValue={defaultValue || ""}
                    render={({ onChange, value }) => (
                        <>
                        <Input style={s.input} placeholder={placeholder} onChangeText={(text) => { onChange(text); onChangeText(text) }} value={value} {...p} />
                        {rightIconName && <Icon style={s.icon} active type="FontAwesome" name={rightIconName} />}
                        </>
                    )}
                />
               

            </Item>
            {errors && <FieldError errors={errors} name={name} />}
        </View>
    )
}

export default IconInput

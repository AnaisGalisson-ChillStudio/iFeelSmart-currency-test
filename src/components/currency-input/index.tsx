
import React, { useState } from 'react'
import { CurrencyInputProps } from "./currency-input"
import s from "./style"
import { Icon, Input, Item, Picker, View } from 'native-base'
import { Controller, useFormContext } from 'react-hook-form'
import FieldError from '../field-error'
import { ppid } from 'process'

/* 
* Input numeric with currency dropdown
*/
function CurrencyInput(p: CurrencyInputProps) {
    const { control, errors } = useFormContext();

    return (
        <View>
            <Item style={s.item}>

                <Controller
                    rules={p.rules}
                    name={p.amountName}
                    control={control}
                    defaultValue={p.defaultValue || ""}
                    render={({ onChange, value }) => (
                        <Input placeholder={p.placeholder} style={s.input} value={value} onChangeText={onChange} keyboardType="numeric" />
                    )}
                />

                <Controller
                    rules={p.rules}
                    name={p.currencyName}
                    control={control}
                    defaultValue={p.defaultValue || ""}
                    render={({ onChange, value }) => (
                        <Picker
                            mode="dialog"
                            iosIcon={<Icon type="AntDesign" name="up" />}
                            onValueChange={onChange}
                            style={s.picker}
                            selectedValue={value}
                        >
                            {p.currencyList && p.currencyList.map((currency) => {
                                return (
                                    <Picker.Item label={currency.value + " - " + currency.label} value={currency.value} key={currency.value} />
                                )
                            })}
                        </Picker>
                    )}
                />
            </Item>
            {errors && <FieldError errors={errors} name={p.amountName} />}
        </View>
    )
}

export default CurrencyInput

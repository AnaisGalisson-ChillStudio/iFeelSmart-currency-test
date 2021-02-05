
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
    const { control } = useFormContext();

    return (
        <View>
            <Item style={s.item}>

                <Controller
                    rules={p.rules}
                    name={p.amountName}
                    control={control}
                    defaultValue={p.amountDefaultValue || ""}
                    render={({ onChange, value }) => (
                        <Input placeholder={p.placeholder} style={s.input} value={value} onChangeText={(text) => { onChange(text); p.onAmountChange(text) }} keyboardType="numeric" />
                    )}
                />

                <Controller
                    rules={p.rules}
                    name={p.currencyName}
                    control={control}
                    defaultValue={p.currencyDefaultValue}
                    render={({ onChange, value }) => (
                        <Picker
                            mode="dialog"
                            iosIcon={<Icon type="AntDesign" name="up" style={{marginRight: 30}}/>}
                            onValueChange={(value) => { onChange(value); p.onCurrencyChange(value) }}
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
        </View>
    )
}

export default CurrencyInput

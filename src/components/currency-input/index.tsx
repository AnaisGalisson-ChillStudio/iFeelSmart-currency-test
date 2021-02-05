
import React from 'react'
import { CurrencyInputProps } from "./currency-input"
import s from "./style"
import {  Input, Item, Picker, View } from 'native-base'
import { Controller, useFormContext } from 'react-hook-form'
/* 
* Input numeric with currency dropdown
*/
function CurrencyInput(p: CurrencyInputProps) {
    const { control } = useFormContext();

    return (
        <View>
            <Item rounded style={s.item}>

                {/* Amount input */}
                <Controller
                    rules={p.rules}
                    name={p.amountName}
                    control={control}
                    defaultValue={p.amountDefaultValue || ""}
                    render={({ onChange, value }) => (
                        <Input placeholder={p.placeholder} style={s.input} value={value} onChangeText={(text) => { onChange(text); p.onAmountChange(text) }} keyboardType="numeric" />
                    )}
                />

                {/* Currency dropdown */}
                <Controller
                    rules={p.rules}
                    name={p.currencyName}
                    control={control}
                    defaultValue={p.currencyDefaultValue}
                    render={({ onChange, value }) => (
                        <Picker
                            mode="dialog"
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

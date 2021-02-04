
import React, { useState } from 'react'
import { CurrencyInputProps } from "./currency-input"
import s from "./style"
import { Icon, Input, Item, Picker, View } from 'native-base'

/* 
* Input numeric with dropdown
*/
function CurrencyInput(p: CurrencyInputProps) {
    const [currency, setCurrency] = useState("")

    return (
        <View>
            <Item style={s.item}>
                <Input style={s.input} placeholder={p.placeholder} onChangeText={p.onAmountChange} keyboardType="numeric" />
                <Picker
                    mode="dialog"
                    iosIcon={<Icon type="AntDesign" name="up" />}
                    onValueChange={(value) => { setCurrency(value); p.onCurrencyChange(value) }}
                    style={s.picker}
                    selectedValue={currency}
                >
                    {p.currencyList && p.currencyList.map((currency) => {
                        return (
                            <Picker.Item label={currency.label} value={currency.value} />
                        )
                    })}
                </Picker>
            </Item>
        </View>
    )
}

export default CurrencyInput

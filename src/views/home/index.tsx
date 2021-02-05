
import React, { useEffect, useState, } from 'react';
import { HomeProps } from "./home";
import s from "./style";
import { Form, View } from 'native-base';
import T from '../../components/t';
import CurrencyInput from '../../components/currency-input';
import useValidator from '../../hooks/use-validator';
import { useTranslation } from 'react-i18next';
import { FormProvider, useForm } from 'react-hook-form';
import IconInput from '../../components/icon-input';
import { CurrencyModel } from '../../models/store';
import useCurrency from '../../hooks/use-currency';
import { getConvertedValue, getInversedConvertedValue } from '../../services/currencyConversion';

const CURRENCY_INPUT_NAME = "currency";
const DOLLAR_INPUT_NAME = "dollar";
const CONVERTED_AMOUNT_INPUT_NAME = "convertedAmount";
const CURRENCY_DEFAULT_VALUE = "EUR"

/* 
* Conversion view
*/
function Home(p: HomeProps) {

    const ns = "common:";
    const { t } = useTranslation();
    const Validator = useValidator();
    const currency = useCurrency();

    const hooksForm = useForm({
        mode: "onChange",
        defaultValues: {
            [CONVERTED_AMOUNT_INPUT_NAME]: undefined
        }
    });

    const { errors, setValue, getValues } = hooksForm;


    useEffect(() => {
        CurrencyModel.getRealTimeCurrency(CURRENCY_DEFAULT_VALUE);
    }, [])

    const onDollarValueChange = async (dollar: string) => {
        const currencyLabel: string = getValues(CURRENCY_INPUT_NAME);
        if (currencyLabel && dollar != "") {
            const newCurrency = await CurrencyModel.getRealTimeCurrency(currencyLabel);
            const convertedValue = getConvertedValue(parseFloat(dollar), newCurrency)
            setValue(CONVERTED_AMOUNT_INPUT_NAME, convertedValue.toString())
        } else {
            setValue(CONVERTED_AMOUNT_INPUT_NAME, "")
        }
    }

    const onCurrencyChange = async (currency: string) => {
        const dollarValue: string = getValues(DOLLAR_INPUT_NAME);
        if (dollarValue) {
            const newCurrency = await CurrencyModel.getRealTimeCurrency(currency);
            const convertedValue = getConvertedValue(parseFloat(dollarValue), parseFloat(newCurrency))
            setValue(CONVERTED_AMOUNT_INPUT_NAME, convertedValue.toString())
        }
    }

    const onAmountChange = async (amount) => {
        if(amount !== "") {
            const newDollarValue = getInversedConvertedValue(parseFloat(amount), parseFloat((currency.selectedCurrency)));
            setValue(DOLLAR_INPUT_NAME, newDollarValue.toString());
        } else {
            setValue(DOLLAR_INPUT_NAME, "");
        }
    }

    return (
        <View style={s.root}>
            {/* TITLE */}
            <View style={s.titleContainer}>
                <T id="common:title" variant="h2" />
            </View>
            {/* CURRENCY FORM */}
            <View style={s.conversionContainer}>
                <FormProvider {...hooksForm} >
                    <Form style={s.form}>
                        <IconInput
                            rules={{ ...Validator.required("Field is required") }}
                            placeholder={t(ns + "dollarInput")}
                            onChangeText={onDollarValueChange}
                            rightIconName="dollar"
                            keyboardType="numeric"
                            name={DOLLAR_INPUT_NAME}
                        />
                        <CurrencyInput
                            placeholder={t(ns + "convertedAmount")}
                            currencyList={currency.currencyList}
                            onAmountChange={onAmountChange}
                            onCurrencyChange={onCurrencyChange}
                            currencyName={CURRENCY_INPUT_NAME}
                            amountName={CONVERTED_AMOUNT_INPUT_NAME}
                            rules={{ ...Validator.required("Field is required") }}
                            currencyDefaultValue={CURRENCY_DEFAULT_VALUE}
                        />
                    </Form>
                </FormProvider>
            </View>
            <View style={s.graphContainer}></View>
        </View>
    )
}

export default Home

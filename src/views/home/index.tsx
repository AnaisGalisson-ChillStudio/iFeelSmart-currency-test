
import React, { useEffect, useState } from 'react';
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
import { currency } from '../../models/currency';
import { error } from 'console';
import { convertValueWithCurrency } from '../../services/currencyConversion';

const CURRENCY_INPUT_NAME = "currency";
const DOLLAR_INPUT_NAME = "dollar";
const CONVERTED_AMOUNT_INPUT_NAME = "convertedAmount";
/* 
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


    const onDollarValueChange = async (dollar: string) => {
        if(getValues(CURRENCY_INPUT_NAME)) {
            const newCurrency = await CurrencyModel.getRealTimeCurrency(getValues(CURRENCY_INPUT_NAME));
            const convertedValue = convertValueWithCurrency(parseFloat(dollar), newCurrency)
            setValue(CONVERTED_AMOUNT_INPUT_NAME, convertedValue.toString())
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
                            leftIconName="dollar"
                            keyboardType="numeric"
                            name={DOLLAR_INPUT_NAME}
                        />
                        <CurrencyInput
                            placeholder={t(ns + "dollarInput")}
                            currencyList={currency.currencyList}
                            onAmountChange={(amount) => setValue(CONVERTED_AMOUNT_INPUT_NAME, amount, { shouldValidate: true })}
                            onCurrencyChange={(currency) => { setValue(CURRENCY_INPUT_NAME, currency, { shouldValidate: true }) }}
                            currencyName={CURRENCY_INPUT_NAME}
                            amountName={CONVERTED_AMOUNT_INPUT_NAME}
                            rules={{ ...Validator.required("Field is required") }}
                            currencyDefaultValue={"EUR"}
                        />
                    </Form>
                </FormProvider>
            </View>
            <View style={s.graphContainer}></View>
        </View>
    )
}

export default Home

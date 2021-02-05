
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
import CurrencyChart from '../currency-chart';
import { CONVERTED_AMOUNT_INPUT_NAME, CURRENCY_INPUT_NAME, DOLLAR_INPUT_NAME, PRECISION } from './constant';
import { BASE_CURRENCY, CURRENCY_DEFAULT_VALUE } from '../../config';

/* 
* Conversion view
*/
function Home(p: HomeProps) {

    const i18nNameSpace = "common:";
    const { t } = useTranslation();
    const Validator = useValidator();
    const currency = useCurrency();

    const hooksForm = useForm({
        mode: "onChange",
    });

    const { setValue, getValues } = hooksForm;

    // Convert the dollar amount and set the conversion in the bottom input
    const onDollarValueChange = async (dollar: string) => {
        const currencyLabel: string = getValues(CURRENCY_INPUT_NAME);
        if (currencyLabel && dollar != "") {
            const convertedValue = getConvertedValue(parseFloat(dollar), parseFloat(currency.selectedCurrency), PRECISION)
            setValue(CONVERTED_AMOUNT_INPUT_NAME, convertedValue.toString())
        } else {
            setValue(CONVERTED_AMOUNT_INPUT_NAME, "")
        }
    }

    // Update the converted amount (bottom input) with the new currency value when currency change
    const onCurrencyChange = async (currency: string) => {
        CurrencyModel.getLastMonthRatesValues(currency);
        const dollarValue: string = getValues(DOLLAR_INPUT_NAME);
        if (dollarValue) {
            const newCurrency = await CurrencyModel.getRealTimeCurrency(currency);
            if (newCurrency !== undefined) {
                const convertedValue = getConvertedValue(parseFloat(dollarValue), parseFloat(newCurrency), PRECISION)
                setValue(CONVERTED_AMOUNT_INPUT_NAME, convertedValue.toString())
            }
        }
    }

    // Update dollar input value when the bottom input value change
    const onAmountChange = async (amount) => {
        if (amount !== "") {
            const newDollarValue = getInversedConvertedValue(parseFloat(amount), parseFloat((currency.selectedCurrency)), PRECISION);
            setValue(DOLLAR_INPUT_NAME, newDollarValue.toString());
        } else {
            setValue(DOLLAR_INPUT_NAME, "");
        }
    }

    return (
        <View style={s.root}>

            {/* TITLE */}
            <View style={s.titleContainer}>
                <T id="common:title" variant="h1" />
            </View>

            {/* CURRENCY FORM */}
            <View style={s.conversionContainer}>
                <FormProvider {...hooksForm} >
                    <Form style={s.form}>
                        <IconInput
                            rules={{ ...Validator.required() }}
                            placeholder={t(i18nNameSpace + "dollarInput")}
                            onChangeText={onDollarValueChange}
                            rightIconName="dollar"
                            keyboardType="numeric"
                            name={DOLLAR_INPUT_NAME}
                        />
                        <CurrencyInput
                            placeholder={t(i18nNameSpace + "convertedAmount")}
                            currencyList={currency.currencyList}
                            onAmountChange={onAmountChange}
                            onCurrencyChange={onCurrencyChange}
                            currencyName={CURRENCY_INPUT_NAME}
                            amountName={CONVERTED_AMOUNT_INPUT_NAME}
                            rules={{ ...Validator.required() }}
                            currencyDefaultValue={CURRENCY_DEFAULT_VALUE}
                        />
                    </Form>
                </FormProvider>
            </View>

            {/* CURRENCY CHART */}
            <View style={s.graphContainer}>
                {currency.currencyMonthlyAverageValues && <CurrencyChart currencyCode={getValues(CURRENCY_INPUT_NAME)} data={currency.currencyMonthlyAverageValues} />}
            </View>
        </View>
    )
}

export default Home

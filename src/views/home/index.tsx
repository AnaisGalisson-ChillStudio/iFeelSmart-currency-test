
import React, { useEffect, useState } from 'react';
import { HomeProps } from "./home";
import s from "./style";
import { Form, View } from 'native-base';
import T from '../../components/t';
import CurrencyInput from '../../components/currency-input';
import useValidator from '../../hooks/use-validator';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import IconInput from '../../components/icon-input';
import { CurrencyModel } from '../../models/store';
import useCurrency from '../../hooks/use-currency';
import { currency } from '../../models/currency';
/* 
*/
function Home(p: HomeProps) {

    const ns = "common:";
    const Validator = useValidator()
    const { t } = useTranslation();
    const currency = useCurrency()

    const { register, errors, setValue, trigger, getValues } = useForm({
        mode: "onChange",
    });

    useEffect(() => {
        register("dollar");
        register("currency");
        register("convertedAmount");
    }, [register])

    return (
        <View style={s.root}>
            {/* TITLE */}
            <View style={s.titleContainer}>
                <T id="common:title" variant="h2" />
            </View>
            {/* CURRENCY FORM */}
            <View style={s.conversionContainer}>
                <Form style={s.form}>
                    <IconInput
                        placeholder={t(ns + "dollarInput")}
                        onChange={(dollar) => { setValue("dollar", dollar), trigger("dollar") }}
                        leftIconName="dollar"
                        keyboardType="numeric"
                    />
                    <CurrencyInput
                        placeholder={t(ns + "dollarInput")}
                        currencyList={currency.currencyList}
                        onAmountChange={(amount) => setValue("convertedAmount", amount)}
                        onCurrencyChange={(currency) => {setValue("currency", currency)}}
                    />
                </Form>
            </View>
            <View style={s.graphContainer}></View>
        </View>
    )
}

export default Home

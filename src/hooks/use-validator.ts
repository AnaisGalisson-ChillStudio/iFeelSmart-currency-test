import React from 'react'
import { useTranslation } from 'react-i18next';

function useValidator() {
    const { t } = useTranslation();
    const i18nNameSpace="ns:"
    const Validator = {

        email: (required: boolean, requiredMessage?: string, invalidMessage?: string) => ({
            required: required ? requiredMessage ? t(requiredMessage) : t(i18nNameSpace+"required") : false,
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: invalidMessage ? t(invalidMessage) : t(i18nNameSpace+"invalidEmailFormat")
            },
        }),
        required: (requiredMessage?: string) => ({
            required: t(requiredMessage) || t(i18nNameSpace+"required"),
        }),

        password: (required?: boolean, minLength?: number, requiredMessage?: string, invalidMessage?: string) => ({
            required: required ? requiredMessage ? t(requiredMessage) : t(i18nNameSpace+"required") : false,
            minLength: {
                value: minLength,
                message: invalidMessage ? t(invalidMessage) : t(i18nNameSpace+"passwordMinLength", { minLength: minLength })
            }
        }),
        validateMatch: (value: string, valueToMatch: string): any => {
            return value === valueToMatch || t(i18nNameSpace+"passwordNotMatch")
        }


    }

    return Validator

}

export default useValidator
import React from 'react'
import { useTranslation } from 'react-i18next';

function useValidator() {
    const { t } = useTranslation();

    const Validator = {

        email: (required: boolean, requiredMessage?: string, invalidMessage?: string) => ({
            required: required ? requiredMessage ? t(requiredMessage) : t("common:required") : false,
            pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: invalidMessage ? t(invalidMessage) : t("common:invalidEmailFormat")
            },
        }),
        required: (requiredMessage?: string) => ({
            required: t(requiredMessage) || t("common:required"),
        }),

        password: (required?: boolean, minLength?: number, requiredMessage?: string, invalidMessage?: string) => ({
            required: required ? requiredMessage ? t(requiredMessage) : t("common:required") : false,
            minLength: {
                value: minLength,
                message: invalidMessage ? t(invalidMessage) : t("common:passwordMinLength", { minLength: minLength })
            }
        }),
        validateMatch: (value: string, valueToMatch: string): any => {
            return value === valueToMatch || t("common:passwordNotMatch")
        }


    }

    return Validator

}

export default useValidator
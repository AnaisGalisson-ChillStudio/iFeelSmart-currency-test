export interface CurrencyInputProps {
    placeholder: string;
    currencyList: Currency[];
    onAmountChange: (amount: string) => void;
    onCurrencyChange: (currency: string) => void;
    currencyName: string;
    amountName: string;
    currencyDefaultValue?: string;
    amountDefaultValue?: string;
    rules:  Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

export interface Currency {
    label: string;
    value: string
}

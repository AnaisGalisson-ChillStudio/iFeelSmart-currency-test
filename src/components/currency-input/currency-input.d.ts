export interface CurrencyInputProps {
    placeholder: string;
    currencyList: Currency[];
    onAmountChange: (amount: string) => void;
    onCurrencyChange: (currency: string) => void;
}

export interface Currency {
    label: string;
    value: string
}

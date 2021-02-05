
import { createModel } from '@rematch/core'
import { Currency, CurrencyListResponse, RealTimeCurrencyResponse } from '../interfaces/currency'
import { getRequest } from '../services/asyncRequest'

/**
 * 
 */
export type CurrencyState = {
    currencyList: Currency[];
    selectedCurrency: string;
}

const model = {
    name: "currency",
    state: {
        currencyList: [],
        selectedCurrency : "",
    } as CurrencyState,
    reducers: {
        setCurrenyList: (state: CurrencyState, currencyList: Currency[]) => ({
            ...state,
            currencyList,
        }),
        setSelectedCurrency: (state: CurrencyState, selectedCurrency: string) => ({
            ...state,
            selectedCurrency,
        })
    },
    effects: () => ({
        async getCurencyList() {
            const response: CurrencyListResponse = await getRequest("/list");
            if (response && response.currencies) {
                const formattedCurrencyList = []
                // store  and format as { string: string } to { label: "", value : ""}
                Object.keys(response.currencies).forEach(function (key) {
                    formattedCurrencyList.push({ label: response.currencies[key], value: key })
                });
                this.setCurrenyList(formattedCurrencyList)
            }
            return response;
        },
        async getRealTimeCurrency(currency: string) {
            const response: RealTimeCurrencyResponse = await getRequest("/live", { currencies: currency });
            if (response && response.quotes) {
                this.setSelectedCurrency(response.quotes["USD" + currency]);
                return response.quotes["USD" + currency];
            }
            return response

        },
    }),
}

export const currency: typeof model = createModel(model)

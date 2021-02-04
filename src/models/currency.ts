
import { createModel } from '@rematch/core'
import { Currency, CurrencyListResponse } from '../interfaces/currency'
import { getRequest } from '../services/asyncRequest'

/**
 * 
 */
export type CurrencyState = {
    currencyList: Currency[];
}

const model = {
    name: "currency",
    state: {
        currencyList: []
    } as CurrencyState,
    reducers: {
        setCurrenyList: (state: CurrencyState, currencyList: Currency[]) => ({
            ...state,
            currencyList,
        }),
    },
    effects: () => ({
        async getCurencyList() {
            const response: CurrencyListResponse = await getRequest("/list");
            if (response && response.currencies) {
                const formattedCurrencyList = []
                // format the value { string: string } to { label: "", value : ""}
                Object.keys(response.currencies).forEach(function (key) {
                    formattedCurrencyList.push({ label: response.currencies[key], value: key })
                });
                this.setCurrenyList(formattedCurrencyList)
            }
            return response

        },
    }),
}

export const currency: typeof model = createModel(model)

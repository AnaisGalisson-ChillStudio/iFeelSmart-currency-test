
import { createModel } from '@rematch/core'
import { BASE_CURRENCY } from '../config'
import { Currency, CurrencyHistoricalRateParams, CurrencyHistoricalRateResponse, CurrencyListResponse, RealTimeCurrencyResponse } from '../interfaces/currency'
import { getRequest } from '../services/asyncRequest'

/**
 * Currency model 
 */
export type CurrencyState = {
    currencyList: Currency[];
    selectedCurrency: string;
    currencyMonthlyAverageValues: number[]
}

const model = {
    name: "currency",
    state: {
        currencyList: [],
        selectedCurrency: "",
    } as CurrencyState,
    reducers: {
        setCurrencyList: (state: CurrencyState, currencyList: Currency[]) => ({
            ...state,
            currencyList,
        }),
        setSelectedCurrency: (state: CurrencyState, selectedCurrency: string) => ({
            ...state,
            selectedCurrency,
        }),
        setCurrentMonthlyAverageValues: (state: CurrencyState, currencyMonthlyAverageValues: number[]) => ({
            ...state,
            currencyMonthlyAverageValues,
        })
    },
    effects: () => ({

        async getCurencyList() {
            const response: CurrencyListResponse = await getRequest("/list");
            if (response && response.currencies) {
                // store and format the list of currencies from { [string]: string } to { label: "", value : ""}
                const formattedCurrencyList = Object.keys(response.currencies).map(key => (
                    { label: response.currencies[key], value: key }
                ))
                this.setCurrencyList(formattedCurrencyList)
            }
        },

        // Get the real time currency from currency code and set it as current currency in the store 
        async getRealTimeCurrency(currencyCode: string) {
            const response: RealTimeCurrencyResponse = await getRequest("/live", { currencies: currencyCode });
            console.log(response)
            if (response && response.quotes) {
                const realTimeCurrency = response.quotes[BASE_CURRENCY + currencyCode]
                console.log("in")
                this.setSelectedCurrency(realTimeCurrency);
                return realTimeCurrency;

            }else{
                return undefined
            }
        },

        // Return the last 4 hebdomadory values of a currency
        async getLastMonthRatesValues(currencyCode: string) {

            // Array containing the average value of the last 4 weeks + today
            const today = new Date();
            let hebdomadoryDateList: string[] = [today.toLocaleDateString("fr-FR")];
            let requestList: Promise<CurrencyHistoricalRateResponse>[] = [];

            // For each week prepare a promise to get each week's currency value
            for (let i = 0; i < 5; i++) {
                const previousWeek = new Date().setDate(today.getDate() - (7 * (i + 1)))
                const formatedPreviousWeek = new Date(previousWeek).toLocaleDateString("en-CA")
                hebdomadoryDateList.push(formatedPreviousWeek)

                requestList.push(getRequest<CurrencyHistoricalRateResponse, CurrencyHistoricalRateParams>("/historical", { currencies: currencyCode, date: formatedPreviousWeek }))
            }
            
            // Resolve all the promises and does nothing if one of them has returned an error
            const monthlyHistoricalRatesResponseList = await Promise.all(requestList);
            for (let i = 0; i < monthlyHistoricalRatesResponseList.length; i++) {
                if (monthlyHistoricalRatesResponseList[i].error) {
                    return;
                }
            }

            // Save an array of the currency values in a flat array then save it the store
            const monthlyHistoricalRatesFormated: number[] = []
            monthlyHistoricalRatesResponseList.map((historicalRate, i) => {
                if (historicalRate.quotes[BASE_CURRENCY + currencyCode]) {
                    monthlyHistoricalRatesFormated.push(historicalRate.quotes[BASE_CURRENCY + currencyCode])
                }
            })
            this.setCurrentMonthlyAverageValues(monthlyHistoricalRatesFormated)
        }
    }),
}

export const currency: typeof model = createModel(model)

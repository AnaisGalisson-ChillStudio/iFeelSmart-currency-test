export interface Currency {
    value: string;
    label: string;
}


/** ASYNC REQUESTS for currency model */

export interface CurrencyListResponse {
    currencies: Currency[]
}

export interface RealTimeCurrencyResponse {
    quotes: Array<{ [string, string] }>
}

export interface CurrencyHistoricalRateResponse  {
    terms: string;
    privacy: string;
    historical: boolean;
    date: string;
    timestamp: number;
    source: string;
    quotes: Quotes;
    error?: {
        code: number,
        info: string
    },
    success: boolean;
}

export interface CurrencyHistoricalRateParams {
    currencies: string
    date: string
}
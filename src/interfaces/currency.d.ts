export interface Currency {
   value: string;
   label: string;
}


/** ASYNC REQUESTS */

export interface CurrencyListResponse {
    currencies: Currency[]
}
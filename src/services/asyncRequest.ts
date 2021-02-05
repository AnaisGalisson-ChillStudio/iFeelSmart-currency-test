import axios, { AxiosResponse, AxiosRequestConfig, AxiosPromise } from "axios"
import store, { SpinnerModel } from "../models/store";
import { LANGUAGE_STKEY } from "../constants/local-storage-keys";
import _ from "lodash"
import AsyncStorage from '@react-native-community/async-storage';
import { REACT_NATIVE_EXTRA_PARAMS, REACT_NATIVE_BASE_URL, NETWORK_LOG } from "../config";

/**
 * Contain functions to make http requests and build the header for every request
 */

// Build the header with the api key, and bearer token, etc
function buildHeader(headerbaseUrl?: AxiosRequestConfig, baseUrl?: string) {
    let header = {
        ...headerbaseUrl
    }
    if (!baseUrl) {
        //  header["Authorization"] = "Bearer " + store.getState().auth.token
        //  header["x-api-key"] = REACT_NATIVE_API_KEY;
        header["Accept"] = "application/json"
        header["Content-Type"] = "application/json"
        header["Accept-language"] = AsyncStorage?.getItem(LANGUAGE_STKEY) || "en"
    }
    return {
        ...header
    }
}

// Function to make Get requests (display a spinner)
async function getRequest<Response, Params>(url: string, params?: Params, baseUrl?: string, header?: AxiosRequestConfig): Promise<Response> {
    SpinnerModel.increaseLoading();
    const builtURL = buildUrl(url, baseUrl)
    const response = await handleResponse(axios.get<Params, AxiosResponse<Response>>(builtURL, { params: { ...params, ...uriParamsToObject(REACT_NATIVE_EXTRA_PARAMS) }, headers: { ...buildHeader(header, baseUrl) } }))
    NETWORK_LOG &&console.log(builtURL, response)
    return response ? response.data : null;
}

// Function to make post requests (display a spinner)
async function postRequest<Response, Body>(url: string, data?: Body, baseUrl?: string, header?: AxiosRequestConfig) {
    SpinnerModel.increaseLoading();
    const builtURL = buildUrl(url, baseUrl)
    const response = await handleResponse(axios.post<Body, AxiosResponse<Response>>(builtURL + "&" + uriParamsToObject(REACT_NATIVE_EXTRA_PARAMS), data, { headers: { ...buildHeader(header, baseUrl) } }))
    NETWORK_LOG &&console.log(builtURL, response)
    return response && response.data ? response.data : null;
}

// Function to make put requests (display a spinner)
async function putRequest<Response, Body>(url: string, data?: Body, baseUrl?: string, header?: AxiosRequestConfig) {
    SpinnerModel.increaseLoading();
    const builtURL = buildUrl(url, baseUrl)
    const response = await handleResponse(axios.put<Body, AxiosResponse<Response>>(builtURL + "&" + uriParamsToObject(REACT_NATIVE_EXTRA_PARAMS), data, { headers: { ...buildHeader(header, baseUrl) } }))
    NETWORK_LOG && console.log(builtURL, response)
    return response && response.data ? response.data : null;
}

// Function to make patch requests (display a spinner)
async function patchRequest<Response, Body>(url: string, data?: Body, baseUrl?: string, header?: AxiosRequestConfig) {
    SpinnerModel.increaseLoading();
    const builtURL = buildUrl(url, baseUrl)
    const response = await handleResponse<Response>(axios.patch<Body, AxiosResponse<Response>>(builtURL + "&" + uriParamsToObject(REACT_NATIVE_EXTRA_PARAMS), data, { headers: { ...buildHeader(header, baseUrl) } }))
    return response && response.data ? response.data : null;
}

function uriParamsToObject(uriParams) {
    return JSON.parse('{"' + decodeURI(uriParams).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

function handleResponse<Response>(promise: AxiosPromise<Response>) {
    promise.catch((e) => {
        displayError(e)
    }).finally(() => {
        SpinnerModel.decreaseLoading();
    })
    return promise
}

function displayError(error) {
    console.log(`ERROR : ${JSON.stringify(error)}`)
}
// Build the url with the config base url by default. Otherwise use the specific base url passed in parameter
function buildUrl(url: string, baseUrl?: string): string {
    return baseUrl ? baseUrl + url : REACT_NATIVE_BASE_URL + "/" + url
}

export { getRequest, postRequest, putRequest, patchRequest }


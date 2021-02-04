import { init, RematchRootState, RematchDispatch, ExtractRematchStateFromModels } from '@rematch/core'
import models from "."
// const createLoadingPlugin = require('@rematch/loading').default
import createRematchPersist from '@rematch/persist'
import AsyncStorage from '@react-native-community/async-storage'

// Add here the models name you want to persist even after the page reload or close
const persistPlugin = createRematchPersist({
    storage: AsyncStorage,
    whitelist: [''],
    throttle: 100,
    version: 1,

})
const store = init({
    plugins: [persistPlugin],
    models,
    redux: {
        reducers: {},
        devtoolOptions: {
            disabled: false,
        },
        middlewares: [], // to add middlewares
    },
})

export type Store = typeof store
export type IRootState = RematchRootState<typeof models>;//& ILoadingPlugin;
export type Dispatch = RematchDispatch<typeof models>
export type IStore = ExtractRematchStateFromModels<typeof models & typeof store>;//& ILoadingPlugin
export default store;

// Just to access the store easly in the console
if (process.env.NODE_ENV === "development") {
    (window as any).store = store;
}

export const SpinnerModel = store.dispatch.spinner
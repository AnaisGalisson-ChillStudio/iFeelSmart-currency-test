import { createModel } from '@rematch/core'

/**
 * Spinner: contain the number of pending request and can increase or decrease the total (used to display the spinner if necessary)
 */
export type SpinnerState = {
    loading: number,
}

const model = {
    name: "spinner",
    state: {
        loading: 0
    } as SpinnerState,
    reducers: {

        increaseLoading: (state: SpinnerState) => ({
            ...state,
            loading: state.loading + 1
        }),
        decreaseLoading: (state: SpinnerState) => ({
            ...state,
            loading: state.loading - 1
        })
    },

    effects: () => ({

    }),
}

export const spinner: typeof model = createModel(model)
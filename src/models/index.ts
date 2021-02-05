import { spinner } from './spinner'
import { currency } from './currency'
import { Models } from '@rematch/core'

export interface RootModel extends Models {
    spinner: typeof spinner;
    currency: typeof currency
}

const rootModel: RootModel = {
    spinner,
    currency
}




export default rootModel
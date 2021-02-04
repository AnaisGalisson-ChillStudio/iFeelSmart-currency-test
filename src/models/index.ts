import { spinner } from './spinner'
import { Models } from '@rematch/core'

export interface RootModel extends Models {
    spinner: typeof spinner
}
const rootModel: RootModel = {
    spinner
}




export default rootModel
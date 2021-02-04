
    import { useSelector } from "react-redux";
import { CurrencyState } from "../models/currency";
import { IStore } from "../models/store";


const useCurrency = (): CurrencyState => {
    return useSelector<IStore, CurrencyState>((state: IStore): CurrencyState => state.currency)
}
export default useCurrency;

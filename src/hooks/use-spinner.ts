
import { useSelector } from "react-redux";
import { SpinnerState } from "../models/spinner";
import { IStore } from "../models/store";

const useSpinner = (): SpinnerState => {
    return useSelector<IStore, SpinnerState>((state: IStore): SpinnerState => state.spinner)
}

export default useSpinner;
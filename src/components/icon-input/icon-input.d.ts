import { Input, NativeBase } from "native-base";
import { RegisterOptions } from "react-hook-form"
export interface IconInputProps extends NativeBase.Input {
    onChangeText: (value: string) => void;
    placeholder: string;
    leftIconName?: string;
    rightIconName?: string;
    name: string;
    rules:  Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
}

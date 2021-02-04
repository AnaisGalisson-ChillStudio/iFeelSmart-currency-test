import { Input, NativeBase } from "native-base";

export interface IconInputProps extends NativeBase.Input {
    onChange: (value: string) => void;
    placeholder: string;
    leftIconName?: string;
    rightIconName?: string;
}

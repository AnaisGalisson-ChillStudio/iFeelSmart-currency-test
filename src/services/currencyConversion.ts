
const PRECISION = 6;

function getConvertedValue(valueToConvert: number, currency: number) {
    return (valueToConvert * currency).toFixed(PRECISION);
}

function getInversedConvertedValue(valueToConvert: number, currency: number) {
    return (valueToConvert * (1 / currency)).toFixed(PRECISION);
}

export { getConvertedValue, getInversedConvertedValue }
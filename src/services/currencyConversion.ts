

function getConvertedValue(valueToConvert: number, currency: number, precision?: number | 2) {
    return (valueToConvert * currency).toFixed(precision);
}

function getInversedConvertedValue(valueToConvert: number, currency: number, precision?: number | 2) {
    console.log( (valueToConvert * (1 / currency)).toFixed(precision))
    return (valueToConvert * (1 / currency)).toFixed(precision);
}

export { getConvertedValue, getInversedConvertedValue }
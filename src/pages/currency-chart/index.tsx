
import React from 'react'
import { CurrencyChartProps } from "./currency-chart"
import s from "./style"
import { View } from 'native-base'
import T from '../../components/t'
import { Dimensions } from 'react-native'
import { LineChart } from "react-native-chart-kit";

function CurrencyChart(p: CurrencyChartProps) {
    const i18nNameSpace = "common:";

    return (
        <View style={s.root}>
            <T id={i18nNameSpace+"chartTitle"} values={{currency:p.currencyCode}} style={s.title}/>
            <LineChart
                data={{
                    labels: ["s", "s-1", "s-2", "s-3", "s-4", "s-5"],
                    datasets: [
                        {
                            data: p.data
                        }
                    ]
                }}
                width={(Dimensions.get("window").width * 0.9)} // from react-native
                height={220}
                yAxisLabel="$"
                chartConfig={{
                    backgroundColor: "#e26a00",
                    backgroundGradientFrom: "#fb8c00",
                    backgroundGradientTo: "#ffa726",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16
                }}
            />
        </View>
    )
}

export default CurrencyChart

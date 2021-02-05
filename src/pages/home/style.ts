import { StyleSheet } from 'react-native'
import { white } from '../../styles/colors';
import { theme } from '../../styles/theme';
export default StyleSheet.create({

    root: {
        ...theme.pt1,
        flex: 1,
        backgroundColor: white
    },
    titleContainer: {
        justifyContent: "center",
        alignItems: "center",
        flex: 20,
    },
    conversionContainer: {
        alignItems: "center",
        justifyContent: "center",
        flex: 30,
    },
    form: {
        flex: 1,
        justifyContent: "space-around",
        width: "90%",
        alignItems: "center",
    },
    graphContainer: {
        flex: 50,
        justifyContent:"flex-start"
    }
});

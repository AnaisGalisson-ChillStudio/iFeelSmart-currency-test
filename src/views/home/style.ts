import { StyleSheet } from 'react-native'
import { white } from '../../styles/colors';
export default StyleSheet.create({

    root: {
        padding: 10,
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
        flex: 40,
    },
    graphContainer: {
        alignItems: "center",
        justifyContent:"space-around",
        flex: 40,
    },
    form: {
        flex: 1,
        backgroundColor:"grey",
        justifyContent:"space-around",
        width:"90%",
        alignItems: "center",
    }
});

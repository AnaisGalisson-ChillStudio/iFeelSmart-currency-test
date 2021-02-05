import { StyleSheet } from 'react-native'
import { theme } from '../../styles/theme';
export default StyleSheet.create({
    item: {
        width: '80%'
    },
    icon : {
        ...theme.pr2
    },
    input:{
        ...theme.pl2
    }
});

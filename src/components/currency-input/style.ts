import { StyleSheet } from 'react-native'
import { theme } from '../../styles/theme';
export default StyleSheet.create({
    item: {
        width: '80%'
    },
    input: {
        width: 90,
       ...theme.pl2
    },
    picker:{
        width: 90,
    },
    

});

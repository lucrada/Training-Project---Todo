/* eslint-disable prettier/prettier */
import { Dimensions, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E0E5EC',
    },
    col: {
        flexDirection: 'column',
        borderWidth: 1,
        width: Dimensions.get('window').width * 0.85,
        alignItems: 'center',
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 32,
    },
    textbox: {
        backgroundColor: '#E0E5EC',
        borderRadius: 4,
        shadowColor: 'rgba(163,177,198,0.6)',
        shadowOffset: { width: 9, height: 9 },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 5,
        padding: 5,
        width: '100%',
    },
    buttonContainer: {

    },
    buttonText: {

    },
});

export default styles;

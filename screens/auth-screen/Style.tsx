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
        width: Dimensions.get('window').width * 0.85,
        alignItems: 'center',
    },
    title: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 32,
    },
    neumorphicContainer: {
        borderRadius: 50,
        shadowColor: 'rgba(163, 177, 198, 1)',
        shadowOffset: { width: 9, height: 9 },
        shadowRadius: 16,
        elevation: 8,
    },
    textbox: {
        backgroundColor: '#E0E5EC',
        paddingVertical: 10,
        paddingHorizontal: 8,
        paddingLeft: 15,
        width: '100%',
        color: 'gray',
    },
    loginButtonContainer: {
        position: 'relative',
        paddingVertical: 12,
        paddingHorizontal: 8,
        width: '100%',
        borderRadius: 50,
        backgroundColor: '#9545ca',
    },
    loginButtonText: {
        textAlign: 'center',
        color: '#E0E5EC',
        fontWeight: 'bold',
    },
    registerButtonContainer: {
        position: 'relative',
        paddingVertical: 12,
        paddingHorizontal: 8,
        width: '100%',
        borderRadius: 50,
        backgroundColor: '#E0E5EC',
    },
    registerButtonText: {
        textAlign: 'center',
        color: '#666',
        fontWeight: 'bold',
    },
});

export default styles;

/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const HeaderComponent = (props): React.JSX.Element => {
    return (
        <View style={styles.row}>
            <View style={styles.col}>
                <Text style={styles.greetText}>Hello</Text>
                <Text style={styles.nameText}>{props.name}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
    },
    col: {
        flexDirection: 'column',
    },
    greetText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5,
    },
    nameText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default HeaderComponent;

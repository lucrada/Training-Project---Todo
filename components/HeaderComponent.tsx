/* eslint-disable prettier/prettier */
import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { getUserLogoutRequest } from '../actions/actions';

const HeaderComponent = (props): React.JSX.Element => {
    const dispatch = useDispatch();

    return (
        <View style={styles.row}>
            <View style={styles.col}>
                <Text style={styles.greetText}>Hello</Text>
                <Text style={styles.nameText}>{props.name}</Text>
            </View>
            <View style={styles.row}>
                <TouchableOpacity style={styles.logoutButton} onPress={() => dispatch(getUserLogoutRequest())}><Text style={styles.logoutButtonText}>Log out</Text></TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    Alert.alert('Info - Round Buttons', 'Green - Complete\nBlue - Undo\nRed - Delete');
                }}>
                    <View style={styles.infoButton}>
                        <View style={styles.iButton}>
                            <Text style={styles.iButtonText}>i</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
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
    infoButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
        borderWidth: 2,
        borderRadius: 50,
        borderColor: '#077ffc',
    },
    iButton: {
        borderWidth: 1,
        borderColor: '#077ffc',
        borderRadius: 50,
        height: 20,
        width: 20,
        backgroundColor: '#077ffc',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iButtonText: {
        fontWeight: 'bold',
    },
    logoutButton: {
        marginRight: 10,
        padding: 10,
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#ff3461',
    },
    logoutButtonText: {
        fontWeight: 'bold',
        color: '#ff3461',
    },
});

export default HeaderComponent;

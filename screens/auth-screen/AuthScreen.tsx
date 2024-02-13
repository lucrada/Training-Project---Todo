/* eslint-disable prettier/prettier */

import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Style';
import VerticalSpacer from '../../utils/VerticalSpacer';
import { TextInput } from 'react-native-gesture-handler';

const AuthScreen = (): React.JSX.Element => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.col}>
                <Text style={styles.title}>TaskTracker</Text>
                <VerticalSpacer amount={40} />
                <TextInput style={styles.textbox} placeholder="Username" />
                <VerticalSpacer amount={25} />
                <TextInput style={styles.textbox} placeholder="Password" secureTextEntry={true} />
                <VerticalSpacer amount={25} />
                <TouchableOpacity><View style={styles.buttonContainer}><Text style={styles.buttonText}>Log in</Text></View></TouchableOpacity>
            </View>
        </View>
    );
};

export default AuthScreen;

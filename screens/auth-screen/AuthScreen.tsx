/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import styles from './Style';
import VerticalSpacer from '../../utils/VerticalSpacer';
import { TextInput } from 'react-native-gesture-handler';

const AuthScreen = (): React.JSX.Element => {
    const [loginView, setLoginView] = React.useState(true);

    return (
        <View style={styles.mainContainer}>
            {loginView ? <View style={styles.col}>
                <Text style={styles.title}>TaskTracker</Text>
                <VerticalSpacer amount={40} />
                <TextInput style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Username" placeholderTextColor={'gray'} cursorColor={'gray'} />
                <VerticalSpacer amount={25} />
                <TextInput style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Password" placeholderTextColor={'gray'} secureTextEntry={true} cursorColor={'gray'} />
                <VerticalSpacer amount={40} />
                <TouchableOpacity style={{ ...styles.loginButtonContainer, ...styles.neumorphicContainer }}><Text style={styles.loginButtonText}>Log in</Text></TouchableOpacity>
                <VerticalSpacer amount={25} />
                <TouchableOpacity onPress={() => setLoginView(false)} style={{ ...styles.registerButtonContainer, ...styles.neumorphicContainer }}><Text style={styles.registerButtonText}>Do not have an account ? Register</Text></TouchableOpacity>
            </View> :
                <View style={styles.col}>
                    <Text style={styles.title}>TaskTracker</Text>
                    <VerticalSpacer amount={40} />
                    <TextInput style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Username" placeholderTextColor={'gray'} cursorColor={'gray'} />
                    <VerticalSpacer amount={25} />
                    <TextInput style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Password" placeholderTextColor={'gray'} secureTextEntry={true} cursorColor={'gray'} />
                    <VerticalSpacer amount={25} />
                    <TextInput style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Confirm Password" placeholderTextColor={'gray'} secureTextEntry={true} cursorColor={'gray'} />
                    <VerticalSpacer amount={40} />
                    <TouchableOpacity style={{ ...styles.loginButtonContainer, ...styles.neumorphicContainer }}><Text style={styles.loginButtonText}>Register</Text></TouchableOpacity>
                    <VerticalSpacer amount={25} />
                    <TouchableOpacity onPress={() => setLoginView(true)} style={{ ...styles.registerButtonContainer, ...styles.neumorphicContainer }}><Text style={styles.registerButtonText}>Already have an account ? Login</Text></TouchableOpacity>
                </View>}
        </View>
    );
};

export default AuthScreen;

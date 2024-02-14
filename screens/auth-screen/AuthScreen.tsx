/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from './Style';
import VerticalSpacer from '../../utils/VerticalSpacer';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdateAuthStatusRequest, getUserLoginRequest, getUserRegisterRequest } from '../../actions/actions';

const AuthScreen = ({ navigation }): React.JSX.Element => {
    const [loginView, setLoginView] = React.useState(true);

    const [loginUsername, setLoginUsername] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    const [registerUsername, setRegisterUsername] = React.useState('');
    const [registerPassword, setRegisterPassword] = React.useState('');
    const [registerConfPassword, setRegisterConfPassword] = React.useState('');

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    React.useEffect(() => {
        dispatch(getUpdateAuthStatusRequest());
        if (auth.userId !== '') {
            navigation.navigate('main_screen');
        }
    }, [auth.userId, navigation, dispatch]);

    const _validateCredentials = (username, password, confPass = null) => {
        if (username.trim().length === 0) { return { success: false, message: 'Username cannot be empty' }; }
        if (password.trim().length === 0) { return { success: false, message: 'Password cannot be empty' }; }
        if (confPass != null && (confPass.trim().length === 0 || password.trim() !== confPass.trim())) { return { success: false, message: 'Passwords are not matching' }; }
        return { success: true };
    };

    const _handleLogin = () => {
        let result = _validateCredentials(loginUsername, loginPassword);
        if (!result.success) {
            Alert.alert('Warning', result.message);
            return;
        }
        dispatch(getUserLoginRequest({ email: loginUsername, password: loginPassword }));
    };

    const _handleRegister = () => {
        let result = _validateCredentials(registerUsername, registerPassword, registerConfPassword);
        if (!result.success) {
            Alert.alert('Warning', result.message);
            return;
        }
        dispatch(getUserRegisterRequest({ email: registerUsername, password: registerPassword, name: 'Test name' }));
    };

    return (
        <View style={styles.mainContainer}>
            {loginView ? <View style={styles.col}>
                <Text style={styles.title}>TaskTracker Pro</Text>
                <VerticalSpacer amount={40} />
                <TextInput value={loginUsername} onChangeText={(text) => setLoginUsername(text)} style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Username" placeholderTextColor={'gray'} cursorColor={'gray'} />
                <VerticalSpacer amount={25} />
                <TextInput value={loginPassword} onChangeText={(text) => setLoginPassword(text)} style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Password" placeholderTextColor={'gray'} secureTextEntry={true} cursorColor={'gray'} />
                <VerticalSpacer amount={40} />
                <TouchableOpacity onPress={_handleLogin} style={{ ...styles.loginButtonContainer, ...styles.neumorphicContainer }}><Text style={styles.loginButtonText}>Log in</Text></TouchableOpacity>
                <VerticalSpacer amount={25} />
                <TouchableOpacity onPress={() => setLoginView(false)} style={{ ...styles.registerButtonContainer, ...styles.neumorphicContainer }}><Text style={styles.registerButtonText}>Do not have an account ? Register</Text></TouchableOpacity>
            </View> :
                <View style={styles.col}>
                    <Text style={styles.title}>TaskTracker Pro</Text>
                    <VerticalSpacer amount={40} />
                    <TextInput value={registerUsername} onChangeText={(text) => setRegisterUsername(text)} style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Username" placeholderTextColor={'gray'} cursorColor={'gray'} />
                    <VerticalSpacer amount={25} />
                    <TextInput value={registerPassword} onChangeText={(text) => setRegisterPassword(text)} style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Password" placeholderTextColor={'gray'} secureTextEntry={true} cursorColor={'gray'} />
                    <VerticalSpacer amount={25} />
                    <TextInput value={registerConfPassword} onChangeText={(text) => setRegisterConfPassword(text)} style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Confirm Password" placeholderTextColor={'gray'} secureTextEntry={true} cursorColor={'gray'} />
                    <VerticalSpacer amount={40} />
                    <TouchableOpacity onPress={_handleRegister} style={{ ...styles.loginButtonContainer, ...styles.neumorphicContainer }}><Text style={styles.loginButtonText}>Register</Text></TouchableOpacity>
                    <VerticalSpacer amount={25} />
                    <TouchableOpacity onPress={() => setLoginView(true)} style={{ ...styles.registerButtonContainer, ...styles.neumorphicContainer }}><Text style={styles.registerButtonText}>Already have an account ? Login</Text></TouchableOpacity>
                </View>}
        </View>
    );
};

export default AuthScreen;

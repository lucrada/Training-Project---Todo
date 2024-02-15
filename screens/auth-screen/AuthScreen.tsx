/* eslint-disable prettier/prettier */
import React from 'react';
import { Text, View, TouchableOpacity, Alert } from 'react-native';
import styles from './Style';
import VerticalSpacer from '../../utils/VerticalSpacer';
import { TextInput } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdateAuthStatusRequest, getUserLoginRequest, getUserRegisterRequest } from '../../actions/actions';
import { getErrorMessage } from '../../utils/helperFunctions';

const AuthScreen = ({ navigation }): React.JSX.Element => {
    const [loginView, setLoginView] = React.useState(true);

    const [loginUsername, setLoginUsername] = React.useState('');
    const [loginPassword, setLoginPassword] = React.useState('');
    const [registerUsername, setRegisterUsername] = React.useState('');
    const [registerName, setRegisterName] = React.useState('');
    const [registerPassword, setRegisterPassword] = React.useState('');
    const [registerConfPassword, setRegisterConfPassword] = React.useState('');

    const [loaderShown, setLoaderShown] = React.useState(false);

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    React.useEffect(() => {
        setLoaderShown(false);
        dispatch(getUpdateAuthStatusRequest());
        if (auth.userId !== '') {
            navigation.navigate('main_screen');
        }
        if (auth.errorCode !== '') {
            Alert.alert('Warning', getErrorMessage(auth.errorCode));
        }
    }, [auth.userId, navigation, dispatch, auth.errorCode]);

    const _validateCredentials = (username, password, confPass = null, name = null) => {
        if (username.trim().length === 0) { return { success: false, message: 'Username cannot be empty' }; }
        if (password.trim().length === 0) { return { success: false, message: 'Password cannot be empty' }; }
        if (confPass != null && (confPass.trim().length === 0 || password.trim() !== confPass.trim())) { return { success: false, message: 'Passwords are not matching' }; }
        if (name != null && name.trim().length === 0) { return { success: false, message: 'Name cannot be empty' }; }
        return { success: true };
    };

    const _handleLogin = () => {
        setLoaderShown(true);
        let result = _validateCredentials(loginUsername, loginPassword);
        if (!result.success) {
            Alert.alert('Warning', result.message);
            setLoaderShown(false);
            return;
        }
        dispatch(getUserLoginRequest({ email: loginUsername, password: loginPassword }));
        setLoginUsername('');
        setLoginPassword('');
    };

    const _handleRegister = () => {
        setLoaderShown(true);
        let result = _validateCredentials(registerUsername, registerPassword, registerConfPassword, registerName);
        if (!result.success) {
            Alert.alert('Warning', result.message);
            setLoaderShown(false);
            return;
        }
        dispatch(getUserRegisterRequest({ email: registerUsername, password: registerPassword, name: registerName }));
        setRegisterUsername('');
        setRegisterName('');
        setRegisterPassword('');
        setRegisterConfPassword('');
    };

    return (
        <View style={styles.mainContainer}>
            {loaderShown ? <View style={styles.loaderContainer}>
                <Text style={styles.loaderContainerText}>Please wait...</Text>
            </View> : null}
            {loginView ? <View style={styles.col}>
                <Text style={styles.title}>TaskTracker Pro</Text>
                <VerticalSpacer amount={40} />
                <TextInput value={loginUsername} onChangeText={(text) => setLoginUsername(text)} style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Email" placeholderTextColor={'gray'} cursorColor={'gray'} />
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
                    <TextInput value={registerUsername} onChangeText={(text) => setRegisterUsername(text)} style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Email" placeholderTextColor={'gray'} cursorColor={'gray'} />
                    <VerticalSpacer amount={25} />
                    <TextInput value={registerName} onChangeText={(text) => setRegisterName(text)} style={{ ...styles.textbox, ...styles.neumorphicContainer }} placeholder="Name" placeholderTextColor={'gray'} cursorColor={'gray'} />
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

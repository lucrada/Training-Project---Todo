/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';

const AddTodoModal = (props): React.JSX.Element => {
    return (
        <Modal animationType="slide" transparent={true} visible={props.modalVisible} onRequestClose={props.closeModal}>
            <View style={styles.modalContainer}>
                <SafeAreaView style={styles.modalBox}>
                    <Text style={styles.modalText}>Add todo item</Text>
                    <TextInput style={styles.modalTextInput} onChangeText={(text) => props.handleTextChange(text)} placeholder="Enter your task" />
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <TouchableOpacity onPress={props.addItem} style={styles.modalButtonAdd}><Text style={styles.modalButtonText}>Add</Text></TouchableOpacity>
                        <TouchableOpacity onPress={props.closeModal} style={styles.modalButtonClose}><Text style={styles.modalButtonText}>Cancel</Text></TouchableOpacity>
                    </View>
                </SafeAreaView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    modalBox: {
        flexDirection: 'column',
        padding: 10,
        backgroundColor: '#fff',
        width: (Dimensions.get('window').width * 95) / 100,
        height: 200,
        marginBottom: (Dimensions.get('window').width * 20) / 100,
        borderRadius: 10,
    },
    modalText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 25,
    },
    modalTextInput: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#eee',
        fontSize: 18,
        color: '#040d3a',
        marginBottom: 25,
    },
    modalButtonAdd: {
        padding: 12,
        marginRight: 10,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#3dc2a5',
    },
    modalButtonClose: {
        padding: 12,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#ff3461',
    },
    modalButtonText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default AddTodoModal;

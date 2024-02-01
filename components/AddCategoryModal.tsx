/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';

const AddCategoryModal = (props): React.JSX.Element => {
    return (
        <Modal animationType="slide" transparent={true} visible={props.modalVisible} onRequestClose={props.closeModal}>
            <View style={styles.modalContainer}>
                <SafeAreaView style={styles.modalBox}>
                    <Text style={styles.modalText}>Add new category</Text>
                    <TextInput style={styles.modalTextInput} onChangeText={(text) => props.handleTextChange(text)} placeholder="Enter category name" />
                    <Text style={styles.modalText}>Choose a color</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center', marginBottom: 20, width: Dimensions.get('window').width * 0.7}}>
                        <TouchableOpacity onPress={() => props.handleColorChange('#ff3461')}><View style={{width: 50, height: 50, backgroundColor: '#ff3461', borderRadius: 10,}} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => props.handleColorChange('#077ffc')}><View style={{width: 50, height: 50, backgroundColor: '#077ffc', borderRadius: 10,}} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => props.handleColorChange('#fead28')}><View style={{width: 50, height: 50, backgroundColor: '#fead28', borderRadius: 10,}} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => props.handleColorChange('#3dc2a5')}><View style={{width: 50, height: 50, backgroundColor: '#3dc2a5', borderRadius: 10,}} /></TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
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
        marginBottom: (Dimensions.get('window').width) / 100,
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
        backgroundColor: '#040d3a',
    },
    modalButtonClose: {
        padding: 12,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#040d3a',
    },
    modalButtonText: {
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default AddCategoryModal;

/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';

const WINDOW_WIDTH = Dimensions.get('window').width;

const AddCategoryModal = (props): React.JSX.Element => {
    const [selected_1, setSelected_1] = React.useState(false);
    const [selected_2, setSelected_2] = React.useState(false);
    const [selected_3, setSelected_3] = React.useState(false);
    const [selected_4, setSelected_4] = React.useState(false);

    const resetColors = () => {
        setSelected_1(false);
        setSelected_2(false);
        setSelected_3(false);
        setSelected_4(false);
    };

    const handleColorSelection = (id, color) => {
        props.handleColorChange(color);
        if (id == 1) {
            resetColors();
            setSelected_1(true);
        }
        if (id == 2) {
            resetColors();
            setSelected_2(true);
        }
        if (id == 3) {
            resetColors();
            setSelected_3(true);
        }
        if (id == 4) {
            resetColors();
            setSelected_4(true);
        }
    };

    return (
        <Modal animationType="slide" transparent={true} visible={props.modalVisible} onRequestClose={props.closeModal}>
            <View style={styles.modalContainer}>
                <SafeAreaView style={styles.modalBox}>
                    <Text style={styles.modalText}>Add new category</Text>
                    <TextInput style={styles.modalTextInput} onChangeText={(text) => props.handleTextChange(text)} placeholder="Enter category name" />
                    <Text style={styles.modalText}>Choose a color</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', alignSelf: 'center', marginBottom: 20, width: WINDOW_WIDTH * 0.7}}>
                        <TouchableOpacity onPress={() => handleColorSelection(1, '#ff3461')}><View style={{width: 50, height: 50, backgroundColor: '#ff3461', borderRadius: 10, borderWidth: selected_1 ? 2: 0}} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => handleColorSelection(2, '#077ffc')}><View style={{width: 50, height: 50, backgroundColor: '#077ffc', borderRadius: 10, borderWidth: selected_2 ? 2: 0}} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => handleColorSelection(3, '#fead28')}><View style={{width: 50, height: 50, backgroundColor: '#fead28', borderRadius: 10, borderWidth: selected_3 ? 2: 0}} /></TouchableOpacity>
                        <TouchableOpacity onPress={() => handleColorSelection(4, '#3dc2a5')}><View style={{width: 50, height: 50, backgroundColor: '#3dc2a5', borderRadius: 10, borderWidth: selected_4 ? 2: 0}} /></TouchableOpacity>
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
        width: (WINDOW_WIDTH * 95) / 100,
        marginBottom: (WINDOW_WIDTH) / 100,
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

/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native-gesture-handler';
import VerticalSpacer from '../utils/VerticalSpacer';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const WINDOW_WIDTH = Dimensions.get('window').width;

const AddTodoModal = (props): React.JSX.Element => {
    const [mode, setMode] = React.useState('date');
    const [pickerVisibility, setPickerVisibility] = React.useState(false);
    const [date, setDate] = React.useState('');
    const [time, setTime] = React.useState('');

    const showDatePicker = () => {
        setMode('date');
        setPickerVisibility(true);
    };

    const showTimePicker = () => {
        setMode('time');
        setPickerVisibility(true);
    };

    const handleChange = (_, dateTime) => {
        if (mode === 'date') {
            var options = {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
            };
            var formattedDate = dateTime.toLocaleDateString('en-US', options);
            setDate(formattedDate);
            props.handleDateChange(dateTime);
        }
        if (mode === 'time') {
            var options = {
                hour: 'numeric',
                minute: 'numeric',
                hour12: true,
            };

            var formattedTime = dateTime.toLocaleTimeString('en-US', options);
            setTime(formattedTime);
            props.handleTimeChange(dateTime);
        }
        setPickerVisibility(false);
    };

    return (
        <Modal animationType="slide" transparent={true} visible={props.modalVisible} onRequestClose={props.closeModal}>
            <View style={styles.modalContainer}>
                <SafeAreaView style={styles.modalBox}>
                    <Text style={styles.modalText}>Add todo item</Text>
                    <TextInput style={styles.modalTextInput} onChangeText={(text) => props.handleTextChange(text)} placeholder="Enter your task" />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <TouchableOpacity style={styles.dateTimePickerButton} onPress={showDatePicker}><Text style={styles.dateTimePickerButtonText}>Pick date</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.dateTimePickerButton} onPress={showTimePicker}><Text style={styles.dateTimePickerButtonText}>Pick time</Text></TouchableOpacity>
                        <Text style={{ color: '#000', fontWeight: 'bold' }}>{date}</Text>
                        <Text style={{ color: '#000', fontWeight: 'bold' }}>{time}</Text>
                    </View>
                    <VerticalSpacer amount={20} />
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity onPress={props.addItem} style={styles.modalButtonAdd}><Text style={styles.modalButtonText}>Add</Text></TouchableOpacity>
                        <TouchableOpacity onPress={props.closeModal} style={styles.modalButtonClose}><Text style={styles.modalButtonText}>Cancel</Text></TouchableOpacity>
                    </View>
                    {pickerVisibility ? <RNDateTimePicker value={new Date()} mode={mode} onChange={handleChange} minimumDate={new Date()} /> : null}
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
        minHeight: 200,
        marginBottom: (WINDOW_WIDTH * 20) / 100,
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
    dateTimePickerButton: {
        alignSelf: 'flex-start',
        padding: 12,
        marginRight: 10,
        borderRadius: 10,
        backgroundColor: '#040d3a',
    },
    dateTimePickerButtonText: {
        color: '#fff',
    },
});

export default AddTodoModal;

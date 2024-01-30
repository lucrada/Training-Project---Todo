/* eslint-disable prettier/prettier */
import React from 'react';
import { View } from 'react-native';
const VerticalSpacer = (props): React.JSX.Element => {
    return <View style={{ marginBottom: props.amount }}></View>;
};

export default VerticalSpacer;

import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, autoCapitalize, autoCorrect }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={inputStyle}
        underlineColorAndroid='transparent'
        autoCorrect={autoCorrect}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    height: 20,
    width: 100,
    color: '#000',
    paddingRight: 5,
    paddingLeft: 5,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 18,
    lineHeight: 23,
    flex: 3,
    borderBottomWidth: 1
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };

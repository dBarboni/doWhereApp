import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, children, disabled, isFAB }) => {
  const { buttonStyle, textStyle, FABstyle } = styles;

  return (
    <TouchableOpacity onPress={onPress} style={[isFAB ? FABstyle : buttonStyle, { backgroundColor: disabled ? '#999' : '#247BA0' }]} disabled={disabled || false}>
      <Text style={[textStyle, { fontSize: isFAB ? 20 : 16 }]}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5
  },
  textStyle: {
    alignSelf: 'center',
    color: '#fff',
    paddingTop: 10,
    paddingBottom: 10
  },
  FABstyle: {
    width: 50,
    height: 50,
    borderRadius: 25
  }
};

export { Button };

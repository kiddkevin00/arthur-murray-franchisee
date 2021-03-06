import React from 'react';
import { View, Platform, StyleSheet, TextInput } from 'react-native';

import { fonts, colors } from '../styles';

const HEIGHT = 40;
const styles = StyleSheet.create({
  default: {
    height: HEIGHT,
    color: colors.textInputColor,
    fontFamily: fonts.primaryRegular,
    ...Platform.select({
      android: {
        paddingLeft: 5,
        opacity: 0.9,
      },
    }),
  },
  bordered: {
    borderWidth: 0.5,
    borderColor: colors.lightGray,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  dark: {
    color: colors.gray,
  },
  primary: {
    borderRadius: HEIGHT / 2,
    backgroundColor: 'transparent',
  },
});

const RNSTextInput = ({
  type,
  dark,
  style,
  placeholderTextColor,
  containerStyle,
  ...restProps
}) => {
  const finalStyle = [
    styles.default,
    type === 'bordered' && styles.bordered,
    dark && styles.dark,
    style,
  ];

  return (
    <View style={[{ alignSelf: 'stretch', flexDirection: 'column' }, containerStyle]}>
      <TextInput
        placeholderTextColor={placeholderTextColor || colors.placeholderTextInputColor}
        underlineColorAndroid={colors.textInputColor}
        {...restProps}
        style={finalStyle}
      />
      {Platform.OS === 'ios' && (
        <View style={{ height: 0.5, backgroundColor: colors.textInputColor }} />
      )}
    </View>
  );
};

export default RNSTextInput;

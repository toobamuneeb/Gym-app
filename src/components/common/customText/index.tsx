import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../../../utils/theme';
import { Font } from '../../../utils/ImagePath';
import { RFValue } from 'react-native-responsive-fontsize';
import { customtextProp } from './interface';
import React from 'react';

export const TextHuge: React.FC<customtextProp> = ({
  children,
  textStyle,
  ...rest
}) => {
  return (
    <Text style={[styles.text, styles.huge, textStyle]} {...rest}>
      {children}
    </Text>
  );
};
export const TextNormal: React.FC<customtextProp> = ({
  children,
  textStyle,
  bold,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles.normal,
        textStyle,
        bold && { fontFamily: Font.bold },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export const TextSmaller: React.FC<customtextProp> = ({
  children,
  textStyle,
  ...rest
}) => {
  return (
    <Text style={[styles.text, styles.smaller, textStyle]} {...rest}>
      {children}
    </Text>
  );
};

export const TextSmall: React.FC<customtextProp> = ({
  children,
  textStyle,
  bold,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles.small,
        textStyle,
        bold && { fontFamily: Font.bold },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};
export const TextBig: React.FC<customtextProp> = ({
  children,
  textStyle,
  bold,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles.big,
        textStyle,
        bold && { fontFamily: Font.bold },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export const TextBigger: React.FC<customtextProp> = ({
  children,
  textStyle,
  bold,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles.bigger,
        textStyle,
        bold && { fontFamily: Font.bold },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export const TextBiggest: React.FC<customtextProp> = ({
  children,
  bold,
  textStyle,
  ...rest
}) => {
  return (
    <Text
      style={[
        styles.text,
        styles.biggest,
        textStyle,
        bold && { fontFamily: Font.bold },
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: COLORS.textBlack,
    fontFamily: Font.medium,
  },
  huge: {
    fontSize: RFValue(25),
  },
  normal: {
    fontSize: RFValue(14),
  },
  smaller: {
    fontSize: RFValue(11),
  },

  small: {
    fontSize: RFValue(12),
  },

  big: {
    fontSize: RFValue(16),
  },
  bigger: {
    fontSize: RFValue(18),
  },
  biggest: {
    fontSize: RFValue(20),
  },
});

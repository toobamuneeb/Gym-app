import { Pressable, StyleSheet } from 'react-native';
import React, { useMemo, useState } from 'react';
import { COLORS } from '../../../../utils/theme';

const CheckMark = ({ value, handle }: any) => {
  const style = useMemo(() => styles(value), [value]);
  return <Pressable onPress={handle} style={style.container}></Pressable>;
};

export default CheckMark;

const styles = (value: any) =>
  StyleSheet.create({
    container: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: COLORS.Green,
      backgroundColor: value ? COLORS.Green : COLORS.appWhite,
    },
  });

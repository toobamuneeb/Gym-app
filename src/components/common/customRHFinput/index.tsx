import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import CustomTextinput from '../customTextinput';

interface RhProps {
  title?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  rules?: any;
  control?: any;
  name: string;
  multiline?: boolean;
  addBtn?: boolean;
  onAddPress?: () => void;
  inputContainer?: ViewStyle;
  editable?: boolean;
}

const CustomRHFTextInput: React.FC<RhProps> = ({
  title,
  placeholder,
  secureTextEntry,
  rules,
  control,
  name,
  multiline,
  addBtn,
  onAddPress,
  inputContainer,
  editable,
}) => {
  return (
    <View>
      <Controller
        rules={rules}
        control={control}
        name={name}
        defaultValue={null}
        key={name}
        render={({field: {onBlur, onChange, value}, fieldState: {error}}) => (
          <CustomTextinput
            editable={editable}
            inputContainer={inputContainer}
            addBtn={addBtn}
            onAddPress={onAddPress}
            secureTextEntry={secureTextEntry}
            title={title}
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            error={error?.message}
            multiline={multiline}
          />
        )}
      />
    </View>
  );
};

export default CustomRHFTextInput;

const styles = StyleSheet.create({});

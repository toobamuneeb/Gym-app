import {KeyboardTypeOptions, ViewStyle} from 'react-native';

export interface CustomTextinputProp {
  secureTextEntry?: boolean;
  placeholder?: string;
  title?: string | null;
  value?: string;
  onChangeText?: () => void;
  onBlur?: () => void;
  onAddPress?: () => void;
  error?: string;
  mainContainer?: ViewStyle;
  inputStyle?: any;
  inputContainer?: ViewStyle;
  numberOfLines?: number;
  multiline?: boolean;
  addBtn?: boolean;
  editable?: boolean;
  keyboardType?: KeyboardTypeOptions;
}

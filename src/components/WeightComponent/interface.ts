import {KeyboardTypeOptions, TextStyle, ViewStyle} from 'react-native';

export interface WeightCompProp {
  title?: string;
  subtitle1?: string;
  subtitle2?: string;
  subtitle1Style?: ViewStyle;
  subtitle2Style?: ViewStyle;
  rightText?: string;
  btnText?: string;
  rules: any;
  control?: any;
  name: string;
  formState?: any;
  btntitle1: string;
  b1name: string;
  value1: string;
  selectedValue1: string;
  btntitle2: string;
  b2name: string;
  value2: string;
  selectedValue2: string;
  keyboardType?: KeyboardTypeOptions;
}

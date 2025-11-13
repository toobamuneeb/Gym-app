import {TextStyle, ViewStyle} from 'react-native';

export interface btnSelectProps {
  control?: any;
  name: string;
  defaultValue?: string;
  title?: string;
  titleStyle?: TextStyle;
  btnStyle?: ViewStyle;
  onChange1: (onChange: (value: any) => void) => () => void;
}

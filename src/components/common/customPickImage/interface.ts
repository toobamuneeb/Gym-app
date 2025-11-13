import {ImageStyle, TextStyle} from 'react-native';
import {ViewStyle} from 'react-native';

export interface imagePickProps {
  control: any;
  name: string;
  // value: string;
  // selectedValue: string;
  title: string;
  titleStyle?: object;
  btnStyle?: object;
  selectedBtnStyle?: object;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  selectedMedia?: {path: string; mime?: string} | null;
  imageStyle?: ImageStyle;
  pickImageStyle?: ViewStyle;
  personalDetail1?: boolean;
  errstyle?: TextStyle;
}

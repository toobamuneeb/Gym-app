import {ImageStyle} from 'react-native';
import {TextStyle, TouchableOpacityProps, ViewStyle} from 'react-native';

export interface ButtonProps {
  text?: string;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  rightIcon?: boolean;
  calenderIcon?: boolean;
  pickImage?: boolean;
  media?: {
    path?: string;
    bio?: string;
  } | null;
  centerIcon?: boolean;
  type?: any;
  icon?: any;
  color?: string;
  Selection?: boolean;
  Selected?: string;
  value?: string;
  imageStyle?: ImageStyle;
  pickImageStyle?: ViewStyle;
  personalDetail1?: boolean;
  isLoading?: boolean;
}

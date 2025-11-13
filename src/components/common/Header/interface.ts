import {TextStyle, ViewStyle} from 'react-native';

export interface HeaderProps {
  HomeScreen?: boolean;
  navigation?: any;
  title?: string;
  containerStyle?: ViewStyle;
  color?: string;
  message?: boolean;
  headingStyle?: TextStyle;
  onPressNotification?: () => void;
  onPressProfile?: () => void;
  trainerHome?: boolean;
  trainerProfile?: string;
  onBackPress?: () => void;
}

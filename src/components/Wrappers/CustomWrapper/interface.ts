import {ReactNode} from 'react';
import {StatusBarProps, ViewStyle} from 'react-native';
import {Edges} from 'react-native-safe-area-context';

export interface WrapperProps {
  containerStyle?: ViewStyle;
  children?: ReactNode;
  edge?: Edges;
  barStyle?:any,
  barBackground?:string


}

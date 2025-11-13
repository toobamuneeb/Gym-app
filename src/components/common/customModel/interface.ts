import {ReactNode} from 'react';
import {ModalProps, ViewStyle} from 'react-native';

export interface CustomModalProps {
  visible?: boolean;
  onRequestClose?: () => void;
  btnOnpress?: () => void;
  title?: string;
  desc?: string;
  calender?:boolean
}

import {Ref} from 'react';
import {TextStyle, ViewStyle} from 'react-native';

export interface CustomBottomSheetProps {
  reference?: any;
  onOpen?: () => void;
  onClose?: () => void;
  userStyle?: ViewStyle;
  coachStyle?: ViewStyle;
  btnOnpress?: () => void;
  onUserPress?: () => void;
  onCoachPress?: () => void;
  heading?: string;
  headingStyle?: TextStyle;
  mainContainerStyle?: ViewStyle;
  clientPlan?: boolean;
  weekonPress?: () => void;
  monthonPress?: () => void;
  onNext?: () => void;
  Selected?: string;
  name?: any;
  control?: any;
}

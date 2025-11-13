import {ViewStyle} from 'react-native';

export interface ClientCardProp {
  btnView?: ViewStyle;
  data?: Array<{profileImag?: ''}>;
  clientHeader?: string;
  onPress?: () => void;
  clientReq?: boolean;
  icon?: any;
  type?: any;
  head?: string;
  btmText?: string;
  unit?: string;
  count?: number;
}

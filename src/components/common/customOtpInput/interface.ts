import {ViewStyle} from 'react-native';

export interface OtpVerifyProp {
  onChange?: (value: string) => void;
  containerStyle?: object;
  inputStyle?: object;
  error?:string
}

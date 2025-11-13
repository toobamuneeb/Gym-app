import {TextStyle} from 'react-native';

export interface CalenderProps {
  control?: any;
  date: Date;
  onConfirm?: (date: any) => void;
  onCancel?: () => void;
  openDatePicker?: () => void;
  title?: string;
  palceholder?: string;
  titleStyle?: TextStyle;
  name: string;
  fiedlName?: string;
  errorMessage: string;
  open?: boolean;
}

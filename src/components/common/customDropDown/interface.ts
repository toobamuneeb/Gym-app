export interface DropdownProps {
  placeholder?: string;
  value?: string;
  name: string;
  onFocus?: () => void;
  onChange: (text: any) => void;
  onBlur?: () => void;
  data: any[];
  title?: string;
  disable?: boolean;
  control?: any;
  rules?: any;
  onPress?: () => void;
}

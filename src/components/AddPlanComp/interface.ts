export interface planProps {
  onPress?: () => void;
  title?: string;
  count?: number;
  data?: Array<{
    description?: any;
    quantity?: any;
    id?: any;
    // id?: number;
    name?: string;
    desc?: string;
  }>;
  index?: number;
  btnText?: string;
  onPressCross?: () => void;
  exercise?: boolean;
  day?: string; // Added to pass the day name if needed
}

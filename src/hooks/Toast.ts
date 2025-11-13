import FlashMessage, {
  Message,
  MessageOptions,
  MessageType,
  showMessage,
} from 'react-native-flash-message';
import {Font} from '../utils/ImagePath';
import {COLORS} from '../utils/theme';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomIcon} from '../components/common/customIcons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

const useToast = () => {
  const showToast = (type: MessageType, message: string, message2?: string) => {
    showMessage({
      type: type,
      message: message,
      textStyle: {
        color: COLORS.textWhte,
        fontFamily: Font.medium,
        fontSize: RFValue(12),
      },
      textProps: {numberOfLines: 2},
      titleStyle: {
        fontFamily: Font.semiBold,
      },
      description: message2,
    });
  };

  return {showToast};
};
export default useToast;

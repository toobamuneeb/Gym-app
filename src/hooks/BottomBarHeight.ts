// hooks/useSafeTabHeight.ts
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Platform} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export const useSafeTabHeight = () => {
  try {
    const tabBarHeight = useBottomTabBarHeight();
    return tabBarHeight + heightPercentageToDP(2);
  } catch (error) {
    const insets = useSafeAreaInsets();
    return Platform.select({
      ios: insets.bottom + heightPercentageToDP(2),
      android: heightPercentageToDP(2),
    });
  }
};

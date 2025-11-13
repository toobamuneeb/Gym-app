import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {FlatList, View, StyleSheet} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {TextNormal, TextSmall} from '../../../components/common/customText';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {Font} from '../../../utils/ImagePath';
import Header from '../../../components/common/Header';

const Faqs = ({navigation}: any) => {
  const data = [
    {
      id: 0,
      heading: 'Can I cancel my Ride?',
      desc: 'Yes only if the order is not dispatched yet. You can contact our customer service department to get your order canceled.',
    },

    {
      id: 1,
      heading: 'Will I receive the same product I see in the photo?',
      desc: "Actual product color may vary from the images shown. Every monitor or mobile display has a different capability to display colors, and every individual may see these colors differently. In addition, lighting conditions at the time the photo was taken can also affect an image's color.",
    },
    {
      id: 2,
      heading: 'How can I recover the forgotten password?',
      desc: `If you have forgotten your password, you can recover it from ${'Login - Forgotten your password?'} section. You will receive an e-mail with a link to enter and confirm your new password.`,
    },
    {
      id: 3,
      heading: 'Is my personal information confidential?',
      desc: 'Your personal information is confidential. We do not rent, sell, barter or trade email addresses. When you place an order with us, we collect your name, address, telephone number, credit card information and your email address. We use this information to fulfill your order and to communicate with you about your order. All your information is kept confidential and will not be disclosed to anybody unless ordered by government authorities.',
    },
    {
      id: 4,
      heading: 'Will I receive the same product I see in the photo?',
      desc: "Actual product color may vary from the images shown. Every monitor or mobile display has a different capability to display colors, and every individual may see these colors differently. In addition, lighting conditions at the time the photo was taken can also affect an image's color.",
    },
  ];

  return (
    <CustomWrapper edge={['top']}>
      <Header
        headingStyle={{fontSize: RFValue(20), fontFamily: Font.semiBold}}
        title={'FAQs'}
        navigation={navigation}
      />

      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: hp(4)}}
        data={data}
        renderItem={({item, index}) => (
          <View>
            <TextNormal style={{marginTop: hp(2), fontFamily: Font.semiBold}}>
              {item.heading}
            </TextNormal>

            <TextSmall textStyle={{color: '#677282', marginTop: hp(1)}}>
              {item?.desc}
            </TextSmall>
          </View>
        )}
      />
    </CustomWrapper>
  );
};

export default Faqs;

const styles = StyleSheet.create({});

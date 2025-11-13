import {ScrollView, View, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import CustomAboutCard from '../../../components/AboutComp';
import CustomButton from '../../../components/common/customButton';
import CustomWrapper from '../../../components/Wrappers/CustomWrapper';
import {useSendReqMutation} from '../../../redux/Api/client.api';
import useAbout from './useAbout';

const About = ({navigation, route}: any) => {
  const data = route.params.data || {};

  const {onSubmit, isLoading} = useAbout();

  let payload = {
    trainerID: data?._id,
  };

  return (
    <CustomWrapper edge={['top']} containerStyle={{paddingHorizontal: 0}}>
      <ScrollView bounces={false} contentContainerStyle={{flexGrow: 1}}>
        <CustomAboutCard data={data} navigation={navigation} />

        <View style={styles.btnView}>
          <CustomButton
            onPress={() => {
              onSubmit(payload);
            }}
            isLoading={isLoading}
            text="Send Request"
          />
        </View>
      </ScrollView>
    </CustomWrapper>
  );
};

export default About;

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: wp(4),
    padding: wp(2),
    elevation: 5,
  },

  profile: {
    width: '100%',
    height: hp(20),
    borderRadius: wp(4),
  },
  ratingView: {
    flexDirection: 'row',
    padding: wp(0.5),
    backgroundColor: '#484848BF',
    borderRadius: wp(6),
    width: wp(12),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: wp(2),
    top: hp(1),
  },
  speciality: {
    padding: wp(1),
    paddingHorizontal: wp(2),
    borderRadius: wp(10),
    margin: wp(1),
  },
  btnView: {
    flex: 1,
    justifyContent: 'flex-end',
    marginVertical: hp(2),
    paddingHorizontal: wp(5),
  },
});

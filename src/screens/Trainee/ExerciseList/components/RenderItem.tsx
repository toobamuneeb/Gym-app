import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import { COLORS } from '../../../../utils/theme';
import {
  TextNormal,
  TextSmall,
} from '../../../../components/common/customText';
import CheckMark from './CheckMark';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { CustomIcon } from '../../../../components/common/customIcons';
import { useUpdateCompletedMutation } from '../../../../redux/Api/plan.api';
import { apiRequestHandler } from '../../../../utils';
import CustomFullScreenWebView from '../../../../components/common/customFullScreenWebView';

const RenderItem = ({ item, index, setData, planId }: any) => {
  const [value, setValue] = useState(item?.isCompleted);
  const [showVideo, setShowVideo] = useState(false);

  const [handleUpdateIsCompleted] = useUpdateCompletedMutation();

  const handle = useCallback(
    async (index: any, itemId: any) => {
      if (item?.isCompleted) return;
      setValue(!value);
      setData((pre: any) => {
        let i = [...pre?.exercises];
        i[index] = { ...i[index], isCompleted: true };
        return { ...pre, exercises: i };
      });
      const apiResponse = await handleUpdateIsCompleted({ planId, itemId });
      const res = apiRequestHandler(apiResponse);
      console.log(res);
    },
    [value, item?.isCompleted, setData],
  );
  console.log({ showVideo });
  return (
    <>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <TextNormal bold children={`${item?.name}`.toUpperCase()} />
          <CheckMark value={value} handle={() => handle(index, item?._id)} />
        </View>

        <View style={styles.videoContainer}>
          <Pressable
            onPress={() => {
              setShowVideo(!showVideo);
              console.log('PRESSED!!!!');
            }}
            style={styles.videoIconContainer}
          >
            <CustomIcon
              icon="play-circle"
              color="#fff"
              type="fontawesome"
              size={widthPercentageToDP(5)}
            />
          </Pressable>
          <TextSmall children={'watch video for better result'} />
        </View>

        <View style={styles.instructions}>
          <TextSmall
            children={`🟢 ${item?.description}, ${item?.secs} secs each ${item?.name}`}
          />
          <TextSmall children={`🟢 Rest ${item?.secs} sec each sets`} />
        </View>
      </View>

      {showVideo && (
        <CustomFullScreenWebView
          uri={item?.video}
          onClose={() => setShowVideo(false)}
        />
      )}
    </>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.btnGray,
    paddingVertical: widthPercentageToDP(3),

    paddingHorizontal: widthPercentageToDP(4),
    borderRadius: widthPercentageToDP(4),
    marginVertical: widthPercentageToDP(2),
    flex: 1,
  },
  titleContainer: {
    borderBottomWidth: 1,
    paddingVertical: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: COLORS.lightGrey,
  },
  videoContainer: {
    paddingVertical: widthPercentageToDP(2),
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPercentageToDP(4),
  },
  videoIconContainer: {
    height: widthPercentageToDP(14),
    width: widthPercentageToDP(14),
    borderRadius: widthPercentageToDP(3),
    backgroundColor: COLORS.IconBlack,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    zIndex: 99,
  },
  instructions: {
    gap: widthPercentageToDP(2),
    paddingVertical: widthPercentageToDP(2),
  },
});

import { useSelector } from 'react-redux';
import React from 'react';
import { apiRequestHandler } from '../../../utils';
import useToast from '../../../hooks/Toast';
import { ScreenNames } from '../../../navigations/ScreenName';
import {
  useAddPlanMutation,
  useEditPlanMutation,
} from '../../../redux/Api/plan.api';
import { RootState } from '../../../redux/store';
import { useCreateChatMutation } from '../../../redux/Api/chat.api';
import { Alert } from 'react-native';

const usePLan = () => {
  const [addPlan, { isLoading }] = useAddPlanMutation();
  const [edittPlan, { isLoading: editPlanLoading }] = useEditPlanMutation();
  const [createCHAT] = useCreateChatMutation();
  const { showToast } = useToast();
  const handlePlan = React.useCallback(
    async (navigation: any, route: any, planData: any) => {
      if (planData.length !== 7) {
        return Alert.alert('Add plans for the whole week', '');
      }

      for (let dayIndex = 0; dayIndex < planData.length; dayIndex++) {
        const day = planData[dayIndex];

        for (let exIndex = 0; exIndex < day.exercises.length; exIndex++) {
          const ex = day.exercises[exIndex];

          if (!ex.video?.uri) {
            return Alert.alert(
              `Missing Video`,
              `Please upload a video for Day ${dayIndex + 1}, Exercise ${
                exIndex + 1
              }`,
            );
          }
        }
      }
      const { data } = route.params;

      const formData = new FormData();

      formData.append('planType', data?.selectedOption);
      formData.append('planCategory', 'combined');
      formData.append('startDate', data?.startingDate.toString());
      formData.append('endDate', data?.endingDate.toString());
      formData.append('trainerID', data?.trainerID);
      formData.append('userID', data?.userID?._id);

      // CLEAN DAYS (NO VIDEO FILES)

      const cleanDays = planData.map(day => ({
        ...day,
        exercises: day.exercises.map(ex => ({
          name: ex.name,
          description: ex.description,
          isCompleted: false,
          secs: ex?.secs,
          video: null,
        })),
      }));

      formData.append('days', JSON.stringify(cleanDays));

      // ATTACH REAL FILE OBJECTS

      planData.forEach((day, dayIndex) => {
        day.exercises.forEach((ex, exIndex) => {
          if (ex.video?.uri) {
            const file = {
              uri: ex.video.uri,
              type: ex.video.type || 'video/mp4',
              name: ex.video.fileName || `video_${dayIndex}_${exIndex}.mp4`,
            };

            formData.append(`videos_${dayIndex}_${exIndex}`, file);
          }
        });
      });

      console.log('FINAL FORMDATA:', formData);

      try {
        const res = await addPlan(formData);
        const nextRes = apiRequestHandler(res);

        if (nextRes.isSuccess) {
          showToast('success', 'Success', nextRes.data.message);
          navigation.navigate(ScreenNames.PLAN_SUCCESS, {
            data: { ...data, status: 'accepted' },
          });
          createCHAT(data);
        }
      } catch (error) {
        console.log('PLAN ERROR:', error);
      }
    },
    [],
  );

  // const handlePlan = React.useCallback(
  //   async (navigation: any, route: any, planData: any) => {
  //     if (planData.length !== 7) {
  //       return Alert.alert('add plans for Whole Week', '');
  //     }
  //     const { data } = route.params;
  //     // let payload = {
  //     //   planType: data?.selectedOption,
  //     //   planCategory: 'combined',
  //     //   startDate: data?.startingDate.toString(),
  //     //   endDate: data?.endingDate.toString(),
  //     //   trainerID: data?.trainerID,
  //     //   userID: data?.userID?._id,
  //     //   days: planData,
  //     // };

  //     // const formData = new FormData();
  //     // formData.append('planType', data?.selectedOption);
  //     // formData.append('planCategory', 'combined');
  //     // formData.append('startDate', data?.startingDate.toString());
  //     // formData.append('endDate', data?.endingDate.toString());
  //     // formData.append('trainerID', data?.trainerID);
  //     // formData.append('userID', data?.userID?._id);
  //     // formData.append('days', planData);
  //     const formData = new FormData();

  //     formData.append('planType', data?.selectedOption);
  //     formData.append('planCategory', 'combined');
  //     formData.append('startDate', data?.startingDate.toString());
  //     formData.append('endDate', data?.endingDate.toString());
  //     formData.append('trainerID', data?.trainerID);
  //     formData.append('userID', data?.userID?._id);

  //     // extract videos
  //     let videos: any = [];
  //     planData.forEach((d, dayIndex) => {
  //       d.exercises.forEach((ex, exIndex) => {
  //         if (ex.video) {
  //           videos.push({
  //             dayIndex,
  //             exIndex,
  //             file: ex.video,
  //           });
  //         }
  //       });
  //     });

  //     // append full days JSON BUT WITHOUT videos
  //     const cleanDays = planData.map(d => ({
  //       ...d,
  //       exercises: d.exercises.map(ex => ({
  //         name: ex.name,
  //         description: ex.description,
  //         video: null, // placeholder; backend will replace
  //       })),
  //     }));

  //     formData.append('days', JSON.stringify(cleanDays));

  //     // attach videos
  //     videos.forEach((v, index) => {
  //       formData.append(`videos_${v.dayIndex}_${v.exIndex}`, v.file);
  //     });

  //     console.log({ formData });

  //     try {
  //       const res = await addPlan(formData);
  //       const nextRes = apiRequestHandler(res);
  //       console.log({ res, nextRes });
  //       if (nextRes.isSuccess) {
  //         showToast('success', 'Success', nextRes.data.message);

  //         // navigation.navigate(ScreenNames.PLAN_SUCCESS, {
  //         //   data: { ...data, status: 'accepted' },
  //         // });
  //         // createCHAT(data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   },
  //   [],
  // );

  const editPlan = React.useCallback(
    async (navigation: any, route: any, planData: any) => {
      if (planData.length !== 7) {
        return Alert.alert('Add plans for the whole week', '');
      }

      const { data } = route.params;

      const formData = new FormData();

      // --- REQUIRED ---
      formData.append('planID', data.planID);

      // --- CLEAN DAYS DATA (NO RAW FILES) ---
      const cleanDays = planData.map(day => ({
        ...day,
        exercises: day.exercises.map(ex => ({
          name: ex.name,
          description: ex.description,
          video: ex.video?.uri ? null : ex.video,
          // if video exists → backend will replace
          // if no video → send null or keep existing depending on backend logic
        })),
      }));

      formData.append('days', JSON.stringify(cleanDays));

      // --- ATTACH ONLY REAL VIDEO FILES ---
      planData.forEach((day, dayIndex) => {
        day.exercises.forEach((ex, exIndex) => {
          if (!ex.video?.uri) return; // ⛔ skip if no video

          const file = {
            uri: ex.video.uri,
            type: ex.video.type || 'video/mp4',
            name: ex.video.fileName || `video_${dayIndex}_${exIndex}.mp4`,
          };

          formData.append(`videos_${dayIndex}_${exIndex}`, file);
        });
      });

      console.log('FINAL EDIT FORMDATA:', formData);

      try {
        const res = await edittPlan(formData);
        const nextRes = apiRequestHandler(res);

        if (nextRes.isSuccess) {
          showToast('success', 'Success', nextRes.data.message);

          navigation.navigate(ScreenNames.PLAN_SUCCESS, {
            data: { ...data, status: 'accepted' },
          });
        }
      } catch (error) {
        console.log('EDIT PLAN ERROR:', error);
      }
    },
    [],
  );

  return {
    handlePlan,
    isLoading,
    editPlan,
    editPlanLoading,
  };
};
export default usePLan;

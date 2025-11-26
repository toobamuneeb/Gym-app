import { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

type FormData = {
  media: { path: any; mime?: string; name?: string } | null;
};
const useImagePicker = () => {
  const { setValue, watch, control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      media: null,
    },
  });
  const [val, setVal] = useState<any>(null);
  const selectedMedia = watch('media');

  const maxFileSizeInBytes = 500 * 1024 * 1024; // 50MB in bytes

  const openCamera = async ({ mediaType }: any) => {
    let config = {
      // forceJpg: true,
      cropping: mediaType === 'video' || 'any' ? false : true,
      multiple: false,
      maxFiles: 1,
      mediaType: mediaType,
    };

    try {
      const res = await ImagePicker.openCamera(config);

      if (res?.size > maxFileSizeInBytes) {
        Alert.alert(
          'File Size Exceeded',
          'Please select a file with size less than 50MB',
          [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ],
        );
        return;
      }
      //   if (res.mime.includes('video')) {
      //     return Alert.alert("'Video Found';");
      //   }
      setValue('media', {
        path: res?.path || res.sourceURL,
        mime: res?.mime,
        name: res?.filename,
      });

      setVal({
        path: res?.path || res.sourceURL,
        mime: res?.mime,
        name: res?.filename,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message !== 'User cancelled image selection') {
          Alert.alert('Error', 'Failed to take photo');
        }
      }
    }
  };

  const openGallery = async (mediaType: any) => {
    let config = {
      forceJpg: true,
      cropping: mediaType === 'video' || 'any' ? false : true,
      multiple: false,
      maxFiles: 1,
      mediaType: mediaType,
    };
    try {
      const res = await ImagePicker.openPicker(config);

      if (res?.size > maxFileSizeInBytes) {
        Alert.alert(
          'File Size Exceeded',
          'Please select a file with size less than 50MB',
          [
            {
              text: 'Ok',
              onPress: () => {},
            },
          ],
        );
        return;
      }
      if (res.mime.includes('video')) {
        setVal({
          path: res?.path || res.sourceURL,
          mime: res?.mime,
          name: res?.filename,
        });
      }
      setValue('media', {
        path: res?.path || res.sourceURL,
        mime: res?.mime,
        name: res?.filename,
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message !== 'User cancelled image selection') {
          Alert.alert('Error', 'Failed to select image');
        }
      }
    }
  };

  return {
    openCamera,
    openGallery,
    selectedMedia,
    val,
  };
};

export default useImagePicker;

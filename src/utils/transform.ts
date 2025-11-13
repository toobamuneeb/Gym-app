export const TodaysPlanTransform = (response: {data: any}) => {
  

  const currentDay = new Date().toLocaleString('en-US', {
    weekday: 'long',
  });
  const todaysPlan = response?.data?.days?.find(
    (day: any) => day?.day === currentDay,
  );

  return todaysPlan
    ? {
        ...todaysPlan,
        meals: todaysPlan?.meals[0]?.items,
      }
    : null;
};

export const allPlansTransform = (response: {data: any}) => {

  return {
    ...response.data,
    days: response?.data?.days?.map((day: any) => ({
      ...day,
    })),
  };
};
export const messageTransform = (response: {data: any}) => {
  const res = response.data.chat[0]._id;

  return {
    ...response.data,
    dataaaa: 'Hello This is new ',
    res,
  };
};

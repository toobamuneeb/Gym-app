import {createSlice} from '@reduxjs/toolkit';

interface TraineeProfile {
  Dob: string;
  gender: string;
  goalWeight: string;
  height: string;
  profileImage: string;
  weight: string;
}
interface TrainerProfile {
  profileImage: string;
  Dob: string;
  gender: string;
  country: string;
  city: string;
  certification: string;
  specialization: string[];
  bio: string;
  clients: string[];
  requests: string[];
  clientRequests: number;
  totalClients: number;
  rating: number;
}

interface User {
  data: {
    createdAt: string;
    email: string;
    fcmToken: string | null;
    firstName: string;
    isVerified: boolean | null;
    lastName: string;
    role: string;
    traineeProfile: TraineeProfile | null;
    trainerProfile: TrainerProfile | null;
    __v: number | null;
    _id: string;
  };
  loginData: {
    Token: string;
    role: string;
  };
  fcmToken: string | null;
}
const initialState: User = {
  data: {
    createdAt: '',
    email: '',
    fcmToken: null,
    firstName: '',
    isVerified: null,
    lastName: '',
    role: '',
    traineeProfile: null,
    trainerProfile: null,
    __v: null,
    _id: '',
  },
  loginData: {
    Token: '',
    role: '',
  },
  fcmToken: null,
};

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setLogin: (state, {payload}) => {

      delete payload.isToken, (state.data = payload);
    },
    setToken: (state, {payload}) => {
      state.loginData = payload;
    },
    setFcmToken: (state, {payload}) => {

      state.fcmToken = payload;
    },
  },
});
export const {setLogin, setToken, setFcmToken} = generalSlice.actions;
export default generalSlice.reducer;

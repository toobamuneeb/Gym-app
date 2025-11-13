interface TraineeProfile {
  profileImage: string;
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  traineeProfile: TraineeProfile;
}

export interface Client {
  [x: string]: any;
  firstName: any;
  lastName: any;
  _id: string;
  createdAt: string;
  updatedAt: string;
  status: 'accepted' | 'pending' | 'rejected'; // adjust based on possible values
  trainerID: string;
  userID: User;
}

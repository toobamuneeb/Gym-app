export interface ChatItem {
  lastonline: string;
  _id?: string;
  latestMessage?: string;
  sendTime?: Date;
  users: Array<{
    traineeProfile: {profileImage?: string};
    trainerProfile: {profileImage?: string};
    email: string;
    firstName?: string;
    lastName?: string;
    _id?: string;
  }>;
}

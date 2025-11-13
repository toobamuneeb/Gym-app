// types/message.ts
export interface Message {
  _id: string;
  text: string;
  createdAt: Date;
  user: {
    firstName: any;
    _id: string;
    // name: string;
    avatar?: string;
  };
}

export interface SendMessagePayload {
  text: string;
  chatID: string;
}

export interface GetMessagesParams {
  chatID: string;
}

export interface MessagesResponse {
  data: Message[];
  success: boolean;
  message?: string;
}

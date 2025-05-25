export interface Participant {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

export interface Message {
  id: string;
  text: string;
  createdAt: Date;
  sender: Participant;
}

export interface ChatBase {
  id: string;
  title: string;
  isGroup: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Chat extends ChatBase {
  participants: Participant[];
}

export interface ChatDetails extends Chat {
  messages: Message[];
}

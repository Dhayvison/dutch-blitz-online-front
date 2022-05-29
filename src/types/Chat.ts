export type ChatMessage = {
  id: string;
  user: ChatUser;
  text: string;
  time: number;
};

export type ChatUser = {
  id: string;
  name: string;
};

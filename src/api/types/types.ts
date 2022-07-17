// Common
export type CommonResponse<R = string> = R | { reason: string };

type User = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

// Auth API
export type SignUpRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type LoginRequest = {
  login: string;
  password: string;
};

export type UserResponse = CommonResponse<User>;

// User API
export type ProfileRequest = {
  display_name: string;
  email: string;
  first_name: string;
  login: string;
  phone: string;
  second_name: string;
};

export type PasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type SearchUserRequest = {
  login: string;
};

export type ProfileResponse = CommonResponse<User>;

// Chats API
export type Chat = {
  id: number;
  title: string;
  avatar: string;
  unread_count: string;
  last_message: {
    user: User;
    time: string;
    content: string
  }
};

export type Message = {
  id: number;
  user_id: number;
  chat_id: number;
  time: string;
  type: 'message' | 'file';
  content: string;
  file?: Resource;
};

type Resource = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
};

export type ChatUser = User & { role: string };

export type GetChatsRequest = {
  offset?: number;
  limit?: number;
  title?: number;
};

export type CreateChatRequest = {
  title: string;
};

export type DeleteChatRequest = {
  chatId: number;
};

export type GetChatUsersRequest = {
  offset?: string;
  limit?: string;
  name?: string;
  email?: string;
};

export type UsersRequest = {
  users: Array<number>;
  chatId: number;
};

export type ChatsResponse = Array<Chat>;

export type DeleteChatResponse = { chatId: number };

export type ChatUsersResponse = Array<ChatUser>;

export type TokenResponse = Array<{ token: string }>;

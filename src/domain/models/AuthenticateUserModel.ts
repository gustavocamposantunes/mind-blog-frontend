export interface AuthenticateUserModel {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
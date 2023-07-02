export interface RegisterProps {
  username: string;
  email: string;
  password: string;
};
export interface LoginProps {
  email: string;
  password: string;
};
export interface SettingProps {
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}
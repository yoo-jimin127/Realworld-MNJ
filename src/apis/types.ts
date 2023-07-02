export interface RegisterProps {
  username: string;
  email: string;
  password: string;
}
export interface LoginProps {
  email: string;
  password: string;
}
export interface SettingProps {
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}

export interface ArticleProps {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: true;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

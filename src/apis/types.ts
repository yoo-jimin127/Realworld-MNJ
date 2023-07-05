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
export interface ArticleResponse {
  articles: ArticleListProps[];
  articlesCount: number;
}

export interface ArticleListProps {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: {
    username: string;
    bio: string;
    image: string;
    following: boolean;
  };
}

export interface ArticleProps {
  title: string;
  description: string;
  body: string;
  tagList?: string[];
}

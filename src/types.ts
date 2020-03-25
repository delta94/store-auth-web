export type SocialProvider = {
  name: string;
}

export type AppContextType = {
  providers: SocialProvider[];
  loading: boolean;
  setLoading: (newLoading: boolean) => void;
}

export type User = {
  avatar: string;
  email: string;
  username: string;
}

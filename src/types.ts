export type User = {
  url?: string;
  email: string;
}

export type SocialProvider = {
  name: string;
}

export type AppContextType = {
  providers: SocialProvider[];
  loading: boolean;
  setLoading: (newLoading: boolean) => void;
}

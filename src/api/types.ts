export interface SignInProps {
  email: string;
  password: string;
  remember: boolean;
}

export interface SignUpProps {
  email: string;
  password: string;
  username: string;
}

export type RequestType = 'login' | 'signup';

export type RequestProps = SignInProps | SignUpProps;

export type ResponceError = {
  error: string;
  message: string;
}

export type ResponceSuccess = {
  url?: string;
  captcha?: boolean; 
}

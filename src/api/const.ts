export const SIGN_IN_URL = 'oauth2/login';
export const SIGN_UP_URL = 'oauth2/signup';
export const CHECK_USERNAME_URL = 'oauth2/checkUsername';
export const PASSWORD_RESET_URL = 'api/password/reset';
export const SET_PASSWORD_URL = 'api/password/reset/set';
export const CHECK_RESET_TOKEN_URL = 'api/password/reset/link';
export const GET_CAPTCHA_KEY_V3_URL = 'api/captcha/key?type=re3';
export const SOCIAL_URL = 'api/providers';
export const GET_PREVIOS_USER_URL = 'api/login/hint';

export const XSRF_KEY = '_csrf';
export const CHALLENGE_KEY = 'login_challenge';

export const UNKNOWN_ERROR = {
  error: 'errors.one.protocol.auth1.unknown',
  code: 'AU-1000',
};

export const LOGIN_URL = `${process.env.REACT_APP_STORE_URL}/api/v1/auth/login`;
export const AUTH_CALLBACK_URL = `https://${window.location.host}/auth-callback`;
export const SOCKET_URL = `wss://${window.location.host}/centrifugo/websocket`;

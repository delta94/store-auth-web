import { getCookie, getUrlParameter } from 'helpers';

import {
  XSRF_KEY,
  BASE_URL,
  CHALLENGE_KEY,
  SIGN_IN_URL,
  SIGN_UP_URL,
  PASSWORD_RESET_URL,
  CHECK_RESET_TOKEN_URL,
  UNKNOWN_ERROR,
  SET_PASSWORD_URL,
} from './const';

const getXSRFToken = () => getCookie(XSRF_KEY) || '';

const getPOSTrequest = (requestUrl: string) => async (data: any) => {
  const url = `${BASE_URL}/${requestUrl}`;
  const challenge = getUrlParameter(CHALLENGE_KEY);

  try {
    const responce = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-xsrf-token': getXSRFToken(),
      },
      credentials: 'include',
      body: JSON.stringify({ challenge, ...data }),
    });

    const json = await responce.json();

    return json;
  } catch (err) {
    return UNKNOWN_ERROR;
  }
};

const getGETrequest = (requestUrl: string) => async () => {
  const url = `${BASE_URL}/${requestUrl}`;

  try {
    const responce = await fetch(url);
    const json = await responce.json();

    return json;
  } catch (err) {
    return UNKNOWN_ERROR;
  }
};

export const signInRequest = getPOSTrequest(SIGN_IN_URL);
export const signUpRequest = getPOSTrequest(SIGN_UP_URL);
export const passwordResetRequest = getPOSTrequest(PASSWORD_RESET_URL);
export const setPasswordRequest = getPOSTrequest(SET_PASSWORD_URL);

export const checkResetTokenRequest = (token: string) => {
  const url = `${CHECK_RESET_TOKEN_URL}${token}`;

  const request = getGETrequest(url);
  return request();
};

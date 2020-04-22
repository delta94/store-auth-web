import { getCookie, getUrlParameter, getUrlWithSearch } from 'helpers';

import {
  XSRF_KEY,
  CHALLENGE_KEY,
  SIGN_IN_URL,
  SIGN_UP_URL,
  PASSWORD_RESET_URL,
  CHECK_RESET_TOKEN_URL,
  UNKNOWN_ERROR,
  SET_PASSWORD_URL,
  SOCIAL_URL,
  GET_PREVIOS_USER_URL,
} from './const';

const getXSRFToken = () => getCookie(XSRF_KEY) || '';

export const getChallenge = () => getUrlParameter(CHALLENGE_KEY);

const getPOSTrequest = (requestUrl: string) => async (data: any) => {
  const challenge = getChallenge();

  try {
    const responce = await fetch(requestUrl, {
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
  try {
    const responce = await fetch(requestUrl);
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
export const checkResetTokenRequest = getPOSTrequest(CHECK_RESET_TOKEN_URL);

export const getPreviosUserRequest = getGETrequest(GET_PREVIOS_USER_URL);

export const getSocialProvidersRequest = getGETrequest(getUrlWithSearch(SOCIAL_URL));

export const getLauncherSocialLoginCancelRequest = (name: string) => {
  const url = `${SOCIAL_URL}/${name}/cancel`;
  const request = getGETrequest(getUrlWithSearch(url));
  return request();
};

export const getLuancherSocialLoginConfirmRequest = (name: string) => {
  const url = `${SOCIAL_URL}/${name}/confirm`;
  const request = getGETrequest(getUrlWithSearch(url));
  return request();
};

export const getSocialProfileRequest = (name: string, token: string) => {
  const url = `${SOCIAL_URL}/${name}/profile?token=${token}`;
  const request = getGETrequest(url);
  return request();
};

export const createSignUpSocialRequest = (name: string) => {
  const url = `${SOCIAL_URL}/${name}/signup`;
  return getPOSTrequest(url);
};

export const createLinkSocialRequest = (name: string) => {
  const url = `${SOCIAL_URL}/${name}/link`;
  return getPOSTrequest(url);
};

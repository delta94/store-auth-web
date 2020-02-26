import { BASE_URL, CHECK_USERNAME_URL, CHALLENGE_KEY } from 'api/const';
import { PASSWORD, EMAIL, USERNAME } from 'const';

const MIN_PASSWORD_LENGTH = Number(process.env.REACT_APP_MIN_PASSWORD_LENGTH);
const MAX_PASSWORD_LENGTH = Number(process.env.REACT_APP_MAX_PASSWORD_LENGTH);

const CAPTCHA_REQUIRED_ERROR = 'errors.one.protocol.auth1.captcha_required';

export const getUrlParameter = (name: string) => {
  const search = window.location.search;
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

export const emailValidate = (str: string) => {
  // eslint-disable-next-line no-useless-escape
  const valid = /^\w+([\.+-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
  const error = valid ? '' : `errors.${EMAIL}-incorrect`;

  return { valid, error };
};

export const passwordValidate = (pass: string) => {
  const valid = pass.length >= MIN_PASSWORD_LENGTH &&
    pass.length <= MAX_PASSWORD_LENGTH &&
    !pass.includes(' ') &&
    /\d/.test(pass) && 
    /[a-z]/i.test(pass);
  const error = valid ? '' : `errors.${PASSWORD}-incorrect`;

  return { valid, error };
};

export const nameValidate = async (username: string) => {
  const url = `${BASE_URL}/${CHECK_USERNAME_URL}`;
  const challenge = getUrlParameter(CHALLENGE_KEY);

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, challenge }),
    });

    const { available, error: responseError } = await response.json();

    if (responseError) throw new Error(responseError);

    const error = available ? '' : `errors.${USERNAME}-incorrect`;

    return { valid: available, error };
  } catch (error) {
    return { valid: false, error: 'errors.username-check-failed' };
  }
};

export const setCookie = (
  name: string,
  value: string,
  expires?: Date | null,
  path?: string,
) => {
  let cookie = `${name}=${value}`;
  if (expires) { cookie = `${cookie}; expires=${expires}`; }
  if (path) { cookie = `${cookie}; path=${path}`; }
  document.cookie = cookie;
};

export const getCookie = (name: string) => {
  const matches = document.cookie.match(new RegExp(
    // eslint-disable-next-line
    `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

export const deleteCookie = (name: string) => {
  setCookie(name, '', new Date(Date.now()));
};

export const getUrlWithSearch = (url: string) => {
  const search = window.location.search;

  return `${url}${search}`;
};

export const checkCaptchaRequired = (error: string) => error === CAPTCHA_REQUIRED_ERROR;

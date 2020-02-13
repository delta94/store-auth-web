const MIN_PASSWORD_LENGTH = Number(process.env.REACT_APP_MIN_PASSWORD_LENGTH);
const MAX_PASSWORD_LENGTH = Number(process.env.REACT_APP_MAX_PASSWORD_LENGTH);

export const emailValidate = (str: string) => {
  // eslint-disable-next-line no-useless-escape
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
};

export const passwordValidate = (pass: string) => (
  pass.length >= MIN_PASSWORD_LENGTH &&
  pass.length <= MAX_PASSWORD_LENGTH &&
  !pass.includes(' ') &&
  /\d/.test(pass) && 
  /[a-z]/i.test(pass)
);

export const nameValidate = (name: string) => {
  // Here will be responce from server
  return Promise.resolve(name.length > 4);
};

export const getUrlParameter = (name: string) => {
  const search = window.location.search;
  const regex = new RegExp(`[\\?&]${name}=([^&#]*)`);
  const results = regex.exec(search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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

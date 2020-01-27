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

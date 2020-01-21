const MIN_PASSWORD_LENGTH = 7;
const MAX_PASSWORD_LENGTH = 30;

export const emailValidate = (str: string) => {
  // eslint-disable-next-line no-useless-escape
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(str);
};

export const passwordValidate = (pass: string) => {
  if (pass.length < MIN_PASSWORD_LENGTH || pass.length > MAX_PASSWORD_LENGTH) return false;

  if (pass.includes(' ')) return false;

  return /\d/.test(pass) && /[a-z]/i.test(pass);
};

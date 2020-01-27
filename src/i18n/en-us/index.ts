/* eslint-disable max-len */
const PLATFORM = process.env.REACT_APP_PLATFORM;
const MIN_PASSWORD_LENGTH = process.env.REACT_APP_MIN_PASSWORD_LENGTH;

export default {
  translation: {
    'facebook': 'Facebook',
    'twitter': 'Twitter',
    'email': 'Email',
    'display-name': 'Display name',
    'password': 'Password',
    'sign-in': 'Sign In',
    'sign-up': 'Sign Up',
    'reset-password': 'Reset password',
    'remember': 'Remember me',
    'forgot-password': 'Forgot your password',
    'dont-have-account': `Don't have an ${PLATFORM} account`,
    'already-have-account': `If you already have an ${PLATFORM} account, please`,
    'terms-agree': 'I have and agree to the',
    'terms-of-use': 'Terms of Use',
    'privacy-policy': 'Privacy policy',
    'password-tooltip': `Password must have ${MIN_PASSWORD_LENGTH}+ characters, at least 1 number, at least 1 letter and no whitespace.`,
    'errors': {
      'email-incorrect': 'Incorrect email',
      'password-incorrect': 'Incorrect password',
      'empty-field': 'Empty field',
      'not-exist': 'Account doesn\'t exist',
    },
  },
};

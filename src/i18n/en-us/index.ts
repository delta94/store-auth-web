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
    'password-reset': 'Reset password',
    'remember': 'Remember me',
    'forgot-password': 'Forgot your password',
    'remember-password':'Remember your password',
    'dont-have-account': `Don't have an ${PLATFORM} account`,
    'already-have-account': `If you already have an ${PLATFORM} account, please`,
    'terms-agree': 'I have and agree to the',
    'terms-of-use': 'Terms of Use',
    'privacy-policy': 'Privacy policy',
    'password-tooltip': `Password must have ${MIN_PASSWORD_LENGTH}+ characters, at least 1 number, at least 1 letter and no whitespace.`,
    'captcha': 'Captcha',
    'captcha-description': 'This question is for testing whether or not you are a human visitor prevent automated spam submissions',
    'verify': 'verify',
    'password-reset-description': 'Please enter the email that you used to register. You will be sent an email with instructions on how to reset your password',
    'email-sent-title': 'We sent you an email',
    'email-sent-text-start': `The link to reset your password has been send to your email address. If you don’t receive it within a few minutes, please check that you used the e-mail address for you ${PLATFORM} account and try again or`,
    'email-sent-text-end': 'for help',
    'contact-us': 'contact us',
    'ok': 'Ok',
    'errors': {
      'email-incorrect': 'Incorrect email',
      'password-incorrect': 'Incorrect password',
      'displayName-incorrect': 'Already taken',
      'empty-field': 'Empty field',
      'not-exist': 'Account doesn\'t exist',
    },
  },
};

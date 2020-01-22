const PLATFORM = process.env.REACT_APP_PLATFORM;

export default {
  translation: {
    'title': 'Hello!',
    'facebook': 'Facebook',
    'twitter': 'Twitter',
    'email': 'Email',
    'password': 'Password',
    'sign-in': 'Sign In',
    'sign-up': 'Sign Up',
    'remember': 'Remember me',
    'forgot-password': 'Forgot your password',
    'dont-have-account': `Don't have an ${PLATFORM} account`,
    'privacy-policy': 'Privacy policy',
    'errors': {
      'email-incorrect': 'Incorrect email',
      'password-incorrect': 'Incorrect password',
      'empty-field': 'Empty field',
      'not-exist': 'Account doesn\'t exist',
    },
  },
};

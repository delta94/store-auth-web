const PLATFORM = process.env.REACT_APP_PLATFORM;

export default {
  translation: {
    'facebook': 'Facebook',
    'twitter': 'Twitter',
    'email': 'Почта',
    'password': 'Пароль',
    'sign-in': 'Вход',
    'sign-up': 'Регистрация',
    'remember': 'Запомнить меня',
    'forgot-password': 'Забыли пароль',
    'dont-have-account': `Нет учетной записи ${PLATFORM}`,
    'privacy-policy': 'Политика конфиденциальности',
    'errors': {
      'email-incorrect': 'Недопустимый адрес почты',
      'password-incorrect': 'Недопустимый пароль',
      'empty-field': 'Поле не может быть пустым',
      'not-exist': 'Учетная запись не существует',
    },
  },
};

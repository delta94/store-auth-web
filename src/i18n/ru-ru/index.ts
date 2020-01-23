const PLATFORM = process.env.REACT_APP_PLATFORM;

export default {
  translation: {
    'facebook': 'Facebook',
    'twitter': 'Twitter',
    'email': 'Почта',
    'display-name': 'Отображаемое имя',
    'password': 'Пароль',
    'sign-in': 'Вход',
    'sign-up': 'Регистрация',
    'remember': 'Запомнить меня',
    'forgot-password': 'Забыли пароль',
    'dont-have-account': `Нет учетной записи ${PLATFORM}`,
    'already-have-account': `Уже есть учётная запись ${PLATFORM}?`,
    'terms-agree': 'Я прочитал(а) и принимаю',
    'terms-of-use': 'Условия предоставления услуг',
    'privacy-policy': 'Политика конфиденциальности',
    'errors': {
      'email-incorrect': 'Недопустимый адрес почты',
      'password-incorrect': 'Недопустимый пароль',
      'empty-field': 'Поле не может быть пустым',
      'not-exist': 'Учетная запись не существует',
    },
  },
};

/* eslint-disable max-len */
const PLATFORM = process.env.REACT_APP_PLATFORM;
const MIN_PASSWORD_LENGTH = process.env.REACT_APP_MIN_PASSWORD_LENGTH;

export default {
  translation: {
    'facebook': 'Facebook',
    'twitter': 'Twitter',
    'email': 'Почта',
    'display-name': 'Отображаемое имя',
    'password': 'Пароль',
    'sign-in': 'Вход',
    'sign-up': 'Регистрация',
    'reset-password': 'Сброс пароля',
    'remember': 'Запомнить меня',
    'forgot-password': 'Забыли пароль',
    'dont-have-account': `Нет учетной записи ${PLATFORM}`,
    'already-have-account': `Уже есть учётная запись ${PLATFORM}?`,
    'terms-agree': 'Я прочитал(а) и принимаю',
    'terms-of-use': 'Условия предоставления услуг',
    'privacy-policy': 'Политика конфиденциальности',
    'password-tooltip': `Пароль должен содержать ${MIN_PASSWORD_LENGTH}+ символов, не менее 1 цифры, не менее 1 буквы и не содержать пробелов.`,
    'captcha': 'Captcha',
    'captcha-description': 'Этот вопрос предназначен для проверки того, являетесь ли вы человеком, чтобы предотвратить автоматическую рассылку спама',
    'verify': 'Проверить',
    'errors': {
      'email-incorrect': 'Недопустимый адрес почты',
      'password-incorrect': 'Недопустимый пароль',
      'displayName-incorrect': 'Уже занято',
      'empty-field': 'Поле не может быть пустым',
      'not-exist': 'Учетная запись не существует',
    },
  },
};

import { useState, useEffect } from 'react';
import { BASE_URL, GET_CAPTCHA_KEY_V3_URL } from 'api/const';

const CAPTCHA_BASE_URL = 'https://www.google.com/recaptcha/api.js?render=';
const captchaAction = 'homepage';

export default () => {
  const [loading, setLoading] = useState(true);
  const [captchaToken, setToken] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const handleError = (err: Error) => {
    setLoading(false);
    setError(err);
  };

  const executeCaptcha = (key: string) => {
    const grecaptcha = (window as any).grecaptcha;

    grecaptcha.ready(() => {
      grecaptcha.execute(key, { action: captchaAction })
        .then((token: string) => {
          setLoading(false);
          setToken(token);
        });
    });
  };

  const initCaptcha = async () => {
    try {
      const getKeyUrl = `${BASE_URL}/${GET_CAPTCHA_KEY_V3_URL}`;
      const response = await fetch(getKeyUrl);
      const { key } = await response.json();

      if ((window as any).grecaptcha) {
        executeCaptcha(key);
        return;
      }

      const captchaURL = `${CAPTCHA_BASE_URL}${key}`;

      const script = document.createElement('script');
      script.async = true;
      script.src = captchaURL;
      document.body.append(script);
      
      script.onload = () => executeCaptcha(key);

      script.onerror = () => {
        const err = new Error('Captcha script load error');
        handleError(err);
      };
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    initCaptcha();
    // eslint-disable-next-line 
  }, []);

  return { captchaToken, captchaAction, loading, error };
};

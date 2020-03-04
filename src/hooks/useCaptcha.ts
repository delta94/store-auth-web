import { useState, useEffect, useRef } from 'react';
import { BASE_URL, GET_CAPTCHA_KEY_V3_URL } from 'api/const';
import { windowAlias } from 'helpers';

const CAPTCHA_BASE_URL = 'https://www.google.com/recaptcha/api.js?render=';
const captchaAction = 'homepage';

export default (disabled = false) => {
  const [loading, setLoading] = useState(false);
  const keyRef = useRef('');
  const [error, setError] = useState<Error | null>(null);

  const handleError = (err: Error) => {
    setLoading(false);
    setError(err);
  };

  const getToken = async () => {
    const grecaptcha = windowAlias.grecaptcha;

    return grecaptcha.execute(keyRef.current, { action: captchaAction });
  };

  const handleReady = () => setLoading(false);

  const initCaptcha = async () => {
    setLoading(true);
    try {
      const getKeyUrl = `${BASE_URL}/${GET_CAPTCHA_KEY_V3_URL}`;
      const response = await fetch(getKeyUrl);
      const { key } = await response.json();
      keyRef.current = key;

      if (windowAlias.grecaptcha) {
        windowAlias.grecaptcha.ready(handleReady);
        return;
      }

      const captchaURL = `${CAPTCHA_BASE_URL}${key}`;

      const script = document.createElement('script');
      script.async = true;
      script.src = captchaURL;
      document.body.append(script);
      
      script.onload = () => {
        windowAlias.grecaptcha.ready(handleReady);
      };

      script.onerror = () => {
        const err = new Error('Captcha script load error');
        handleError(err);
      };
    } catch (err) {
      handleError(err);
    }
  };

  useEffect(() => {
    if (!disabled) initCaptcha();
    // eslint-disable-next-line 
  }, []);

  return { getToken, captchaAction, loading, error };
};

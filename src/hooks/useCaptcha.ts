import { useState, useEffect } from 'react';

// This is Google Recaptcha V3 hook
export default (captchaKey: string) => {
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const captchaURL = `https://www.google.com/recaptcha/api.js?render=${captchaKey}`;

  const initCaptcha = () => {
    const script = document.createElement('script');
    script.async = true;
    script.src = captchaURL;
    document.body.append(script);
    
    script.onload = () => {
      const grecaptcha = (window as any).grecaptcha;

      grecaptcha.ready(() => {
        grecaptcha.execute(captchaKey, { action: 'homepage' })
          .then((token: string) => {
            setLoading(false);
            setToken(token);
          });
      });
    };

    script.onerror = () => {
      const err = new Error('Captcha script load error');
      setLoading(false);
      setError(err);
    };
  };

  useEffect(() => {
    initCaptcha();
  }, []);

  return { token, loading, error };
};

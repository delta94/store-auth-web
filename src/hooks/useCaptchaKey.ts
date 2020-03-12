import { useState, useEffect } from 'react';
import { BASE_URL, GET_CAPTCHA_KEY_V3_URL } from 'api/const';

export default () => {
  const [loading, setLoading] = useState(false);
  const [sitekey, setSitekey] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const init = async () => {
    setLoading(true);
    try {
      const getKeyUrl = `${BASE_URL}/${GET_CAPTCHA_KEY_V3_URL}`;
      const response = await fetch(getKeyUrl);
      const { key } = await response.json();
      
      setSitekey(key);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err);
    }
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line 
  }, []);

  return { sitekey, loading, error };
};

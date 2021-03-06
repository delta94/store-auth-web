import { useState, useEffect, useContext } from 'react';
import { GET_CAPTCHA_KEY_V3_URL } from 'api/const';
import { AppContext } from 'App';

export default () => {
  const { setLoading } = useContext(AppContext);
  const [sitekey, setSitekey] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const init = async () => {
    setLoading(true);
    try {
      const response = await fetch(GET_CAPTCHA_KEY_V3_URL);
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

  return { sitekey, error };
};

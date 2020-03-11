import { useState, useEffect, useContext } from 'react';
import { getSocialProvidersRequest } from 'api';
import { SocialProvider } from 'types';
import { AppContext } from 'App';

export default () => {
  const { setLoading } = useContext(AppContext);
  const [providers, setProviders] = useState<SocialProvider[]>([]);
  
  const getProviders = async () => {
    setLoading(true);

    const response = await getSocialProvidersRequest();

    if (!response || response.error) {
      setProviders([]);
      setLoading(false);
      return;
    }

    setProviders(response);
    setLoading(false);
  };

  useEffect(() => {
    getProviders();
    // eslint-disable-next-line
  }, []);

  return providers;
};

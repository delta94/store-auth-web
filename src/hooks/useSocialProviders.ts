import { useState, useEffect, useContext } from 'react';
import { getSocialProvidersRequest, getChallenge } from 'api';
import { SocialProvider } from 'types';
import { AppContext } from 'App';

export default () => {
  const { setLoading } = useContext(AppContext);
  const [providers, setProviders] = useState<SocialProvider[]>([]);
  const loginChallenge = getChallenge();

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
    if (loginChallenge) getProviders();
    // eslint-disable-next-line
  }, []);

  return providers;
};

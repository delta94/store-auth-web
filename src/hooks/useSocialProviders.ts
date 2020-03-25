import { useState, useEffect, useContext } from 'react';
import { getSocialProvidersRequest } from 'api';
import { SocialProvider } from 'types';
import { AppContext } from 'App';
import { getUrlParameter } from 'helpers';
import { CHALLENGE_KEY } from 'api/const';

export default () => {
  const { setLoading } = useContext(AppContext);
  const [providers, setProviders] = useState<SocialProvider[]>([]);
  const loginChallenge = getUrlParameter(CHALLENGE_KEY);

  const getProviders = async () => {
    setLoading(true);

    if (!loginChallenge) {
      setProviders([]);
      setLoading(false);
      return;
    }

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

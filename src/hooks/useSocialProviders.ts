import { useState, useEffect } from 'react';
import { getSocialProvidersRequest } from 'api';

const defaultSocial = {
  providers: [],
  loading: false,
};

export default () => {
  const [social, setSocial] = useState(defaultSocial);

  const getProviders = async () => {
    setSocial({
      ...social,
      loading: true,
    });

    const response = await getSocialProvidersRequest();

    if (!response || response.error) {
      setSocial({
        providers: [],
        loading: false,
      });
      return;
    }

    setSocial({
      providers: response,
      loading: false,
    });
  };

  useEffect(() => {
    getProviders();
    // eslint-disable-next-line
  }, []);

  return social;
};

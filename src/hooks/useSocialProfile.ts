import { useState, useEffect } from 'react';
import { getSocialProfileRequest } from 'api';

export default (name: string, token: string) => {
  const [state, setState] = useState<any>({
    loading: true,
    error: '',
    profile: {},
  });

  const getProfile = async () => {
    const response = await getSocialProfileRequest(name, token);

    if (response.error) {
      setState({
        ...state,
        loading: false,
        error: response.error,
      });

      return;
    }

    setState({
      profile: response,
      loading: false,
      error: '',
    });
  };

  useEffect(() => {
    getProfile();
    // eslint-disable-next-line
  }, []);

  return state;
};

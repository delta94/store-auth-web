import React, { useEffect } from 'react';
import { windowAlias } from 'helpers';
import { Loader } from 'components';
import { AUTH_CALLBACK } from 'const';

const AuthCallback = () => {
  useEffect(() => {
    windowAlias.ipc?.send(AUTH_CALLBACK);
  }, []);

  return <Loader color="white" size={14} />;
};

export default AuthCallback;

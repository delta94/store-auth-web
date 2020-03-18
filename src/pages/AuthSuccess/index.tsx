import React, { useEffect } from 'react';
import { windowAlias } from 'helpers';
import { Loader } from 'components';

const AuthSuccess = () => {
  useEffect(() => {
    windowAlias.ipc?.send('AUTH_LOGIN');
  }, []);

  return <Loader color="white" size={14} />;
};

export default AuthSuccess;

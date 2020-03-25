import { useState, useEffect } from 'react';
import { getPreviosUserRequest } from 'api';
import { User } from 'types';

const emptyUser = {
  avatar: '',
  email: '',
  username: '',
};

export default () => {
  const [loading, setLoading] = useState(true);
  const [previosUser, setPreviosUser] = useState<User>(emptyUser);
  
  const getUser = async () => {
    setLoading(true);

    const response = await getPreviosUserRequest();

    if (!response || response.error) {
      setLoading(false);
      return;
    }

    setPreviosUser(response);
    setLoading(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  return { loading, previosUser };
};

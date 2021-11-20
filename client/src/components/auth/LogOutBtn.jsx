import axios from 'axios';

import { useAppContext } from '../../context/AppContext';

export const LogOutBtn = () => {
  const { getLoggedIn } = useAppContext();
  
  const logOut = () =>
    axios
      .get('http://localhost:5000/auth/logout')
      .finally(() => getLoggedIn());

  return <button onClick={logOut}>Log out</button>;
};

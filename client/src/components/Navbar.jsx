import { Layout } from 'antd';

import Logo from '../../src/logo.svg';
import { useAppContext } from '../context/AppContext';
import { LogOutBtn } from './auth/LogOutBtn';

const { Header } = Layout;

export const Navbar = ({ room }) => {
  const { user } = useAppContext();
  const style = {
    position: 'fixed',
    zIndex: 1,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#6cf'
  };

  return (
    <Header style={style}>
      <img src={Logo} alt="App Logo" />
      <p>Room: {room}</p>
      {user && <LogOutBtn />}
    </Header>
  );
};
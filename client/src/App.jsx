import { useEffect } from 'react';
import { Layout } from 'antd';
import axios from 'axios';

import { Chat } from './components/Chat';
import { Navbar } from './components/Navbar';
import { FooterComponent } from './components/Footer';
import { Register } from './components/auth/Register';
import { Login } from './components/auth/Login';
import { useAppContext } from './context/AppContext';

// alow use of cookies on browser
axios.defaults.withCredentials = 'true';

const  App = () => {
  const { isLogInForm, room, user, getLoggedIn, setRoom } = useAppContext();

  useEffect(() => getLoggedIn(), []);
  
  return (
    <Layout style={{ alignItems: 'center', justifyContent: 'center' }}>
      {user ? (
        user.room ? (
          <Chat />
        ) : (
          <div style={{
          margin: 0,
          padding: 0,
          height: '100vh',
          display: 'grid',
          placeItems: 'center'}}
        >
          <div>
            <button onClick={() => setRoom(1)}>room 1</button>
            <button onClick={() => setRoom(2)}>room 2</button>
            <button onClick={() => setRoom(3)}>room 3</button>
          </div>
        </div>
        )
      ) : isLogInForm ? (
        <Login />
      ) : (
        <Register />
      )}
    </Layout>
  );
};

export default App;

import { Layout } from 'antd';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

import { useAppContext } from '../context/AppContext';

const { Header, Footer, Sider, Content } = Layout;

const ENDPOINT = 'http://localhost:5000';

export const Chat = () => {
  const { user } = useAppContext();
  const [socket, setSocket] = useState(undefined);
  const [messagesToShow, setMessagesToShow] = useState([]);
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
    setSocket(io(ENDPOINT));
  }, []);

  useEffect(() => {
    socket?.on('message', (obj) => {
      setMessagesToShow(pr => [...pr, obj]);
    });
  }, [socket])

  const sendMessage = e => {
    e.preventDefault();
    socket.emit('message', { sender: user, message: inputValue});
    setInputValue('');
  };

  const handleChange = e => setInputValue(e.target.value);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)'
      }}
    >
      <form onSubmit={sendMessage} style={{  marginTop: '20%' }}>
        <input value={inputValue} onChange={handleChange} />
        <button type="submit">Send message</button>
      </form>
      <div style={{ marginTop: '100px' }}>
        {messagesToShow.map(({sender, message}, i) =>
          <>
            <h4 key={`sender_date_${i}`}>
            {`--${sender}--${new Date().toString().slice(4, 21)}`}
            </h4>
            <h3 key={`message_${i}`}>
            {`${message}`}
            </h3>
          </>
          )}
      </div>
    </div>
  );
};
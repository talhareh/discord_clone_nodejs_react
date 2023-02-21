// client/src/pages/chat/messages.js

import styles from './styles.module.css';
import { useState, useEffect } from 'react';

const Messages = ({ socket }) => {
  console.log(socket.id)
  const [messagesRecieved, setMessagesReceived] = useState([]);
  //console.log('message component called', username, room)
  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('recieve_message', (data) => {
      console.log("useEffect : ", data.message);
      //dataprint(data)
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

	// Remove event listener on component unmount
    return () => socket.off('recieve_message');
  }, [socket]);

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    // console.log(timestamp)
    const date =  Date.now();
    console.log(date)
    return date.toLocaleString('en-US');
  }

  // const dataprint = (data) =>{
  //   console.log('func called : ',data)
  // }


  return (
    <div className={styles.messagesColumn}>
      {messagesRecieved.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className={styles.msgMeta}>{msg.username}  </span>
            <span className={styles.msgMeta}>
              {msg.__createdtime__}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;
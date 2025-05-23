import axios from 'axios';
import React, { use, useEffect, useState } from 'react';
import '../css/MessagesPage.css';
import ListMessages from '../components/ListMessages.jsx';
import MessageFilter from '../components/MessageFilter.jsx';

function MessagesPage({ users, userCur }) {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/messages/getAll');
      if (res.data?.messages) {
        let allMessages = res.data.messages;

        if (!userCur.isAdmin) {
          allMessages = allMessages.filter(msg => msg.forumId !== 'admin');
        }

        setMessages(allMessages);
        setFilteredMessages(allMessages); // reset filter each time we fetch
      }
    } catch (err) {
      console.error('Erreur lors du chargement des messages:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleDelete = async (message) => {
    try {
      await axios.delete('http://localhost:8000/api/messages/delete', {
        data: { msgId: message.msgId }
      });
      fetchMessages(); // re-fetch to refresh list
    } catch (err) {
      console.error('Erreur de suppression:', err);
    }
  };

  return (
    <div className="messages-page">
      <h2>Results ({filteredMessages.length})</h2>
      <div className="underline-black"></div>

      <div className="messages-list">
        <ListMessages
          users={users}
          messages={filteredMessages}
          userCur={userCur}
          onDelete={handleDelete}
          showReply={false}
        />
      </div>

      <div className="underline-black"></div>

      <MessageFilter
        userCur={userCur}
        messages={messages}
        onFilter={setFilteredMessages}
      />
    </div>
  );
}

export default MessagesPage;

import '../css/ForumPage.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListMessages from '../components/ListMessages.jsx';
import MessageForm from '../components/MessageForm.jsx';

function ForumPage({ users, userCur }) {
  const [selectedForum, setSelectedForum] = useState('public');
  const [messages, setMessages] = useState([]);
  const [replyTo, setReplyTo] = useState(null);

  const fetchMessages = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/messages/getAll');
      if (res.data?.messages) {
        setMessages(res.data.messages);
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
        data: { id: message.messageId }
      });
      setMessages(prev => prev.filter(m => m.messageId !== message.messageId));
    } catch (err) {
      console.error('Erreur de suppression:', err);
    }
  };

  const handleAddMessage = (newMessage) => {
    setMessages(prev => [...prev, newMessage]);
  };

  const filteredMessages = messages.filter(msg => msg.forumId === selectedForum);

  return (
    <div className='forum-page'>
      <div className='forum-head'>
        <h2 className="forum-title">Forum - {selectedForum.toUpperCase()}</h2>
        {userCur.isAdmin && (
          <div className="forum-selector">
            <select value={selectedForum} onChange={(e) => setSelectedForum(e.target.value)}>
              <option value="public">Public</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
      </div>

      <div className="underline-black"></div>

      <div className="message-list">
        <ListMessages
          users={users}
          messages={filteredMessages}
          userCur={userCur}
          onReply={setReplyTo}
          onDelete={handleDelete}
        />
      </div>

      <div className="underline-black"></div>

      <div className='message-form'>
        <MessageForm
          forumId={selectedForum}
          userCur={userCur}
          onAddMessage={handleAddMessage}
          onForceRefresh={fetchMessages}
          replyTo={replyTo}
          clearReply={() => setReplyTo(null)}
        />
      </div>
    </div>
  );
}

export default ForumPage;

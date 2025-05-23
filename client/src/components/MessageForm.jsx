import axios from 'axios';
import React, { useState } from 'react';
import '../css/MessageForm.css';

function MessageForm({ forumId, userCur, onAddMessage, onForceRefresh, replyTo, clearReply }) {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/messages/create', {
        username: userCur.username,
        content: content,
        forumId: forumId,
        parentMessageId: replyTo ? replyTo.msgId : null
      });
  
      if (response.data?.message) {
        onAddMessage(response.data.message); 
        setContent('');
        clearReply();
  
        setTimeout(() => {
          onForceRefresh();
        }, 1000);
      }
    } catch (err) {
      console.error('Erreur lors de l\'envoi du message :', err);
    }
  };
  

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      {replyTo && (
        <div className="reply-preview">
          Répondre à <strong>{replyTo.username}</strong>: "{replyTo.content.slice(0, 40)}..."
          <button type="button" onClick={clearReply}>✖</button>
        </div>
      )}

      <textarea
        placeholder="Write your Message here..."
        minLength="1"
        size="255"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />

      <button type="submit" className="send-button" title="Envoyer"> ➤ </button>
    </form>
  );
}

export default MessageForm;


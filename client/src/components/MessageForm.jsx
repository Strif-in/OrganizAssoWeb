import '../css/MessageForm.css'
import React, { useState } from 'react';

function MessageForm({ forumId, userCur, onAddMessage, replyTo, clearReply }) {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      messageId: 'm' + Date.now(),
      userId: userCur.userId,
      contenu: content,
      date: new Date().toISOString(),
      replyMesId: replyTo ? replyTo.messageId : null,
      forumId
    };

    onAddMessage(newMessage);
    setContent('');
		clearReply();
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>

      {replyTo && (
        <div className="reply-preview">
          Répondre à <strong>{replyTo.userId}</strong>: "{replyTo.contenu.slice(0, 40)}..."
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

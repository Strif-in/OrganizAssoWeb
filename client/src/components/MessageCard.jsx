import React from 'react';
import '../css/MessageCard.css';

function MessageCard({ users, message, userCur, onReply, onDelete, getMessageById, showReply = true }) {
  const isAdmin = userCur.isAdmin;
  const isAuthor = message.username === userCur?.username;
  const author = users.find(user => user.username === message.username);
  const repliedMessage = message.parentMessageId ? getMessageById(message.parentMessageId) : null;

  return (
    <div className="message-card">
      {repliedMessage && (
        <div className="quoted-message">
          <strong>{repliedMessage.username}:</strong>
          <p>"{repliedMessage.content.slice(0, 40)}..."</p>
        </div>
      )}

      <div className="message-content">
        <p>{message.content}</p>
      </div>

      <div className="message-buttons">
        {showReply && (
          <button
            className="icon-button reply"
            title="Répondre"
            onClick={onReply}
          >
            ↩
          </button>
        )}

        {(isAdmin || isAuthor) && (
          <button
            className="icon-button delete"
            title="Supprimer"
            onClick={() => onDelete(message)}
          >
            ✖
          </button>
        )}
      </div>

      <div className="message-footer">
        <span className="author">{author?.username || 'Unknown'}</span>
        <span className="date">{new Date(message.createdAt).toLocaleString()}</span>
      </div>
    </div>
  );
}

export default MessageCard;

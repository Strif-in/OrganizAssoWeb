import React from 'react';
import '../css/MessageCard.css'

function MessageCard({ message, userCur, onReply, onDelete }) {
    const isAdmin = userCur?.userStatus === 'admin';
    const isAuthor = message.userId === userCur?.userId;

    return (
        <div className="message-card">
            <div className="message-content">
                <p>{message.contenu}</p>
            </div>

            <div className="message-buttons">
                <button
                className="icon-button reply"
                title="Répondre"
                onClick={() => onReply(message)}
                >
                ↩
                </button>

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
                <span className="author">{message.user?.username || 'Unknown'}</span>
                <span className="date">{new Date(message.date).toLocaleString()}</span>
            </div>
        </div>
    );
}

export default MessageCard;
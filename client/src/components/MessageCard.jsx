import '../css/MessageCard.css'
import React from 'react';


function MessageCard({ users, message, userCur, onReply, onDelete , getMessageById, showReply=true}) {
    const isAdmin = userCur?.userStatus === 'admin';
    const isAuthor = message.userId === userCur?.userId;
    const author = users.find(
        user => user.userId === message.userId
    )

    const repliedMessage = message.replyMesId ? getMessageById(message.replyMesId) : null;

    return (
        <>
            <div className="message-card">
                
                {repliedMessage && (
                    <div className="quoted-message">
                    <strong>{repliedMessage.userId}:</strong>
                    <p>"{repliedMessage.contenu.slice(0, 50)}..."</p>
                    </div>
                )}
                
                <div className="message-content">
                    <p>{message.contenu}</p>
                </div>

                <div className="message-buttons">
                    {showReply && (<button
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
                    <span className="date">{new Date(message.date).toLocaleString()}</span>
                </div>
                
            </div>
        </>
    );
}

export default MessageCard;
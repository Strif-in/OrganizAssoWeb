import React from 'react';
import '../css/ProfileCard.css'

function ProfileCard({ user, userCur, onPromote, onDelete }) {
    const isAdmin = userCur?.userStatus === 'admin';

    return (
        <div className="profile-card">
            <div className="profile-info">
                <div className="profile-avatar">
                    <span>{user.username?.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                    <h3>{user.prénom} {user.nom}</h3>
                <p>Status: <strong>{user.userStatus}</strong></p>
                <p>ID: {user.userId}</p>
                </div>
            </div>

            {isAdmin && (
                <div className="profile-actions">
                <button onClick={() => onPromote(user)} title="Promote/Demote">
                    🔼
                </button>
                <button onClick={() => onDelete(user)} title="Supprimer">
                    ✖
                </button>
                </div>
            )}
        </div>
    );
}

export default ProfileCard;
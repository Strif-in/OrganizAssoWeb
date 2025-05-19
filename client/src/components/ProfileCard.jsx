import '../css/ProfileCard.css'
import React from 'react';

function ProfileCard({ user, userCur, onPromote, onDelete , onSelect}) {
    const isAdmin = userCur?.userStatus === 'admin';

    return (
        <>
            <div className="profile-card" onClick={onSelect}>
                <div className="profile-info">

                    <div className="profile-avatar">
                        <span>{user.username?.charAt(0).toUpperCase()}</span>
                    </div>

                    <div>
                        <h3>{user.prenom} {user.nom}</h3>
                        <p>Status: <strong>{user.userStatus}</strong></p>
                        <p>ID: {user.userId}</p>
                    </div>
                </div>

                {isAdmin && (
                    <div className="profile-actions">

                    <button onClick={(e) => { e.stopPropagation(); onPromote(user); }} title="Promote/Demote">
                        🔼
                    </button>
                    
                    <button onClick={(e) => { e.stopPropagation(); onDelete(user)}} title="Supprimer">
                        ✖
                    </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default ProfileCard;
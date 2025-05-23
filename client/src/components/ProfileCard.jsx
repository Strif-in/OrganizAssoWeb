import React from 'react';
import '../css/ProfileCard.css';

function ProfileCard({ user, userCur, onPromote, onDemote, onDelete, onValidate, onSelect }) {
  const isAdmin = userCur.isAdmin;

  const getStatusLabel = () => {
    if (!user.isMember) return 'pending';
    if (user.isAdmin) return 'admin';
    return 'member';
  };

  return (
    <div className="profile-card" onClick={onSelect} title={"select " + user.nom + " " + user.prenom}>
      <div className="profile-info">
        <div className="profile-avatar">
          <span>{user.nom?.charAt(0).toUpperCase()}{user.prenom?.charAt(0).toUpperCase()}</span>
        </div>
        <div>
          <h3>{user.prenom} {user.nom}</h3>
          <p>Status: <strong>{getStatusLabel()}</strong></p>
          <p>ID: {user.username}</p>
        </div>
      </div>

      {isAdmin && (
        <div className="profile-actions">
          {!user.isMember ? (
            <button onClick={(e) => {e.stopPropagation();onValidate(user);}}title="Valider">
                ✅
            </button>
            ) : user.isAdmin ? (
            <button onClick={(e) => {e.stopPropagation(); onDemote(user);}}title="Rétrograder en membre">
                🔽
            </button>
            ) : (
            <button onClick={(e) => {e.stopPropagation(); onPromote(user);}}title="Promouvoir en admin">
                🔼
            </button>
            )
        }
          <button onClick={(e) => {e.stopPropagation();onDelete(user);}}title="Supprimer">
            ✖
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileCard;


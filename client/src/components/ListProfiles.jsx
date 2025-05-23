import ProfileCard from './ProfileCard.jsx';

function ListProfiles({ users, userCur, onPromote, onDelete,onDemote, onSelect, onValidate}) {
  return (
    <div className="profile-list">
      {users.map(user => (
        <ProfileCard
          key={user.username}
          user={user}
          userCur={userCur}
          onPromote={onPromote}
          onDemote={onDemote}
          onDelete={onDelete}
          onValidate={onValidate}
          onSelect={()=>onSelect(user)}
        />))  
      }
    </div>
  );
}

export default ListProfiles;
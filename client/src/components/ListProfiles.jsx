import ProfileCard from './ProfileCard.jsx';

function ListProfiles({ users, userCur , onPromote, onDelete, onSelectProfile}) {

  return (
    <>
      <div className='profile-list'>
        {users.map(user => (
          <ProfileCard
              key={user.userId}
              user={user}
              userCur={userCur}
              onPromote={onPromote}
              onDelete={onDelete}
              onSelect={() => onSelectProfile(user)}
          />
        ))}
      </div>
    </>
  );
}

export default ListProfiles;

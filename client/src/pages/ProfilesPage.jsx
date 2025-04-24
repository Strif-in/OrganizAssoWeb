import React from 'react';
import ListProfiles from '../components/ListProfiles.jsx';
 
const ProfilesPage = ({users, userCur, onDelete}) => {
  const handlePromotion = (user) => {} //Request to change data base
  const my_users = users.filter(user => user.userId !== userCur.userId) //Replace by request database users list

  return (
    <>
      <div className='profiles-page'>
        <h2>Results({users.length})</h2>
        <div className="profile-list">
          {users.length === 0 ? (
            <p>Aucun utilisateur trouvé.</p>
          ) : (
            <ListProfiles users={my_users} userCur={userCur} onPromote={handlePromotion} onDelete={onDelete}/>
          )}
        </div>
      </div>
    </>
  );
 };
 
 export default ProfilesPage;
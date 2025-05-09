import React,{useState} from 'react';
import ListProfiles from '../components/ListProfiles.jsx';
import ProfilePage from './ProfilePage.jsx';
import ProfileFilter from '../components/ProfileFilter.jsx';
 
const ProfilesPage = ({users, messages, userCur, onDelete}) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const handlePromotion = (user) => {} //Request to change data base
  var profiles = users.filter(user => user.userId !== userCur.userId)
  const [my_users, setUsers] = useState(profiles) //Replace by request database users list

  if (selectedUser) {
    return (
      <ProfilePage 
        user={selectedUser} 
        userCur={userCur} 
        messages={messages}   // Pass messages if needed
        onDelete={null}
      />
    );
  }

  return (
    <>
      <div className='profiles-page'>
        <h2>Results({users.length})</h2>
        <div className="profile-list">
          {users.length === 0 ? (
            <p>Aucun utilisateur trouvé.</p>
          ) : (
            <ListProfiles users={my_users} userCur={userCur} onSelectProfile={setSelectedUser} onPromote={handlePromotion} onDelete={onDelete}/>
          )}
        </div>
        <ProfileFilter users={profiles} onFilter={setUsers}/>
      </div>
    </>
  );
 };
 
 export default ProfilesPage;
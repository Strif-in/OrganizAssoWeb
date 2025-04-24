import React from 'react';
import ListMessages from '../components/ListMessages.jsx';
 
function MessagesPage ({users, messages, userCur, onDelete}) {
    
  return (
    <>
      <div className='messages-page'>

        <h2>Results({messages.length})</h2>

        <div className="messages-list">
          <ListMessages users={users} messages={messages} userCur={userCur} onDelete={onDelete} showReply={false}/>
        </div>
        
      </div>
    </>
  );
}

export default MessagesPage;
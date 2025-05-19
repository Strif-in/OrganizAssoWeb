import React, { useState }from 'react';
import ListMessages from '../components/ListMessages.jsx';
import MessageFilter from '../components/MessageFilter.jsx';
import "../css/MessagesPage.css"
 
function MessagesPage ({users, messages, userCur, onDelete}) {
  var allowed_messages = messages
  if(userCur.userStatus !== "admin"){
    allowed_messages = messages.filter(msg => msg.forumId !== "admin");
  }
  const [filteredMessages, setFilteredMessages] = useState(allowed_messages);
    
  return (
    <>
      <div className='messages-page'>

        <h2>Results({filteredMessages.length})</h2>
        <div className="underline-black"></div>
        <div className="messages-list">
          <ListMessages users={users} messages={filteredMessages} userCur={userCur} onDelete={onDelete} showReply={false}/>
        </div>
        <div className="underline-black"></div>
        <MessageFilter messages={allowed_messages} onFilter={setFilteredMessages} />
        
      </div>
    </>
  );
}

export default MessagesPage;
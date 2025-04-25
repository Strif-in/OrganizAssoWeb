import '../css/ForumPage.css'
import React, { useState } from 'react';
import ListMessages from '../components/ListMessages.jsx';
import MessageForm from '../components/MessageForm.jsx';

function ForumPage({users, messages, userCur , onDelete, setMessages}) {
  const [selectedForum, setSelectedForum] = useState('public');
  const filteredMessages = messages.filter(msg => msg.forumId === selectedForum);
  const [replyTo, setReplyTo] = useState(null);
  
  const handleAddMessage = (newMessage) => {
    setMessages(prev => [...prev, newMessage]);
  };

  return (
    <>
      <div className='forum-page'>
        <div className='forum-head'>
          <h2 className="forum-title">Forum - {selectedForum.toUpperCase()}</h2>

          <div className="forum-selector">
            <select value={selectedForum} onChange={(e) => setSelectedForum(e.target.value)}>
              <option value="public">Public</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </div> 
        <div className="underline-black"></div>
        <div className="message-list">
          <ListMessages users={users} messages={filteredMessages} userCur={userCur} onDelete={onDelete} onReply={setReplyTo}/>
        </div>
        <div className="underline-black"></div>
        <div className='message-form'>
          <MessageForm
          forumId={selectedForum}
          userCur={userCur}
          onAddMessage={handleAddMessage}
          replyTo={replyTo}
          clearReply={() => setReplyTo(null)}
          />
        </div>
        
      </div>
    </>
  );
}
  
export default ForumPage;
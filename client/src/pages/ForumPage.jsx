import '../css/ForumPage.css'
import React, { useState, useEffect } from 'react';
import ListMessages from '../components/ListMessages.jsx';
import MessageForm from '../components/MessageForm.jsx';

function ForumPage({ messages, userCur , onDelete}) {
    
    return (
      <>
        <div className='forum-page'>
          <p>Forum Selector</p>
          <div className="message-list">
              <ListMessages messages={messages} userCur={userCur} onDelete={onDelete}/>
          </div>
          <div className='message-form'>
              <MessageForm/>  
          </div>
        </div>
      </>
    );
  }
  
  export default ForumPage;
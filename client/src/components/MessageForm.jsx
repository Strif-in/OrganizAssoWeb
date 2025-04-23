import React from 'react';

const MessageForm = () => {
    return (
        <>
            <form className="message-form">
                <textarea id="story" name="story" rows="5" cols="33" placeholder='Write your Message'/>
                <button type="submit" className="send-button" title="Envoyer"> ➤ </button>
            </form>
        </>
  );
};

export default MessageForm;
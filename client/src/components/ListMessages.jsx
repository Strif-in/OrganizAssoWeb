import MessageCard from './MessageCard';


function ListMessages({ messages, userCur , onDelete, onReply}) {

  return (
    <>
      <div className="message-list">
        {messages.map(msg => (
          <MessageCard
            key={msg.messageId}
            message={msg}
            userCur={userCur}
            onReply={onReply}
            onDelete={onDelete}
          />
        ))}
      </div>
    </>
  );
}

export default ListMessages;

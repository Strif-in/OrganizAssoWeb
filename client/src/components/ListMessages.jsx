import MessageCard from './MessageCard';


function ListMessages({users, messages, userCur , onDelete, onReply, showReply}) {
  const getMessageById = (id) => messages.find(msg => msg.messageId === id);

  return (
    <>
      <div className="message-list">
        {messages.map(msg => (
          <MessageCard
            key={msg.messageId}
            users={users}
            message={msg}
            userCur={userCur}
            onDelete={onDelete}
            onReply={() => onReply(msg)}
            showReply={showReply}
            getMessageById={getMessageById}
          />
        ))}
      </div>
    </>
  );
}

export default ListMessages;

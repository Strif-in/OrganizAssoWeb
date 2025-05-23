import MessageCard from './MessageCard';

function ListMessages({ users, messages, userCur, onReply, onDelete, showReply = true }) {
  const getMessageById = (msgId) => messages.find(msg => msg.msgId === msgId);

  return (
    <div className="message-list">
      {messages.map(msg => (
        <MessageCard
          key={msg.msgId}
          users={users}
          message={msg}
          userCur={userCur}
          onDelete={() => onDelete(msg)}
          onReply={() => onReply(msg)}
          showReply={showReply}
          getMessageById={getMessageById}
        />
      ))}
    </div>
  );
}

export default ListMessages;


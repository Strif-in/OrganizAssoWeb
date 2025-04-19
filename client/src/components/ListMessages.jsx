import MessageCard from './MessageCard';


function ListMessages({ messages, userCur , onDelete}) {
  const handleReply = (msg) => {
    console.log("Reply to message:", msg.messageId);
    // Add logic to set reply target in form
  };

  return (
    <div>
      {messages.map(msg => (
        <MessageCard
          key={msg.messageId}
          message={msg}
          userCur={userCur}
          onReply={handleReply}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ListMessages;

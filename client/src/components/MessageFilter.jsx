import React, { useState } from 'react';
import '../css/MessageFilter.css';

function MessageFilter({ messages, onFilter }) {
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [keyword, setKeyword] = useState('');

  const handleFilter = () => {
    const filtered = messages.filter(msg => {
      const matchAuthor = author ? msg.user?.userId.toLowerCase().includes(author.toLowerCase()) : true;
      const matchDate = date ? msg.date.startsWith(date) : true;  // date in format 'YYYY-MM-DD'
      const matchKeyword = keyword ? msg.contenu.toLowerCase().includes(keyword.toLowerCase()) : true;

      return matchAuthor && matchDate && matchKeyword;
    });

    onFilter(filtered);
  };

  return (
    <div className="message-filter">
      <input
        type="text"
        placeholder="Auteur (username)"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <input
        type="text"
        placeholder="Mot-clé dans le message"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleFilter}>Filtrer</button>
    </div>
  );
}

export default MessageFilter;
import React, { useEffect, useState } from 'react';
import '../css/MessageFilter.css';

function MessageFilter({userCur, messages, onFilter }) {
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [keyword, setKeyword] = useState('');
  const [selectedForum, setSelectedForum] = useState('public');

  const handleFilter = () => {
    const filtered = messages.filter(msg => {
      const matchAuthor = author
        ? msg.username?.toLowerCase().includes(author.toLowerCase())
        : true;
  
      const matchDate = date
        ? msg.createdAt?.startsWith(date)
        : true;
  
      const matchKeyword = keyword
        ? msg.content?.toLowerCase().includes(keyword.toLowerCase())
        : true;
  
      const matchForum = selectedForum
        ? msg.forumId === selectedForum
        : true;
  
      return matchAuthor && matchDate && matchKeyword && matchForum;
    });
  
    onFilter(filtered);
  };  
  
  useEffect(() => {
    handleFilter();
  }, [author, date, keyword, selectedForum]);  

  return (
    <div className="message-filter">
      <input
        type="text"
        size="14"
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
        size="14"
        placeholder="Mot-clé dans le message"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {userCur.isAdmin && (
          <div className="forum-selector">
            <select value={selectedForum} onChange={(e) => {setSelectedForum(e.target.value)}}>
              <option value="public">Public</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
      <button onClick={handleFilter}>Filtrer</button>
    </div>
  );
}

export default MessageFilter;
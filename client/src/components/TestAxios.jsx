import React, { useState } from 'react';
import axios from 'axios';

function TestAxios() {
  const [champ, setChamp] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoi d’une requete POST vers le backend
      const res = await axios.post('http://localhost:8000/messages', {
        texte: champ,
      });
      console.log('Requete POST reussie :', res.data);
    } catch (error) {
      console.error('Erreur requete POST :', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="champ">Valeur :</label>
      <input
        id="champ"
        value={champ}
        onChange={(e) => setChamp(e.target.value)}
        placeholder="Tapez quelque chose..."
      />
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default TestAxios;
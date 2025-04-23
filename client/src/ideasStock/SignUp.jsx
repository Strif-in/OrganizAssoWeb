import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function SignUp (props) {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passOK, setPassOK] = useState(true);

  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");
 
  const getLogin = (evt) => {setLogin(evt.target.value)};
  const getFirstName = (evt) => {setFirstName(evt.target.value)};
  const getLastName = (evt) => {setLastName(evt.target.value)};
  const getPass1 = (evt) => {setPass1(evt.target.value)};
  const getPass2 = (evt) => {setPass2(evt.target.value)};
 
  const submissionHandler = (evt) => {
    evt.preventDefault();
    if (pass1 != pass2){
       setPassOK(false)
    }
    else {
    setPassOK(true);
    //console.log('User Info:', { firstName, lastName, login, password: pass1 }); ??
    navigate('/waiting');
    }
  }
return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <div>
          <label htmlFor="name">Prénom:</label>
          <input type="text" id="name" name="name" required title="Veuillez entrer votre prénom." onChange={getFirstName} />
        </div>
        <div>
          <label htmlFor="lastname">Nom:</label>
          <input type="text" id="lastname" name="lastname" required title="Veuillez entrer votre nom." onChange={getLastName} />
        </div>
        
        <div>
          <label htmlFor="username">Login:</label>
          <input type="text" id="username" name="username" required title="Veuillez entrer un nom d'utilisateur." onChange={getLogin} />
        </div>
        <div>
          <label htmlFor="password">Mot de passe:</label>
          <input type="password" id="password" name="password" required title="Veuillez entrer un mot de passe." onChange={getPass1} />
        </div>
        <div>
          <label htmlFor="password2">Confirmer mot de passe:</label>
          <input type="password" id="password2" name="password2" required title="Veuillez confirmer votre mot de passe." onChange={getPass2} />
        </div>
        <button onClick={submissionHandler}>Créer mon compte</button>
        {passOK ? <p></p>:<p style={{color:"red"}}>Erreur: mots de passe différents</p>}
      </form>
      <button onClick={() => navigate('/')}>Retour</button>
    </div>
  );
};

export default SignUp;
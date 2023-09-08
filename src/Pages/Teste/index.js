import React, { useState, useEffect } from 'react';
// import * as firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import { auth } from '../../Configs/FirebaseConfig'

// const firebaseConfig = {
//   // Coloque aqui as suas configurações do Firebase
//   apiKey: "AIzaSyA1wHIV3_Uv772r_mzNNHrJEBevOLR7XkA",
//   authDomain: "rlgouvea-a860e.firebaseapp.com",
//   projectId: "rlgouvea-a860e",
//   storageBucket: "rlgouvea-a860e.appspot.com",
//   messagingSenderId: "1057327392884",
//   appId: "1:1057327392884:web:c76f326e6eac30a68dc921"
// };

// firebase.initializeApp(firebaseConfig);

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const firebase = auth()
  console.log(firebase)

  useEffect(() => {
    // const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        firebase
          .database()
          .ref('users')
          .once('value', (snapshot) => {
            setUsers(snapshot.val());
          });
      } else {
        setCurrentUser(null);
        setUsers([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const deleteUser = (userId) => {
    firebase
      .database()
      .ref(`users/${userId}`)
      .remove();
  };

  return (
    <div>
      <h1>Lista de usuários</h1>
      {users.map((user) => (
        <div key={user.id}>
          <p>{user.email}</p>
          {currentUser && currentUser.uid !== user.id && (
            <button onClick={() => deleteUser(user.id)}>Deletar usuário</button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Users;

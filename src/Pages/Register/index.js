import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { auth } from '../../Configs/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { addUser } from "../../Services/routes";

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const radomUser = async (email, uid) => {
    
    try {
        const response = await addUser(email, uid)
        console.log('User cadastrado: ' + response)
      } catch (error) {
        console.log('erro cadastrar user: ' + error)
      }
    
  }

  async function handleRegister(e){
    e.preventDefault()

    if(email !== '' && password !==''){
      await createUserWithEmailAndPassword(auth, email, password)
      .then((value) => {

        console.log('Cadastrado com sucesso!')
        console.log(value.user.uid)

        
        console.log('register form: ' + email, value.user.uid)

        radomUser(email, value.user.uid)

        // navigate('/admin', { replace: true })
      })
      .catch((error) => {
        console.log('Erro ao cadastrar: ' + error)
  
        if(error.code === 'auth/weak-password'){
          alert('Senha precisa ter pelo menos 6 caracteres!')
        } else if(error.code === 'auth/email-already-in-use'){
          alert('Email já existe!')
        } else if(error.code === 'auth/invalid-email'){
          alert('Email inválido!')
        }
      })
    }else{
      alert('Preencha todos os campos!')
    }
  }



  return(
    <div className="home-container">
      <div className="box-form">

        <h1>Imobiliária RLGouvea</h1>

        <span>CADASTRE-SE</span>

        <form className="form" onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="******"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Registrar</button>
        </form>

        <Link className="button-link" to="/">
          Já possui uma conta? Acesse aqui!
        </Link>
      </div>
    </div>
  )
}
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { auth } from '../../Configs/FirebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import { addUser } from "../../Services/routes";

import '../Register/register.scss'

export default function Register(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const randomUser = async (email, uid) => {
    
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

        randomUser(email, value.user.uid)

        navigate('/admin', { replace: true })
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
    <div className="register-container">
        <h1>Cadastro de novo usuário</h1>
      {/* <div className="box-form"> */}


        {/* <span>CADASTRE-SE</span> */}

        <form className="form" onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Digite um email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input 
            type="password" 
            placeholder="Digite uma senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Cadastrar</button>
        </form>

        {/* <Link className="button-link" to="/">
          Já possui uma conta? Acesse aqui!
        </Link> */}
      {/* </div> */}
    </div>
  )
}
import { db } from "../Configs/FirebaseConfig"

/******Função que faz o Get dos proprietários******/
export const fetchProprietarios = async () => {       
    const data = db.collection('proprietarios')
    const response = await data.get()
    return response              
}

/******Função que adiciona proprietário******/
export const addProp = async (form) => {
    
  const response = await db.collection("proprietarios").doc().set(
    {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      cpf: form.cpf.value,        
    }
  )  
  .then(() => {    
    return(
      { status: 200 }
    )
  })
  .catch((err) => {    
    return(
      { status: 200 }
    )
  })   
  
  return response
} 

/******Função que faz o delete dos proprietários******/
export const deleteProp = async (id) => {
  const response = await db.collection("proprietarios").doc(id).delete()
  .then(() => {    
    return(
      {status: 200}
    )
  })
  .catch((err) => {    
    return(
      {status: 400}
    )
  })
  return response
}
import { db } from "../Configs/FirebaseConfig"

/******Função que faz o Get dos proprietários******/
export const fetchProprietarios = async () => {       
    const data = db.collection('proprietarios')
    const response = await data.get()
    return response              
}

/******Função que faz o Get dos inquilinos******/
export const fetchInquilinos = async () => {       
  const response = db.collection('inquilinos')
  const data = await response.get()
  return data              
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

/******Função que adiciona inquilino******/
export const addRenter = async (form) => {
    
  const response = await db.collection("inquilinos").doc().set(

    {
      name: form.name.value,
      phone: form.phone.value,
      email: form.email.value,
      cpf: form.cpf.value,        
    }

  )  
  
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

/******Função que edição dos proprietarios******/
export const changeOwner = async (item) => {                      
  const response = await db.collection(`proprietarios`).doc(item.id).update(      
    {
      name: item.name,
      phone: item.phone,
      email: item.email,
      cpf: item.cpf
    }
  )
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


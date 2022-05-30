import { db } from "../Configs/FirebaseConfig"

/******Função que faz o Get dos proprietários******/
export const fetchProprietarios = async () => {       
    const response = db.collection('proprietarios')
    const data = await response.get()
    return data              
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
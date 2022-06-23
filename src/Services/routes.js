import { db } from "../Configs/FirebaseConfig"

/******Função que faz o Get dos proprietários******/
export const fetchProprietarios = async () => {       
    const data = db.collection('proprietarios')
    const response = await data.get()
    return response              
}

/******Função que faz o Get dos inquilinos******/
export const fetchInquilinos = async () => {       
  const data = db.collection('inquilinos')
  const response = await data.get()
  return response              
}

/******Função que faz o Get dos imóveis******/
export const fetchProperties = async () => {       
  const data = db.collection('imoveis')
  const response = await data.get()
  return response              
}

/******Função que adiciona proprietário******/
export const addProp = async (form) => {
    

  const response = await db.collection("proprietarios").add(
    {
      name: form.name.value,
      phone: form.phone.value,                           
      adress:form.adress.value,
      mobile:form.mobile.value,
      district:form.district.value,
      city:form.city.value,
      zip_code:form.zip_code.value,
      maritalStatus:form.maritalStatus.value,
      profession:form.profession.value,
      birth:form.birth.value,
      email: form.email.value,
      cpf: form.cpf.value,  
      rg:form.rg.value,
      nacionality:form.nacionality.value,
      sonName:form.sonName.value,
      sonPhone:form.sonPhone.value,
      sonAdress:form.sonAdress.value,
      sonMobile:form.sonMobile.value,
      sonDistrict:form.sonDistrict.value,
      sonCity:form.sonCity.value,
      sonZip_code:form.sonZip_code.value,
      sonMaritalStatus:form.sonMaritalStatus.value,
      sonProfession:form.sonProfession.value,
      sonBirth:form.sonBirth.value,
      sonEmail:form.sonEmail.value,
      sonCpf:form.sonCpf.value,
      sonRg:form.sonRg.value,
      sonNacionality:form.sonNacionality.value,
      bank:form.bank.value,
      ag:form.ag.value,
      count:form.count.value,
      nameCount:form.nameCount.value,
    }
  )   
  .then((doc) => {    
  return(
    {data:doc, status: 200 }
  )
  })
  .catch((err) => {    
    return(
      { status: 400 }
    )
  })   
  
  return response
} 

/******Função que adiciona inquilino******/
export const addRenter = async (form) => {
    
  const response = await db.collection("inquilinos").doc().set(

    {
      name: form.rent_name.value,
      phone: form.phone.value,
      phone2: form.phone2.value,
      email: form.email.value,
      cpf: form.cpf.value,        
    }

  )  
  
} 

/******Função que adiciona imovel******/
export const addPropertie = async (form) => {
    
  const response = await db.collection(`imoveis`).doc(form.codigo.value).set(
    {
      codigo: form.codigo.value,
      city: form.city.value,
      state:form.state.value,
      district: form.district.value,
      street: form.street.value,        
      number: form.number.value,
      zip_code: form.zip_code.value,
      owner: form.owner.value,
      renter: form.renter.value,
      status: form.status.value
    }
  ).then((doc) => {    
    return(
      {status: 200 }
    )
    })
    .catch((err) => {    
      return(
        { status: 400 }
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

/******Função que faz o delete dos imoveis******/
export const deletePropertie = async (id) => {    
  const response = await db.collection("imoveis").doc(id).delete()
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
      adress:item.adress,
      mobile:item.mobile,
      district:item.district,
      city:item.city,
      zip_code:item.zip_code,
      maritalStatus:item.maritalStatus,
      profession:item.profession,
      birth:item.birth,
      email: item.email,
      cpf: item.cpf,  
      rg:item.rg,
      nacionality:item.nacionality,
      sonName:item.sonName,
      sonPhone:item.sonPhone,
      sonAdress:item.sonAdress,
      sonMobile:item.sonMobile,
      sonDistrict:item.sonDistrict,
      sonCity:item.sonCity,
      sonZip_code:item.sonZip_code,
      sonMaritalStatus:item.sonMaritalStatus,
      sonProfession:item.sonProfession,
      sonBirth:item.sonBirth,
      sonEmail:item.sonEmail,
      sonCpf:item.sonCpf,
      sonRg:item.sonRg,
      sonNacionality:item.sonNacionality,
      bank:item.bank,
      ag:item.ag,
      count:item.count,
      nameCount:item.nameCount,
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

/******Função que edição dos imoveis******/
export const changePropertie = async (item) => {     
  const response = await db.collection(`imoveis`).doc(item.id.value).update(      
    {
      codigo: item.codigo.value,
      city: item.city.value,
      state:item.state.value,
      district: item.district.value,
      street: item.street.value,        
      number: item.number.value,
      zip_code: item.zip_code.value,
      owner: item.owner.value,
      renter: item.renter.value,
      status: item.status.value
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


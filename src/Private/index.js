import { createContext, useCallback, useState, useEffect } from "react"

import { auth, db } from "../Configs/FirebaseConfig"
import { onAuthStateChanged } from "firebase/auth"

import { Navigate } from "react-router-dom"

import { getAuth } from "firebase/auth"
import { collection, query, where, getDocs } from "firebase/firestore"

const Context = createContext();

function Private({ children }){
  const [userRole, setUserRole] = useState("")
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)
  
  useEffect(() => {
    async function checkLogin(){
      const unsub = onAuthStateChanged(auth, (user)=> {
        //se tem user logado
        if(user){
          const userData = {
            uid: user.uid,
            email: user.email,
          }

          localStorage.setItem('@detailUser', JSON.stringify(userData))
          verificAdmin()
          

        }else{
          //não possui user logado
          setLoading(false)
          setSigned(false)
        }
      })
      
      
    }

    checkLogin()
    
  },[])  

  const verificAdmin = async () => {
    const auth = getAuth();
    const user = auth.currentUser
    const usersRef = collection(db, "users")
    const userRoles = query(usersRef, where('uid', '==' , user.uid))

    const querySnapshot = await getDocs(userRoles);
    querySnapshot.forEach((doc) => {
      setUserRole(doc.data().role);
    });
    setLoading(false)
    setSigned(true)
  }

  if(loading){
    return(
      <div></div>
    )
  }
  
  if(!signed){
    return <Navigate to='/login'/>
  }
  return(
    <Context.Provider value={{userRole}}>
      {children}
    </Context.Provider>
  ) 
}

export {Context, Private}
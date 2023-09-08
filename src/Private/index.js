import { createContext, useCallback, useState, useEffect } from "react"

import { auth, db } from "../Configs/FirebaseConfig"
import { onAuthStateChanged, signOut } from "firebase/auth"

import { Navigate } from "react-router-dom"

import { getAuth } from "firebase/auth"
import { collection, query, where, getDocs } from "firebase/firestore"
import { fetchUsers } from "../Services/routes"

const Context = createContext();

function Private({ children }){
  const [userRole, setUserRole] = useState("")
  const [loading, setLoading] = useState(true)
  const [signed, setSigned] = useState(false)
  const [UserActive, setUserActive] = useState(false)
  const [userData, setUserData] = useState()
  
  useEffect(() => {
    async function checkLogin(){
      const unsub = onAuthStateChanged(auth, (user)=> {
        //se tem user logado
        if(user){
          const userData = {
            uid: user.uid,
            email: user.email,
          }
          getUserData(userData.uid)
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

  const getUserData = async (uid) => {
    const response = await fetchUsers();
    let users = []
    response.docs.forEach((item) => {
      users.push([item.data()])
    });
    const userLoged =  users.find(user => user[0].uid === uid)
    setUserData(userLoged[0])
  }

  const verificAdmin = async () => {
    const auth = getAuth();
    const user = auth.currentUser
    const usersRef = collection(db, "users")
    const userRoles = query(usersRef, where('uid', '==' , user.uid))

    const querySnapshot = await getDocs(userRoles);
    querySnapshot.forEach((doc) => {
      setUserRole(doc.data().role);
      setUserActive(doc.data().active);
      if(doc.data().active){
        setSigned(true)
      } else{
        signOut(auth)
      }
    });
    setLoading(false)
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
    <Context.Provider value={{userRole, userData}}>
      {children}
    </Context.Provider>
  ) 
}

export {Context, Private}
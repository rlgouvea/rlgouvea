import { useEffect } from "react"
import { useState } from "react"
import AlertDelete from "../../Assets/Components/AlertDelete"
import AlertPopup from "../../Assets/Components/AlertPopup"
import FormEditAdmin from "../../Assets/Components/FormEdit/FormEditAdmin"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"
import { changeUser, deleteUser, fetchUsers, addUser } from "../../Services/routes"
import "./renterStyle.scss"
import TableAdmin from "../../Assets/Components/Table/tableAdmin"
import Loader from "../../Assets/Components/Loader"
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Admin = () => {
    
    const auth = getAuth();
    const user2 = auth.currentUser.email
    // console.log('user: ' + JSON.stringify(user2))

    const navigate = useNavigate()

    const [users, setUsers] = useState([])
    const [listUsers, setListUsers] = useState(false)
    const [userControl, setUserControl] = useState()
    const [alertEdit, setAlertEdit] = useState(false)
    const [alert, setAlert] = useState(false)
    const [ownerEdit, setOwnerEdit] = useState()    
    const [alertDel, setAlertDel] = useState(false)
    const [title, setTitle] = useState()
    const [registerUser, setRegisterUser] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form,setForm] = useState({
        login:{
            value:"",
            error: false
        },
        senha:{
            value:"",
            error: false
        },
    })

    const handleChange = (e) => {
        const {name, value} = e.target

        setForm({
            ...form,
            [name]:{
                value,
                error: false
            }
        })
    }

    useEffect(()=>{        
        getUsers()
    },[])

    const getUsers = async () => {
        setLoading(true)
        setUsers([])
        const response = await fetchUsers()
        response.docs.forEach(item =>{                               
            setUsers(prevState => [...prevState, [item.data(), {id:item.id}]])      
        })   
        setLoading(false)
    }

    /* handleSubmit
        Adicionar setTitle
        Adicionar setAlert
    */
    const handleSubmit = async (e) =>{
        setLoading(true)
        e.preventDefault()
        const response = await addUser(form)
        if(response.status === 200){
            setTitle("Cadastrado com sucesso!")
            setAlert(true)
            setRegisterUser(!registerUser)
            getUsers() 
        }
        setLoading(false)
    }
    
        const handleDelete = (item) => {                      
            console.log(item)
            setAlertDel(true)
            setTitle("Tem certeza que deseja excluir esse usuário?")  
            setUserControl(item)             
        }

        const deleteUsers = async () => {
            setLoading(true)
            const response = await deleteUser(userControl.id)
            if(response.status === 200){
                setLoading(false)
                setAlertDel(false)
                getUsers()
                setAlertEdit(false)
                setTitle("Excluído com sucesso!")
                setAlert(true)
                setListUsers(false)
            
            }
            setLoading(false)
        }
    
        const handleListUsers = async () => {   
            setLoading(true)     
            await getUsers()            
            setRegisterUser(false)
            setListUsers(!listUsers)
            setLoading(false)
        }
    
        const handleListRegister = () => {
            setLoading(true)
            setRegisterUser(!registerUser)
            setListUsers(false)
            setLoading(false)
            navigate('/register', { replace: true })
        }
    
        const handleEdit = (item) => {        
            setOwnerEdit(item)
            setAlertEdit(true)
        }

        const handleEditUser = async (data) => {
            setLoading(true)
            const response = await changeUser(data)
            if(response.status === 200){
                getUsers()
                setAlertEdit(false)
                setTitle("Atualizado com sucesso!")
                setAlert(true)

            }
            setLoading(false)
        }
    
        const handleReload = () => {
            getUsers()
            setAlertEdit(false)
        }
    
    return(
        <div className="containerRenter">
            <h1>Usuários</h1> 
            <div className="menuHead">
                <ButtonControl onClick={()=>handleListUsers()}>Listar Usuários</ButtonControl>
                <ButtonControl onClick={()=>handleListRegister()}>Adicionar Usuários</ButtonControl>
                {/* <ButtonControl onClick={navigate('/register', { replace: true })}>Adicionar Usuários</ButtonControl> */}
            </div>
            {
                loading &&
                <Loader />
            }
            {
                alert &&
                <AlertPopup
                view={alert}
                setView={setAlert}
                title={title}            
                />   
            }          
            {
                alertEdit &&
                <FormEditAdmin
                view={alertEdit}
                setView={setAlertEdit}
                item={ownerEdit}
                handle={handleReload}
                handleDelete={handleDelete}
                handleEditUser={handleEditUser}
                />
            }
            {
                alertDel &&
                <AlertDelete
                title={title}
                view={alertDel}
                setView={setAlertDel}
                handle={deleteUsers}
                // item={renterControl}
                />
            } 
            {
                registerUser &&
                <ContainerForm style={{borderRadius:' 20px',   
                    boxShadow: '0 0 20px black', width:"90%"}}>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <label>Usuário</label>
                            <input
                                type="text"
                                name="login"
                                placeholder="Usuário"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Senha</label>
                            <input
                                type="text"
                                name="senha"
                                placeholder="Senha"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ButtonControl type="submit" style={{margin: '10px auto 0'}}>Cadastrar</ButtonControl>
                        </FormGroup>
                    </form>
                </ContainerForm>
            }
            {
                listUsers &&
                <TableAdmin 
                    users={users}
                    getUsers={getUsers}
                    handleEdit={handleEdit}
                />
            }
            
        </div>
    )
}

export default Admin
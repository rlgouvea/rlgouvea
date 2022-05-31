import { useEffect } from "react"
import { useState } from "react"
import AlertDelete from "../../Assets/Components/AlertDelete"
import FormEdit from "../../Assets/Components/FormEdit"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"
import { deleteProp, fetchProprietarios } from "../../Services/routes"
import {addProp} from "../../Services/routes"
import "./ownerStyle.scss"

const Owners = () => {
    const [owners, setOwners] = useState([])    
    const [listOwners, setListOwners] = useState(false)
    const [ownerControl, setControlOwner] = useState()
    const [alertEdit, setAlertEdit] = useState(false)
    const [ownerEdit, setOwnerEdit] = useState()
    const [alertDel, setAlertDel] = useState(false)
    const [title, setTitle] = useState()
    const [registerOwners, setRegisterOwners] = useState(false)

    const [form,setForm] = useState({
        name:{
            value:"",
            error: false
        },
        phone:{
            value:"",
            error: false
        },
        email:{
            value:"",
            error: false
        },
        cpf:{
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

        getOwners()
    },[])

    const getOwners = async () => {
        setOwners([])
        const response = await fetchProprietarios()        
        response.docs.forEach(item =>{                               
            setOwners(prevState => [...prevState, [item.data(), {id:item.id}]])                  
        })         
    }
    
    const handleSubmit = async (e) =>{
        e.preventDefault()
        const response = await addProp(form)        
        if(response.status === 200){
            alert("Cadastrado com sucesso!")
            setRegisterOwners(!registerOwners)
            getOwners()
        }                
    }

    const handleAlertDel = (owner) => {
        setControlOwner(owner)
        setTitle("Tem certeza que deseja excluir esse proprietário?")
        setAlertDel(true)
    }

    const handleDelete = async (item) => {                
        const response = await deleteProp(item[1].id)        
        if(response.status === 200){
            setAlertDel(false)            
            getOwners()
        }
    }

    const handleListOwners = () => {
        setRegisterOwners(false)
        setListOwners(!listOwners)
    }

    const handleListRegister = () => {
        setRegisterOwners(!registerOwners)
        setListOwners(false)
    }

    const handleEdit = (item) => {
        setOwnerEdit(item)
        setAlertEdit(true)
    }
    
    return(
        <div className="containerOwner">
            <h1>Proprietarios</h1> 
            <div className="menuHead">
                <ButtonControl onClick={()=>handleListOwners()}>Listar Proprietários</ButtonControl>
                <ButtonControl onClick={()=>handleListRegister()}>Adicionar Proprietário</ButtonControl>
            </div>
            {
                alertEdit &&
                <FormEdit
                view={alertEdit}
                setView={setAlertEdit}
                item={ownerEdit}
                />
            }
            {
                alertDel &&
                <AlertDelete
                title={title}
                view={alertDel}
                setView={setAlertDel}
                handle={handleDelete}
                item={ownerControl}
                />
            }
            {
                listOwners &&
                <div className="table">
                    <ul>
                        {
                            owners &&
                            owners.map((owner, index) => (
                                <li key={index}>
                                    <span
                                        style={{
                                            width: '10%',
                                            cursor: 'pointer',
                                        }}
                                        onClick={()=>handleEdit(owner)}
                                    >
                                        Edit
                                    </span>
                                    <span
                                        style={{
                                            width: '10%',
                                            cursor: 'pointer',
                                        }}
                                        onClick={()=>handleAlertDel(owner)}
                                    >
                                        Del
                                    </span>
                                    <span>{owner[0].name}</span>
                                    <span>{owner[0].phone}</span>
                                    <span>{owner[0].email}</span>
                                    <span>{owner[0].cpf}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            }
            {
                registerOwners &&
                <ContainerForm>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <label>Nome</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telefone</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Telefone"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Cpf</label>
                            <input
                                type="text"
                                name="cpf"
                                placeholder="Cpf"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <ButtonControl type="submit" style={{margin: '10px auto 0'}}>Cadastrar</ButtonControl>
                        </FormGroup>
                    </form>
                </ContainerForm>
            }
            
        </div>
    )
}

export default Owners
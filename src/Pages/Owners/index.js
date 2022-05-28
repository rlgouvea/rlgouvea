import { useEffect } from "react"
import { useState } from "react"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"
import { fetchProprietarios } from "../../Services/routes"
import {addProp} from "../../Services/routes"
import "./ownerStyle.scss"

const Owners = () => {
    const [owners, setOwners] = useState([])
    const [ownerId, setOwnerId] = useState([])
    const [listOwners, setListOwners] = useState(false)
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
            setOwners(prevState => [...prevState, item.data()])      
            setOwnerId(prevState => [...prevState, item.id])
        })   
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        addProp(form)                
        alert("Cadastrado com sucesso!")
        setRegisterOwners(!registerOwners)
        getOwners()
        
        
    }
    
    return(
        <div className="containerOwner">
            <h1>Proprietarios</h1> 
            <div className="menuHead">
                <ButtonControl onClick={()=>setListOwners(!listOwners)}>Listar Proprietários</ButtonControl>
                <ButtonControl onClick={()=>setRegisterOwners(!registerOwners)}>Adicionar Proprietário</ButtonControl>
            </div>
            {
                listOwners &&
                <div className="table">
                    <ul>
                        {
                            owners &&
                            owners.map((owner, index) => (
                                <li key={index}>
                                    <span>{owner.name}</span>
                                    <span>{owner.phone}</span>
                                    <span>{owner.email}</span>
                                    <span>{owner.cpf}</span>
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
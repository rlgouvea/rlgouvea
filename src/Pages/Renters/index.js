import { useEffect } from "react"
import { useState } from "react"
import AlertDelete from "../../Assets/Components/AlertDelete"
import AlertPopup from "../../Assets/Components/AlertPopup"
import FormEdit from "../../Assets/Components/FormEdit"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"
import { fetchInquilinos } from "../../Services/routes"
import { addRenter } from "../../Services/routes"
import "./renterStyle.scss"
import TableRenters from "../../Assets/Components/Table/tableRenters"

const Renters = () => {
    const [renters, setRenters] = useState([])
    const [renterId, setRenterId] = useState([])
    const [listRenters, setListRenters] = useState(false)
    const [registerRenters, setRegisterRenters] = useState(false)

    const [form,setForm] = useState({
        rent_name:{
            value:"",
            error: false
        },
        rent_phone:{
            value:"",
            error: false
        },
        rent_phone2:{
            value:"",
            error: false
        },
        rent_phone3:{
            value:"",
            error: false
        },
        rent_email:{
            value:"",
            error: false
        },
        rent_cpf:{
            value:"",
            error: false
        },
        rent_rg:{
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
        getRenters()
    },[])

    const getRenters = async () => {
        setRenters([])
        const response = await fetchInquilinos()
        response.docs.forEach(item =>{                               
            setRenters(prevState => [...prevState, [item.data(), {id:item.id}]])      
            // setRenterId(prevState => [...prevState, item.id])
        })   
    }

    /* handleSubmit
        Adicionar setTitle
        Adicionar setAlert
    */
    const handleSubmit = async (e) =>{
        e.preventDefault()
        addRenter(form)                
        alert("Cadastrado com sucesso!")
        setRegisterRenters(!registerRenters)
        getRenters()        
    }

    /* adicionar
        handleDelete
        handleListRenters
        handleListRegister
        handleEdit
        handleReload
    */
    
    return(
        <div className="containerRenter">
            <h1>Inquilinos</h1> 
            <div className="menuHead">
                <ButtonControl onClick={()=>setListRenters(!listRenters)}>Listar Inquilinos</ButtonControl>
                <ButtonControl onClick={()=>setRegisterRenters(!registerRenters)}>Adicionar Inquilino</ButtonControl>
            </div>
            {
                listRenters &&
                    <TableRenters 
                        renters={renters}
                        getRenters={getRenters}
                        // handleEdit={handleEdit}
                    />
                // <div>
                //     <div className="table">
                //         <ul>
                //             {
                //                 renters &&
                //                 renters.map((renter, index) => (
                //                     <li key={index}>
                //                         <span>{renter.name}</span>
                //                         <span>{renter.phone}</span>
                //                         <span>{renter.phone2}</span>
                //                         <span>{renter.email}</span>
                //                         <span>{renter.cpf}</span>
                //                     </li>
                //                 ))
                //             }
                //         </ul>
                //     </div>
                // </div>
            }
            {
                registerRenters &&
                <ContainerForm>
                    <form onSubmit={handleSubmit}>
                        <FormGroup>
                            <label>Nome</label>
                            <input
                                type="text"
                                name="rent_name"
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
                            <label>Telefone 2</label>
                            <input
                                type="text"
                                name="phone2"
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

export default Renters
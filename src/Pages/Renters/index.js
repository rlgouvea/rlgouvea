import { useEffect } from "react"
import { useState } from "react"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"
import { fetchInquilinos } from "../../Services/routes"
import { addRenter } from "../../Services/routes"
import "./renterStyle.scss"
import ApoioEvent from "../../Assets/Components/Table/apoio_event"

const Renters = () => {
    const [renters, setRenters] = useState([])
    const [renterId, setRenterId] = useState([])
    const [listRenters, setListRenters] = useState(false)
    const [registerRenters, setRegisterRenters] = useState(false)

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

        getRenters()
    },[])

    const getRenters = async () => {
        setRenters([])
        const response = await fetchInquilinos()
        response.docs.forEach(item =>{                               
            setRenters(prevState => [...prevState, item.data()])      
            setRenterId(prevState => [...prevState, item.id])
        })   
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        addRenter(form)                
        alert("Cadastrado com sucesso!")
        setRegisterRenters(!registerRenters)
        getRenters()
        
        
    }

    // edit datagrid when click on line
    const handleClick = (e) => {
        const id = e.target.id
        setListRenters(!listRenters)
        setRenterId(id)
    }
    
    return(
        <ApoioEvent />
        // <div className="containerRenter">
        //     <h1>Inquilinos</h1> 
        //     <div className="menuHead">
        //         <ButtonControl onClick={()=>setListRenters(!listRenters)}>Listar Inquilinos</ButtonControl>
        //         <ButtonControl onClick={()=>setRegisterRenters(!registerRenters)}>Adicionar Inquilino</ButtonControl>
        //     </div>
        //     {
        //         listRenters &&
        //         <div className="table">
        //             <ul>
        //                 {
        //                     renters &&
        //                     renters.map((owner, index) => (
        //                         <li key={index}>
        //                             <span>{owner.name}</span>
        //                             <span>{owner.phone}</span>
        //                             <span>{owner.email}</span>
        //                             <span>{owner.cpf}</span>
        //                         </li>
        //                     ))
        //                 }
        //             </ul>
        //         </div>
        //     }
        //     {
        //         registerRenters &&
        //         <ContainerForm>
        //             <form onSubmit={handleSubmit}>
        //                 <FormGroup>
        //                     <label>Nome</label>
        //                     <input
        //                         type="text"
        //                         name="name"
        //                         placeholder="Nome"
        //                         onChange={handleChange}
        //                     />
        //                 </FormGroup>
        //                 <FormGroup>
        //                     <label>Telefone</label>
        //                     <input
        //                         type="text"
        //                         name="phone"
        //                         placeholder="Telefone"
        //                         onChange={handleChange}
        //                     />
        //                 </FormGroup>
        //                 <FormGroup>
        //                     <label>Email</label>
        //                     <input
        //                         type="text"
        //                         name="email"
        //                         placeholder="Email"
        //                         onChange={handleChange}
        //                     />
        //                 </FormGroup>
        //                 <FormGroup>
        //                     <label>Cpf</label>
        //                     <input
        //                         type="text"
        //                         name="cpf"
        //                         placeholder="Cpf"
        //                         onChange={handleChange}
        //                     />
        //                 </FormGroup>
        //                 <FormGroup>
        //                     <ButtonControl type="submit" style={{margin: '10px auto 0'}}>Cadastrar</ButtonControl>
        //                 </FormGroup>
        //             </form>
        //         </ContainerForm>
        //     }
            
        // </div>
    )
}

export default Renters
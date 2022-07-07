import { useEffect } from "react"
import { useState } from "react"
import AlertDelete from "../../Assets/Components/AlertDelete"
import AlertPopup from "../../Assets/Components/AlertPopup"
import FormEditRenter from "../../Assets/Components/FormEdit/FormEditRenter"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"
import { changeRenter, deleteRenter, fetchInquilinos } from "../../Services/routes"
import { addRenter } from "../../Services/routes"
import "./renterStyle.scss"
import TableRenters from "../../Assets/Components/Table/tableRenters"
import Loader from "../../Assets/Components/Loader"

const Renters = () => {
    const [renters, setRenters] = useState([])
    const [listRenters, setListRenters] = useState(false)
    const [renterControl, setRenterControl] = useState()
    const [alertEdit, setAlertEdit] = useState(false)
    const [alert, setAlert] = useState(false)
    const [ownerEdit, setOwnerEdit] = useState()    
    const [alertDel, setAlertDel] = useState(false)
    const [title, setTitle] = useState()
    const [registerRenters, setRegisterRenters] = useState(false)
    const [loading, setLoading] = useState(false)

    const [form,setForm] = useState({
        name:{
            value:"",
            error: false
        },
        phone:{
            value:"",
            error: false
        },
        phone2:{
            value:"",
            error: false
        },
        phone3:{
            value:"",
            error: false
        },
        maritalStatus:{
            value:"",
            error: false
        },
        profession:{
            value:"",
            error: false
        },
        nationality:{
            value:"",
            error: false
        },
        birth:{
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
        rg:{
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
        setLoading(true)
        setRenters([])
        const response = await fetchInquilinos()
        response.docs.forEach(item =>{                               
            setRenters(prevState => [...prevState, [item.data(), {id:item.id}]])      
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
        const response = await addRenter(form)
        if(response.status === 200){
            setTitle("Cadastrado com sucesso!")
            setAlert(true)
            setRegisterRenters(!registerRenters)
            getRenters() 
        }
        setLoading(false)
    }
    
        const handleDelete = (item) => {                      
            console.log(item)
            setAlertDel(true)
            setTitle("Tem certeza que deseja excluir esse inquilino?")  
            setRenterControl(item)             
        }

        const deleteRenters = async () => {
            setLoading(true)
            const response = await deleteRenter(renterControl.id)
            if(response.status === 200){
                setLoading(false)
                setAlertDel(false)
                getRenters()
                setAlertEdit(false)
                setTitle("Excluído com sucesso!")
                setAlert(true)
                setListRenters(false)
            
            }
            setLoading(false)
        }
    
        const handleListRenters = async () => {   
            setLoading(true)     
            await getRenters()            
            setRegisterRenters(false)
            setListRenters(!listRenters)
            setLoading(false)
        }
    
        const handleListRegister = () => {
            setLoading(true)
            setRegisterRenters(!registerRenters)
            setListRenters(false)
            setLoading(false)
        }
    
        const handleEdit = (item) => {        
            setOwnerEdit(item)
            setAlertEdit(true)
        }

        const handleEditRenter = async (data) => {
            setLoading(true)
            const response = await changeRenter(data)
            if(response.status === 200){
                getRenters()
                setAlertEdit(false)
                setTitle("Atualizado com sucesso!")
                setAlert(true)

            }
            setLoading(false)
        }
    
        const handleReload = () => {
            getRenters()
            setAlertEdit(false)
        }
    
    return(
        <div className="containerRenter">
            <h1>Inquilinos</h1> 
            <div className="menuHead">
                <ButtonControl onClick={()=>handleListRenters()}>Listar Inquilinos</ButtonControl>
                <ButtonControl onClick={()=>handleListRegister()}>Adicionar Inquilino</ButtonControl>
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
                <FormEditRenter
                view={alertEdit}
                setView={setAlertEdit}
                item={ownerEdit}
                handle={handleReload}
                handleDelete={handleDelete}
                handleEditRenter={handleEditRenter}
                />
            }
            {
                alertDel &&
                <AlertDelete
                title={title}
                view={alertDel}
                setView={setAlertDel}
                handle={deleteRenters}
                // item={renterControl}
                />
            } 
            {
                registerRenters &&
                <ContainerForm style={{borderRadius:' 20px',   
                    boxShadow: '0 0 20px black', width:"90%"}}>
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
                            <label>Telefone 2</label>
                            <input
                                type="text"
                                name="phone2"
                                placeholder="Telefone"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telefone 3</label>
                            <input
                                type="text"
                                name="phone3"
                                placeholder="Telefone"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Estado Civil</label>
                            <input
                                type="text"
                                name="maritalStatus"
                                placeholder="Estado Civil"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Profissão</label>
                            <input
                                type="text"
                                name="profession"
                                placeholder="Profissão"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Nacionalidade</label>
                            <input
                                type="text"
                                name="nationality"
                                placeholder="Nacionalidade"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Nascimento</label>
                            <input
                                type="text"
                                name="birth"
                                placeholder="Nascimento"
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
                            <label>CPF</label>
                            <input
                                type="text"
                                name="cpf"
                                placeholder="CPF"
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>RG</label>
                            <input
                                type="text"
                                name="rg"
                                placeholder="RG"
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
                listRenters &&
                <TableRenters 
                    renters={renters}
                    getRenters={getRenters}
                    handleEdit={handleEdit}
                />
            }
            
        </div>
    )
}

export default Renters
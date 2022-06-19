import { useEffect, useState } from "react"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"
import Loader from "../../Assets/Components/Loader"
import { addPropertie, changePropertie, deletePropertie, fetchInquilinos, fetchProperties, fetchProprietarios } from "../../Services/routes"
import "./propertiesStyle.scss"
import AlertPopup from "../../Assets/Components/AlertPopup"
import Table from "./TableProperties/index"
import FormEditPropertie from "./FormEditPropertie"
import AlertDelete from "../../Assets/Components/AlertDelete"

const Properties = () => {
    const [owners, setOwners] = useState([])
    const [renters, setRenters] = useState([])
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(false)
    const [title, setTitle] = useState()
    const [registerProperties, setRegisterProperties] = useState(false)
    const [listProperties, setListProperties] = useState(false)
    const [properties, setProperties] = useState([])
    const [propertieEdit, setPropertieEdit] = useState()
    const [propertieDelete, setPropertieDelete] = useState()
    const [alertDelete, setAlertDelete] = useState(false)
    const [alertEdit, setAlertEdit] = useState(false)
    const [form, setForm] = useState({
        codigo:{
            value: "",
            error: false
        },
        city:{
            value: "",
            error: false
        },
        state:{
            value: "",
            error: false
        },
        district:{
            value: "",
            error: false
        },
        street:{
            value: "",
            error: false
        },
        number:{
            value: "",
            error: false
        },
        zip_code:{
            value: "",
            error: false
        },
        owner:{
            value: "",
            error: false
        },
        renter:{
            value: "",
            error: false
        },
        status:{
            value: "",
            error: false
        }
    })

    const initialState= {
        codigo:{
            value: "",
            error: false
        },
        city:{
            value: "",
            error: false
        },
        state:{
            value: "",
            error: false
        },
        district:{
            value: "",
            error: false
        },
        street:{
            value: "",
            error: false
        },
        number:{
            value: "",
            error: false
        },
        zip_code:{
            value: "",
            error: false
        },
        owner:{
            value: "",
            error: false
        },
        renter:{
            value: "",
            error: false
        },
        status:{
            value: "",
            error: false
        }
    }

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

    useEffect(()=> {  
        setLoading(true)      
        getRenters()
        getOwners()
        getProperties()
    },[])

    const getProperties = async () => {
        setProperties([])
        const response = await fetchProperties()
        response.docs.forEach(item =>{                               
            setProperties(prevState => [...prevState, [item.data()]])                  
        })     
        setLoading(false) 
    }
    
    const getOwners = async () => {        
        setOwners([])
        const response = await fetchProprietarios()        
        response.docs.forEach(item =>{                               
            setOwners(prevState => [...prevState, [item.data(), {id:item.id}]])                  
        })     
        setLoading(false)            
    }

    const getRenters = async () => {        
        setRenters([])
        const response = await fetchInquilinos()        
        response.docs.forEach(item =>{                               
            setRenters(prevState => [...prevState, [item.data(), {id:item.id}]])                  
        })  
        setLoading(false)               
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const response = await addPropertie(form)
        if(response.status === 200){
            setTitle("Cadastrado com sucesso!")
            setLoading(false)
            setAlert(true)   
            setForm(initialState)         
        }
    }

    const handleListProperties = async () => {        
        await getProperties()
        
        setRegisterProperties(false)
        setListProperties(!listProperties)
    }

    const handleListRegister = () => {
        setRegisterProperties(!registerProperties)
        setListProperties(false)
    }

    const handleEdit = (item) => {
        setPropertieEdit(item)
        setAlertEdit(true)
    }

    const handleEditPropertie = async (item) =>{
        setLoading(true)
        const response = await changePropertie(item)
        if(response.status === 200){
            setAlertEdit(false)
            setTitle("Alterado com sucesso!")
            setLoading(false)
            setAlert(true)                     
            setListProperties(false)              
        }
    }

    const handleDelete = (item) => {        
        setPropertieDelete(item)
        setTitle("Tem certeza que deseja excluir esse imóvel?")
        setAlertDelete(true)
    }

    const handleDeletePropertie = async (item) => {   
        setLoading(true)              
        const response = await deletePropertie(item.value)        
        if(response.status === 200){            
            setAlertDelete(false)
            setAlertEdit(false)
            setTitle("Deletado com sucesso!")
            setLoading(false)
            setAlert(true)                     
            setListProperties(false) 
        } else if(response.status === 400){
            setAlertDelete(false)
            setAlertEdit(false)
            setLoading(false)
            console.log(response)
        }
    }
    return(
    <div className="containerProperties">    
        {
            alertEdit &&
            <FormEditPropertie 
            propertie={propertieEdit}
            owners={owners}
            renters={renters}
            handle={handleEditPropertie}
            view={alertEdit}
            setView={setAlertEdit}
            handleDelete={handleDelete}
            />
        }    
        {
            alertDelete &&
            <AlertDelete 
            handle={handleDeletePropertie} 
            title={title} 
            view={alertDelete}
            setView={setAlertDelete}
            item={propertieDelete}
            />
        }
        <h1>Propriedades</h1> 
        <div className="menuHead">
            <ButtonControl onClick={()=>handleListProperties()}>Listar Propriedades</ButtonControl>
            <ButtonControl onClick={()=>handleListRegister()}>Adicionar Propriedade</ButtonControl>
        </div>    
        {
            loading &&
            <Loader/>
        }
        {
            registerProperties && 
            <ContainerForm>
                <form onSubmit={handleSubmit}>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Código do imóvel</label>
                            <input value={form.codigo.value} name="codigo" type='text' placeholder='Código' onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Cidade</label>
                            <input value={form.city.value} name="city" type='text' placeholder='Cidade' onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Estado</label>
                            <input value={form.state.value} name="state" type='text' placeholder='Estado' onChange={handleChange} />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Bairro</label>
                            <input value={form.district.value} name="district" type='text' placeholder='Bairro' onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Rua</label>
                            <input value={form.street.value} name="street" type='text' placeholder='Rua' onChange={handleChange} />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Número</label>
                            <input value={form.number.value} name="number" type='text' placeholder='Número' onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <label>Cep</label>
                            <input value={form.zip_code.value} name="zip_code" type='text' placeholder='Cep' onChange={handleChange} />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Proprietário</label>
                            <select value={form.owner.value} name="owner" onChange={handleChange} >
                            <option value="" selected>Selecione o proprietário</option>
                                {
                                    owners.length> 0 &&                
                                    owners.map((owner, index)=>(
                                        <option key={index} value={owner[0].name}>{owner[0].name}</option>
                                    ))
                                }
                            </select>    
                        </FormGroup>
                        <FormGroup>
                            <label>Inquilino</label>
                            <select value={form.renter.value} name="renter" onChange={handleChange} >
                                <option value="" selected>Selecione o inquilino</option>
                                <option value="vazio" selected>Vazio</option>
                                {
                                    renters.length> 0 &&
                                
                                    renters.map((renter, index)=>(
                                        <option key={index} value={renter[0].name}>{renter[0].name}</option>
                                    ))
                                }
                            </select> 
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Status</label>
                            <select value={form.status.value} name="status" onChange={handleChange} >
                                <option value="" selected>Selecione o Status do imóvel</option>
                                <option value="vago" >Vago</option>
                                <option value="alugado" >Alugado</option>
                                <option value="A venda" >A venda</option>
                            </select> 
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <ButtonControl style={{margin: '10px auto 0'}} type="submit">Salvar</ButtonControl>    
                    </FormGroup>
                </form>            
            </ContainerForm>
        }
        {
                listProperties &&
                <Table 
                properties={properties} 
                //getProperties={getProperties}
                handleEdit={handleEdit}                
                />           
            }
        {
            alert &&
            <AlertPopup title={title} view={alert} setView={setAlert} />
        }
    </div>
    )
}

export default Properties
import { useEffect, useState, useContext } from "react"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"
import Loader from "../../Assets/Components/Loader"
import { addPropertie, changePropertie, deletePropertie, fetchInquilinos, fetchProperties, fetchProprietarios } from "../../Services/routes"
import "./propertiesStyle.scss"
import AlertPopup from "../../Assets/Components/AlertPopup"
import Table from "./TableProperties/index"
import FormEditPropertie from "./FormEditPropertie"
import AlertDelete from "../../Assets/Components/AlertDelete"

import Owners from '../Owners'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Context} from '../../Private'

const Properties = () => {
    const { userRole } = useContext(Context);
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
    const [statusResp, setStatusResp] = useState()
    const [ownerRegister, setOwnerRegister] = useState([])
    const [newRegisterOwner, setNewRegisterOwner] = useState(false)
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
        },
        description: {
            value: "",
            error: false
        },
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
        },
        description: {
            value: "",
            error: false
        },
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
    },[newRegisterOwner])

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
        const ownersDesordened = []
        const response = await fetchProprietarios()        
        response.docs.forEach(item =>{                
            ownersDesordened.push(Object.assign(item.data(), {id:item.id}))
            //setOwners(prevState => [...prevState, [item.data(), {id:item.id}]])                  
        })     
        const ownerOrdened = ownersDesordened.sort(function(a,b) {
            if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              // a must be equal to b
              return 0;
        })
        setOwners(ownerOrdened)
        setLoading(false)            
    }

    const getRenters = async () => {    
        const rentersDesordened = []    
        setRenters([])
        const response = await fetchInquilinos()        
        response.docs.forEach(item =>{                               
            rentersDesordened.push(Object.assign(item.data(), {id:item.id}))
            //setRenters(prevState => [...prevState, [item.data(), {id:item.id}]])                  
        })  
        const rentersOrdened = rentersDesordened.sort(function(a,b) {
            if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              // a must be equal to b
              return 0;
        })
        setRenters(rentersOrdened)
        setLoading(false)               
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        window.scrollTo(0,0)
        setLoading(true)
        const response = await addPropertie(form, ownerRegister)        
        if(response.status === 200){
            setTitle("Cadastrado com sucesso!")
            setLoading(false)
            setStatusResp('success')
            setAlert(true)   
            setForm(initialState)    
            setOwnerRegister([])                 
        } else if(response.status === 400){
            setTitle("Erro no sistema, tente novamente mais tarde!")
            setLoading(false)
            setAlert(true) 
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
        if(userRole ===   'admin' || userRole === 'atendente'){
            setPropertieEdit(item)
            setAlertEdit(true)
        }
    }

    const handleEditPropertie = async (item, ownerEditRegister) =>{
        setLoading(true)
        const response = await changePropertie(item, ownerEditRegister)
        if(response.status === 200){
            setStatusResp('success')
            setAlertEdit(false)
            setTitle("Alterado com sucesso!")
            setLoading(false)
            setAlert(true)                     
            setListProperties(false)              
        } else if(response.status === 400){
            setStatusResp('error')
            setAlertEdit(false)
            setTitle("Erro no sistema, tente novamente mais tarde!")
            setLoading(false)
            setAlert(true) 
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
    
    const handleOwner = (e) => {
        setOwnerRegister([...ownerRegister, e.target.value])        
    }

    const removeProp = (owner) => {
        const ownerFilter = ownerRegister.filter(remov => remov !== owner)
        setOwnerRegister(ownerFilter)
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
        <h1>Imóveis</h1> 
        <div className="menuHead">
            <ButtonControl onClick={()=>handleListProperties()}>Listar Imóveis</ButtonControl>
            {(userRole ===   'admin' || userRole === 'atendente') &&
                <ButtonControl onClick={()=>handleListRegister()}>Adicionar Imóvel</ButtonControl>
            }
        </div>    
        {
            loading &&
            <Loader/>
        }
        {
            registerProperties && 
            <ContainerForm>
                <button 
                onClick={()=>setNewRegisterOwner(true)}
                style={{
                    border:'none',
                    backgroundColor:'transparent',
                    display:'flex',
                    alignItems:'center',
                    marginBottom:10,
                    cursor:'pointer'
                }} >
                    Cadastrar Proprietário 
                    <AddCircleOutlineIcon/>
                </button>
                {
                    newRegisterOwner &&
                    <div className="newRegister">
                        <div className="containerNewRegister">
                            <Owners newRegister={newRegisterOwner} setNewRegister={setNewRegisterOwner} />
                        </div>
                    </div>
                }
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
                        <div className="formAddProp">
                            <FormGroup>
                                <label>Proprietário</label>
                                <select value={form.owner.value} name="owner" onChange={handleOwner} >
                                <option value="" selected>Selecione o proprietário</option>
                                    {
                                        owners.length> 0 &&                
                                        owners.map((owner, index)=>(
                                            <option key={index} value={owner.name}>{owner.name}</option>
                                        ))
                                    }
                                </select>    
                            </FormGroup>
                            {
                                ownerRegister &&
                                ownerRegister.map(owner=>(
                                    <div className="propName">
                                        {owner}
                                        <div className="propRemove" onClick={()=>removeProp(owner)}>
                                            Remover
                                        </div>
                                    </div>
                                ))
                            }
                        </div>                        
                    </div>    
                    <div className="formFlex">
                        <FormGroup>
                            <label>Inquilino</label>
                            <select value={form.renter.value} name="renter" onChange={handleChange} >
                                <option value="" selected>Selecione o inquilino</option>
                                <option value="vazio" selected>Vazio</option>
                                {
                                    renters.length> 0 &&
                                
                                    renters.map((renter, index)=>(
                                        <option key={index} value={renter.name}>{renter.name}</option>
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
                    <div className="formFlex">
                        <FormGroup>
                            <label>Descrição</label>
                            <textarea value={form.description.value} name="description" type='text' cols="50" rows="5" placeholder='Descrição' onChange={handleChange}
                            style={{padding: 5}} />
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
            <AlertPopup status={statusResp} title={title} view={alert} setView={setAlert} />
        }
    </div>
    )
}

export default Properties
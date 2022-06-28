import { useEffect, useState } from "react"
import { fetchInquilinos, fetchProperties, fetchProprietarios } from "../../Services/routes"
import Loading from "../../Assets/Components/Loader"
import VisualizarImpressao from "./contract"
import "./stylesNewContract.scss"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"

const NewContract = () => {
    const [owners, setOwners] = useState([])
    const [renters, setRenters] = useState([])
    const [renterSelect, setRenterSelect] = useState([])
    const [properties, setProperties] = useState([])
    const [owner, setOwner] = useState()
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(()=>{
        const getOwners = async () => { 
            setLoading(true)       
            setOwners([])
            const response = await fetchProprietarios()        
            response.docs.forEach(item =>{                               
                setOwners(prevState => [...prevState, [item.data(), {id:item.id}]])                  
            })     
            setLoading(false)            
        }
    
        const getRenters = async () => {
            setLoading(true)
            setRenters([])
            const response = await fetchInquilinos()
            response.docs.forEach(item =>{                               
                setRenters(prevState => [...prevState, [item.data(), {id:item.id}]])                  
            })
            setLoading(false)
        }
    
        const getProperties = async () => {        
            setLoading(true)
            let controlPropertie = []
            setProperties([])
            const response = await fetchProperties()
            response.docs.forEach(item =>{                               
                controlPropertie = controlPropertie.concat([[item.data(), {id:item.id}]])
            })        
            setProperties(controlPropertie.filter(prop => prop[0].status === "vago"))
            setLoading(false)
        }


        getOwners()
        getRenters()
        getProperties()
    },[])

    

    const handleEdit = (e) => {
        const {name, value} = e.target

        
        if(name === "propertie"){
            const ownerSelect = properties.filter(prop => prop[0].codigo === value)            
            setOwner(owners.filter(owne => owne[0].name === ownerSelect[0][0].owner))            
        } else if(name === "renters"){
            setRenterSelect(renters.filter(rent => rent[0].name === value))
        } else {
            setForm({
                ...form,
                [name]:{
                    value,
                    error: false
                }
            })
        }
    }    
    
    return(
        <div className="containerNewContract">
            {
                loading &&
                <Loading/>
            }
            <ContainerForm style={{width:"95%"}}>
                <form>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Selecione o imóvel</label>
                            <select name="propertie" onChange={handleEdit}>
                                <option value="" selected disabled>Selecione o imóvel</option>
                                {
                                    properties.length> 0 &&                
                                    properties.map((propertie, index)=>(
                                        <option key={index} value={propertie[0].codigo}>{propertie[0].codigo}</option>
                                    ))
                                }
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <label>Selecione o inquilino</label>
                            <select name="renters" onChange={handleEdit}>
                                <option value="" selected disabled>Selecione o inquilino</option>
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
                            <label>Período do contrato</label>
                            <input type='text' name="deadline" placeholder="Período" />
                        </FormGroup>
                        <FormGroup>
                            <label>Início do contrato</label>
                            <input type="date" name="start" placeholder="Início" />
                        </FormGroup>
                        <FormGroup>
                            <label>Fim do contrato</label>
                            <input type="date" name="end" placeholder="Fim" />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Gás</label>
                            <input type="text" name="gas" placeholder="Gás" />
                        </FormGroup>
                        <FormGroup>
                            <label>Sabesp</label>
                            <input type="text" name="sabesp" placeholder="Sabesp" />
                        </FormGroup>
                        <FormGroup>
                            <label>IPTU</label>
                            <input type="text" name="iptu" placeholder="IPTU" />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>CPFL</label>
                            <input type="text" name="cpfl" placeholder="CPFL" />
                        </FormGroup>
                        <FormGroup>
                            <label>Chaves</label>
                            <input type="text" name="keys" placeholder="Chaves" />
                        </FormGroup>
                        <FormGroup>
                            <label>Vistoria</label>
                            <input type="text" name="survey" placeholder="Vistoria" />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <ButtonControl type="button" onClick={() => VisualizarImpressao({form, owner, renterSelect})}>
                            Gerar Contrato
                        </ButtonControl>
                    </div>
                </form>

            </ContainerForm>
        </div>
    )
}

export default NewContract
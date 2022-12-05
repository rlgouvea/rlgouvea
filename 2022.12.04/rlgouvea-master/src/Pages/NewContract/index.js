import { useEffect, useState } from "react"
import { fetchInquilinos, fetchProperties, fetchProprietarios } from "../../Services/routes"
import Loading from "../../Assets/Components/Loader"
import VisualizarImpressao from "./contract"
import "./stylesNewContract.scss"
import {IoIosRemoveCircleOutline, IoIosAddCircleOutline} from "react-icons/io"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"

const NewContract = () => {
    const [owners, setOwners] = useState([])
    const [renters, setRenters] = useState([])
    const [renterSelect, setRenterSelect] = useState([])
    const [properties, setProperties] = useState([])
    const [propertieSelect, setPropertieSelect] = useState([])
    const [owner, setOwner] = useState()
    const [form, setForm] = useState({})
    const [loading, setLoading] = useState(false)
    const [spouse, setSpouse] = useState(false)
    const [guarantor, setGuarantor] = useState(false)

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
            setPropertieSelect(ownerSelect)                             
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
                    <button 
                    style={{
                        width: '11rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        margin: '1rem 0'
                    }}
                    type="button" 
                    onClick={() => setSpouse(!spouse)}
                    >
                        Adicionar conjuge  
                        {
                            !spouse ? <IoIosAddCircleOutline/> :
                            <IoIosRemoveCircleOutline/>
                        }
                    </button>
                    {
                        spouse &&
                        <>
                            <div className="formFlex">
                                <FormGroup>
                                    <label>Nome do Conjuge</label>
                                    <input onChange={handleEdit} type='text' name="spouseName" placeholder="Nome do conjuge" />
                                </FormGroup>
                                <FormGroup>
                                    <label>Profissão do Conjuge</label>
                                    <input onChange={handleEdit} type='text' name="spouseProfission" placeholder="Profissão do conjuge" />
                                </FormGroup>                        
                            </div>
                            < div className="formFlex">
                                <FormGroup>
                                    <label>RG do Conjuge</label>
                                    <input onChange={handleEdit} type='text' name="spouseRg" placeholder="RG do conjuge" />
                                </FormGroup>
                                <FormGroup>
                                    <label>CPF do Conjuge</label>
                                    <input onChange={handleEdit} type='text' name="spouseCpf" placeholder="CPF do conjuge" />
                                </FormGroup>
                                <FormGroup>
                                    <label>Nacionalidade do Conjuge</label>
                                    <input onChange={handleEdit} type='text' name="spouseNacionality" placeholder="Nacionalidade do conjuge" />
                                </FormGroup>
                            </div>
                        </>
                    }
                    <button 
                    style={{
                        width: '11rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-evenly',
                        border: 'none',
                        backgroundColor: 'transparent',
                        fontSize: '1.1rem',
                        cursor: 'pointer',
                        margin: '1rem 0'
                    }}
                    type="button" 
                    onClick={() => setGuarantor(!guarantor)}
                    >
                        Adicionar fiador  
                        {
                            !guarantor ? <IoIosAddCircleOutline/> :
                            <IoIosRemoveCircleOutline/>
                        }
                    </button>
                    {
                        guarantor &&
                        <div style={{flexDirection:'column'}} className="formFlex">
                            <FormGroup>
                                <label>Nome do fiador</label>
                                <input onChange={handleEdit} type='text' name="guarantor" placeholder="Fiador" />
                            </FormGroup>
                            <FormGroup>                                
                                <textarea onChange={handleEdit} rows='7' type='text' name="guarantorData" 
                                placeholder="FIADORA, BELTILDE MOTA DE ARAUJO, brasileira, professora, portadora do RG nº 324182 ITEP/RN e do CPF nº 201.209.744-87 casada no regime da comunhão parcial de bens na vigência da lei 6515/77 com ARIANGELO MEDEIROS DE ARAUJO, aposentado, portador do RG nº 361015 SSP/RN e do CPF nº 297.416.534-68 ambos residentes e domiciliados à Av Doutor Fernandes 185 - Bairro Centro – Jardim do Seridó/RN;" 
                                />
                            </FormGroup>
                        </div>
                    }
                    <div className="formFlex">
                        {/* <FormGroup>
                            <label>Nome do fiador</label>
                            <input onChange={handleEdit} type='text' name="guarantor" placeholder="Fiador" />
                        </FormGroup> */}
                        <FormGroup>
                            <label>Período do contrato</label>
                            <input onChange={handleEdit} type='text' name="deadline" placeholder="Período" />
                        </FormGroup>
                    </div>
                    <div className="formFlex">                        
                        <FormGroup>
                            <label>Início do contrato</label>
                            <input onChange={handleEdit} type="date" name="start" placeholder="Início" />
                        </FormGroup>
                        <FormGroup>
                            <label>Fim do contrato</label>
                            <input onChange={handleEdit} type="date" name="end" placeholder="Fim" />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Gás</label>
                            <input onChange={handleEdit} type="text" name="gas" placeholder="Gás" />
                        </FormGroup>
                        <FormGroup>
                            <label>Sabesp</label>
                            <input onChange={handleEdit} type="text" name="sabesp" placeholder="Sabesp" />
                        </FormGroup>
                        <FormGroup>
                            <label>IPTU</label>
                            <input onChange={handleEdit} type="text" name="iptu" placeholder="IPTU" />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>CPFL</label>
                            <input onChange={handleEdit} type="text" name="cpfl" placeholder="CPFL" />
                        </FormGroup>
                        <FormGroup>
                            <label>Chaves</label>
                            <input onChange={handleEdit} type="text" name="keys" placeholder="Chaves" />
                        </FormGroup>
                        <FormGroup>
                            <label>Vistoria</label>
                            <input onChange={handleEdit} type="text" name="survey" placeholder="Vistoria" />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Valor do Aluguel</label>
                            <input onChange={handleEdit} type="text" name="value" placeholder="Valor do aluguel em real e por extenso" />
                        </FormGroup>  
                        <FormGroup>
                            <label>Dia final para pagamento do aluguel</label>
                            <input onChange={handleEdit} type="text" name="paymentDeadline" placeholder="O pagamento do aluguel deve ser afetuado até dia..." />
                        </FormGroup>  
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Nome testemunha 1</label>
                            <input onChange={handleEdit} type='text' name="witnessOne" placeholder="Testemunha 1" />
                        </FormGroup>
                        <FormGroup>
                            <label>RG testemunha 1</label>
                            <input onChange={handleEdit} type='text' name="witnessOneRg" placeholder="RG testemunha 1" />
                        </FormGroup>
                        <FormGroup>
                            <label>CPF testemunha 1</label>
                            <input onChange={handleEdit} type='text' name="witnessOneCpf" placeholder="CPF testemunha 1" />
                        </FormGroup>                        
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Nome testemunha 2</label>
                            <input onChange={handleEdit} type='text' name="witnessTwo" placeholder="Testemunha 2" />
                        </FormGroup>
                        <FormGroup>
                            <label>RG testemunha 2</label>
                            <input onChange={handleEdit} type='text' name="witnessTwoRg" placeholder="RG testemunha 2" />
                        </FormGroup>
                        <FormGroup>
                            <label>CPF testemunha 2</label>
                            <input onChange={handleEdit} type='text' name="witnessTwoCpf" placeholder="CPF testemunha 2" />
                        </FormGroup>                        
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Descrição pagamento</label>
                            <textarea rows='5' onChange={handleEdit} type="text" name="descriptionValue" placeholder="Descrição do que está incluso no pagamento" style={{padding: 5}}/>
                        </FormGroup>                        
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Descrição do imóvel fiador</label>
                            <textarea rows='5' onChange={handleEdit} type="text" name="securedProperty" placeholder="Descrição do imóvel do fiador" style={{padding: 5}}/>
                        </FormGroup>                        
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Laudo de vistoria</label>
                            <textarea rows='5' onChange={handleEdit} type="text" name="survey" placeholder="Vistoria" style={{padding: 5}}/>
                        </FormGroup>                        
                    </div>
                    <div className="formFlex">
                        <ButtonControl type="button" onClick={() => VisualizarImpressao({form, owner, renterSelect, propertieSelect})}>
                            Gerar Contrato
                        </ButtonControl>
                    </div>
                </form>

            </ContainerForm>
        </div>
    )
}

export default NewContract
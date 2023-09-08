/* eslint-disable no-loop-func */
import { useEffect, useState, useContext } from "react"
import AlertPopup from "../../Assets/Components/AlertPopup"
import { ButtonControl, ContainerForm, FormGroup } from "../../Assets/Components/GlobalStyles"
import Loading from "../../Assets/Components/Loader"
import { createColection, createDocRelatory, fetchProperties, fetchProprietarios, fetchRelatories, fetchRelatory } from "../../Services/routes"
import "./stylesReports.scss"
import {Context} from '../../Private'

const Reports = () => {
    const { userRole } = useContext(Context);
    const [owners, setOwners] = useState([])
    const [properties, setProperties] = useState([])
    const [propertieSelect, setPropertieSelect] = useState([])
    const [relatories, setRelatories] = useState()
    const [findRelatory, setFindRelatory] = useState([])
    const [loading, setLoading] = useState(false)
    
    const [payerSelect, setPayerSelect] = useState("")
    const [total, setTotal] = useState(0)
    let controlProperties = []
    const [action, setAction] = useState()
    const [alert, setAlert] = useState(false)
    const [title, setTitle] = useState()
    const [status, setStatus] = useState()

    const [form, setForm] = useState({
        value:{
            value:"",
            error: false
        },
        owner:{
            value:"",
            error: false
        },
        propertie:{
            value:"",
            error: false
        },
        day:{
            value:"",
            error: false
        },
        month:{
            value:"",
            error: false
        },
        year:{
            value:"",
            error: false
        },
        description:{
            value:"",
            error: false
        },
        price:{
            value:"",
            error: false
        },
        payer:{
            value:"",
            error: false
        }
    })
    const [initialState, setInitialState] = useState({
        value:{
            value:"",
            error: false
        },
        owner:{
            value:"",
            error: false
        },
        propertie:{
            value:"",
            error: false
        },
        day:{
            value:"",
            error: false
        },
        month:{
            value:"",
            error: false
        },
        year:{
            value:"",
            error: false
        },
        description:{
            value:"",
            error: false
        },
        price:{
            value:"",
            error: false
        },
        payer:{
            value:"",
            error: false
        }
    })

    useEffect(()=>{
        const getOwners = async () => { 
            setLoading(true) 
            let controlOwners = ([])      
            setOwners([])
            const response = await fetchProprietarios()        
            response.docs.forEach(item =>{                               
                //setOwners(prevState => [...prevState, [item.data(), {id:item.id}]])                  
                let teste = [item.data()]
                teste[0].id = item.id
                controlOwners = controlOwners.concat(teste)                
            })                 
            setOwners(controlOwners)
            setLoading(false)            
        }           
        
        const getProperties = async () => {        
            setLoading(true)
            let controlPropertie = ([])
            setProperties([])
            const response = await fetchProperties()
            response.docs.forEach(item =>{                               
                //setProperties(prevState => [...prevState, [item.data(), {id:item.id}]])
                let teste = [item.data()]
                teste[0].id = item.id
                controlPropertie = controlPropertie.concat(teste)                
            })        
            setProperties(controlPropertie)
            setLoading(false)            
        }

        const getRelatories = async () => {        
            setLoading(true)
            let controlRelatories = ([])
            //setProperties([])
            const response = await fetchRelatories()
            response.docs.forEach(item =>{                               
                //setProperties(prevState => [...prevState, [item.data(), {id:item.id}]])
                let teste = [item.data()]                
                teste[0].id = item.id
                controlRelatories = controlRelatories.concat(teste)                
            })        
            setRelatories(controlRelatories)            
            setLoading(false)
        }

        getRelatories()
        getOwners()       
        getProperties()
    },[])
    
    const handleEdit = (e) => {
        const {name, value} = e.target

        if(name === "owner"){
            setPropertieSelect([])
            setForm({
                ...form,
                [name]:{
                    value,
                    error: false
                }
            })

            const ownerSelect = properties.filter(prop => prop.owner === value)            
              
            setPropertieSelect(ownerSelect)                         
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

    const handleSubmit = async (e) => {
        e.preventDefault()   
        setLoading(true)
        let value = 0
        let data = {}
        if(form.price.value){
            value = form.price.value.replace(",",".")

            data = {
                'serviço':form.description.value,
                'valor': parseFloat(value)
            }
        } else {
            data = {
                'serviço':form.description.value,
                'pagador': form.payer.value
            }
        }
        const item = {
            owner: form.owner.value,
            reference: form.month.value+-+form.year.value,
            date: form.day.value+-+form.month.value+-+form.year.value,
            propertie: form.propertie.value
        }
        

        const verificRelatory = relatories.filter(relatory => relatory.id === form.propertie.value)
        
        if(verificRelatory.length > 0){
            const response = await createColection(item, data)
            if(response.status === 200){
                console.log("deu certo")
                setForm(initialState)
                setPayerSelect("")
                setLoading(false)
                setStatus('success')
                setAlert(true)
                setTitle("Cadastrado com sucesso!")
            } else if(response.status === 400){
                console.log("Errou")
                setLoading(false)
            }
        } else{
            const response = await createDocRelatory(item, data)            
            if(response.status === 200){
                const response = await createColection(item, data)
                if(response.status === 200){
                    console.log("deu certo")
                    setForm(initialState)
                    setPayerSelect("")
                    setLoading(false)
                    setStatus('success')
                    setAlert(true)
                    setTitle("Cadastrado com sucesso!")
                } else if(response.status === 400){
                    console.log("Errou")
                    setLoading(false)
                }
            }
        }
        
    }
    
    const handleFind = async (e) => {
        e.preventDefault()
        setLoading(true)
        const filterProperties = properties.filter(prop => prop.owner === form.owner.value)        
        let controlRelatories = ([])
        let soma = 0
       // console.log(filterProperties)
        for(let x=0;x<filterProperties.length;x++){            
            const data = filterProperties[x].id+'/'+form.month.value+-+form.year.value            
            const response = await fetchRelatory(data)            
            if(response.status === 200){                   
                if(response.data.docs.length > 0){
                response.data.docs.forEach((item, index) =>{                                        
                    let teste = [item.data()]                                     
                    teste[0].day = item.id
                    teste[0].propertie = filterProperties[x].id
                    controlRelatories[x] = controlRelatories[x] ? controlRelatories[x].concat(teste) : teste
                    let valor = teste[0].valor ? teste[0].valor : 0
                    soma = soma + valor                    
                    controlProperties[teste[0].propertie]={...controlProperties[teste[0].propertie],[item.id]:teste[0]}                                        
                }) 
                } else {
                    controlRelatories[x] = [filterProperties[x]]
                }                 
            } else if(response.status === 400){
                console.log("Errou")
            }                                  
        }        
        setFindRelatory(controlRelatories)       
        setTotal(soma.toFixed(2)) 
        setLoading(false)                     
    }

    const setListProperties = (propertie) => {          
        if(propertie[0].valor){
        const propertieFilter = properties.filter(prop=>prop.codigo === propertie[0].propertie)  
        let totalProp = 0
        for(let x=0; x<propertie.length; x++){
            if(propertie[x].valor){
                totalProp = totalProp + propertie[x].valor
            }
        }
        totalProp = totalProp.toFixed(2)        
        return(    
            <>         
                <li className="itemList">
                    <span className="listHead"> {propertieFilter[0].renter}</span>
                </li>
                <li className="itemList">                                    
                    <span >Cod: {propertieFilter[0].codigo} - {propertieFilter[0].district}, {propertieFilter[0].number} - {propertieFilter[0].state} </span>                 
                </li> 
                <li className="itemList">
                    <p>Dia</p>
                    <p>Serviço</p>
                    <p>Valor</p>
                </li>
                {
                    propertie.map(prop => (
                        <li className="itemList">
                            {/* <p>{propertie.propertie}</p> */}
                            <p>{prop.day}</p>
                            <p>{prop.serviço}</p>
                            <p>
                                {
                                    prop.valor ? prop.valor.toFixed(2).replace(".",",") : 
                                    prop.pagador
                                }
                            </p>
                        </li> 
                    ))                    
                } 
                <li className="listTotal">
                    <p style={{margin: 0}}>Total</p>                            
                    <p style={{margin: 0}}>{totalProp.replace(".",",")}</p>
                </li> 
            </>                                                                              
        )
        } else{
            return(
                <>
                    <li className="itemList">
                        <span className="listHead"> {propertie[0].renter}</span>
                    </li>
                    <li className="itemList">                                    
                        <span >Cód:{propertie[0].codigo}  - {propertie[0].district}, {propertie[0].number} - {propertie[0].state}</span>                 
                    </li>
                    <li className="itemList">                                    
                    <span >Nenhuma alteração</span>                 
                    </li>
                </>
            )
        }
    }

    
    return(
        <div className="containerReports">
            {
                loading &&
                <Loading/>
            }
            {
                alert &&
                <AlertPopup
                view={alert}
                setView={setAlert}
                title={title} 
                status={status}           
                />  
            }    
            <div className="formFlex">
                {(userRole ===   'admin' || userRole === 'atendente') &&
                    <ButtonControl onClick={()=>setAction('register')} >Registrar</ButtonControl>
                }
                <ButtonControl onClick={()=>setAction('search')} >Consultar</ButtonControl>
            </div>
            {
                action === 'register' &&                
                <ContainerForm style={{width:"95%", marginTop:'2rem'}}>
                    <form onSubmit={handleSubmit}>
                        <div className="formFlex">
                            <FormGroup>
                                <label>Selecione o proprietário</label>
                                <select name="owner" onChange={handleEdit}>
                                    <option selected disabled>Selecione o proprietário</option>
                                    {
                                        owners.length> 0 &&                
                                        owners.map((owner, index)=>(
                                            <option key={index} value={owner.name}>{owner.name}</option>
                                        ))
                                    }
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <label>Selecione o imóvel</label>
                                <select name="propertie" onChange={handleEdit}>
                                    <option selected disabled>Selecione o imóvel</option>
                                    {
                                        propertieSelect.length> 0 &&                
                                        propertieSelect.map((propertie, index)=>(
                                            <option key={index} value={propertie.codigo}>
                                                Cód:{propertie.codigo} - {propertie.district} - {propertie.street}, {propertie.number}
                                            </option>
                                        ))
                                    }
                                </select>
                            </FormGroup>

                        </div>
                        <div className="formFlex">
                            <FormGroup>
                                <label>Selecione o dia</label>
                                <select value={form.day.value} name="day" onChange={handleEdit}>
                                    <option value="" selected disabled>Selecione</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>
                                    <option value="8">8</option>
                                    <option value="9">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                    <option value="18">18</option>
                                    <option value="19">19</option>
                                    <option value="20">20</option>
                                    <option value="21">21</option>
                                    <option value="22">22</option>
                                    <option value="23">23</option>
                                    <option value="24">24</option>
                                    <option value="25">25</option>
                                    <option value="26">26</option>
                                    <option value="27">27</option>
                                    <option value="28">28</option>
                                    <option value="29">29</option>
                                    <option value="30">30</option>
                                    <option value="31">31</option>
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <label>Selecione o mês</label>
                                <select value={form.month.value} name="month" onChange={handleEdit}>
                                    <option selected value="" disabled>Selecione</option>
                                    <option value="01">Janeiro</option>
                                    <option value="02">Fevereiro</option>
                                    <option value="03">Março</option>
                                    <option value="04">Abril</option>
                                    <option value="05">Maio</option>
                                    <option value="06">Junho</option>
                                    <option value="07">Julho</option>
                                    <option value="08">Agosto</option>
                                    <option value="09">Setembro</option>
                                    <option value="10">Outubro</option>
                                    <option value="11">Novembro</option>
                                    <option value="12">Dezembro</option>
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <label>Selecione o ano</label>
                                <select value={form.year.value} name="year" onChange={handleEdit}>
                                    <option selected value="" disabled>Selecione</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2029</option>
                                    <option value="2030">2030</option>
                                    <option value="2031">2031</option>
                                    <option value="2032">2032</option>
                                    <option value="2033">2033</option>
                                    <option value="2034">2034</option>
                                    <option value="2035">2035</option>
                                </select>
                            </FormGroup>
                        </div>
                        <div className="formFlex" >
                            <FormGroup>
                                <label>Descreva a alteração</label>
                                <input value={form.description.value} type="text" name="description" placeholder="Alteração" onChange={handleEdit} />
                            </FormGroup> 
                            {
                                payerSelect === "" &&
                                <FormGroup>                            
                                    <div className="formFlex">                            
                                        <input
                                            type="radio"                            
                                            onChange={()=>setPayerSelect('imob')}
                                            style={{
                                            width:'10px',
                                            margin:0,                          
                                            padding:5, 
                                            cursor: 'pointer'
                                            }}
                                        />
                                        <p style={{width:"50%"}}>Imobiliária</p>
                                    </div>
                                    <div className="formFlex">                            
                                        <input
                                            type="radio"                            
                                            onChange={()=>setPayerSelect('other')}
                                            style={{
                                            width:'10px',
                                            margin:0,                          
                                            padding:5, 
                                            cursor: 'pointer'
                                            }}
                                        />
                                        <p style={{width:"50%"}}>Outro pagador</p>
                                    </div>
                                </FormGroup>                       
                            }
                            {
                                payerSelect === 'imob' &&
                                <FormGroup>
                                    <label>Valor</label>
                                    <input type="text" name="price" placeholder="Valor" onChange={handleEdit} />
                                </FormGroup>
                            }
                            {
                                payerSelect === 'other' &&                            
                                <FormGroup>
                                    <label>Pagador</label>
                                    <input type="text" name="payer" placeholder="Pagador" onChange={handleEdit} />
                                </FormGroup>
                            }
                        </div> 
                        <div className="formFlex">
                            <ButtonControl type="submit" >Salvar</ButtonControl>                    
                        </div>                   
                    </form>
                </ContainerForm>
            }
            {
                action === 'search' &&
                <ContainerForm style={{width: '95%', marginTop:'2rem'}}>
                    <form onSubmit={handleFind}>
                        <div className="formFlex">
                            <FormGroup>
                                <label>Selecione o proprietário</label>
                                <select name="owner" onChange={handleEdit}>
                                    <option value="" selected disabled>Selecione o proprietário</option>
                                    {
                                        owners.length> 0 &&                
                                        owners.map((owner, index)=>(
                                            <option key={index} value={owner.name}>{owner.name}</option>
                                        ))
                                    }
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <label>Selecione o mês</label>
                                <select name="month" onChange={handleEdit}>
                                    <option selected value="" disabled>Selecione</option>
                                    <option value="01">Janeiro</option>
                                    <option value="02">Fevereiro</option>
                                    <option value="03">Março</option>
                                    <option value="04">Abril</option>
                                    <option value="05">Maio</option>
                                    <option value="06">Junho</option>
                                    <option value="07">Julho</option>
                                    <option value="08">Agosto</option>
                                    <option value="09">Setembro</option>
                                    <option value="10">Outubro</option>
                                    <option value="11">Novembro</option>
                                    <option value="12">Dezembro</option>
                                </select>
                            </FormGroup>
                            <FormGroup>
                                <label>Selecione o ano</label>
                                <select name="year" onChange={handleEdit}>
                                    <option selected value="" disabled>Selecione</option>
                                    <option value="2022">2022</option>
                                    <option value="2023">2023</option>
                                    <option value="2024">2024</option>
                                    <option value="2025">2025</option>
                                    <option value="2026">2026</option>
                                    <option value="2027">2027</option>
                                    <option value="2028">2029</option>
                                    <option value="2030">2030</option>
                                    <option value="2031">2031</option>
                                    <option value="2032">2032</option>
                                    <option value="2033">2033</option>
                                    <option value="2034">2034</option>
                                    <option value="2035">2035</option>
                                </select>
                            </FormGroup>
                        </div>
                        <div className="formFlex">                        
                            <ButtonControl type="submit" >Buscar</ButtonControl>
                        </div>
                    </form>
                </ContainerForm>            
            }
            {
                findRelatory && 
                <ul className="listGeneral">
                    {
                        findRelatory.map(propertie => (                            
                            <ul className="list">
                                {setListProperties(propertie)}                           
                            </ul>       
                        )) 
                    } 
                    {
                        total > 0 && 
                        <li className="listTotal">
                            <p>Total</p>                            
                            <p>{total.replace(".",",")}</p>
                        </li> 
                    }
                </ul>                                      
            }            
        </div>
    )
}

export default Reports
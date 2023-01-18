import { useEffect, useState } from "react"
import { ButtonControl, ContainerForm, FormGroup } from "../../../Assets/Components/GlobalStyles"
import { fetchInquilinos, fetchProprietarios } from "../../../Services/routes"
import './formEditStyle.scss'
import Loading from "../../../Assets/Components/Loader"

const FormEditPropertie = ({propertie, owners, renters, handle, view, setView, handleDelete}) => {
    const [ownerEditRegister, setOwnerEditRegister] = useState(propertie.owner)
    const [loading, setLoading] = useState(false)
    
    const [form, setForm] = useState({
        id:{
            value: propertie.codigo,
            error: false
        },
        codigo:{
            value: propertie.codigo,
            error: false
        },
        city:{
            value: propertie.city,
            error: false
        },
        state:{
            value: propertie.state,
            error: false
        },
        district:{
            value: propertie.district,
            error: false
        },
        street:{
            value: propertie.street,
            error: false
        },
        number:{
            value: propertie.number,
            error: false
        },
        zip_code:{
            value: propertie.zip_code,
            error: false
        },
        owner:{
            value: propertie.owner,
            error: false
        },
        renter:{
            value: propertie.renter,
            error: false
        },
        status:{
            value: propertie.status,
            error: false
        }
    })
    
    // useEffect(()=>{
    //     getOwners()
    //     getRenters()
    // },[])

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

    const handleOwner = (e) => {
        setOwnerEditRegister([...ownerEditRegister, e.target.value])        
    }

    const removeProp = (owner) => {
        const ownerFilter = ownerEditRegister.filter(remov => remov !== owner)
        setOwnerEditRegister(ownerFilter)
    }

    const handleSubmit = () => {       
        handle(form,ownerEditRegister)
    }

    return(
        <div className="containerEdit">
            <div className="wrapperEdit">                
                <ContainerForm >
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
                                    ownerEditRegister &&
                                    ownerEditRegister.map(owner=>(
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
                            {/* <FormGroup>
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
                            </FormGroup> */}
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
                    </form>            
                    <div className="formFlex">
                        <ButtonControl onClick={()=>handleSubmit()}>Salvar</ButtonControl> 
                        <ButtonControl onClick={()=>handleDelete(form)}>Deletar</ButtonControl>   
                        <ButtonControl onClick={()=>setView(!view)}>Cancelar</ButtonControl>
                    </div>
                </ContainerForm>
            </div>
        </div>
    )
}

export default FormEditPropertie
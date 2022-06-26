import { useEffect, useState } from "react"
import { changeRenter, deleteProp } from "../../../Services/routes"
import { ButtonControl, FormGroup } from "../GlobalStyles"
import AlertDelete from "../AlertDelete"
import Alert from "../Alert"
import "./styleFormEdit.scss"


const FormEdit = ({view, setView, item, handle, handleDelete}) => {    
    const [renterControl, setRenterControl] = useState()
    const [alertDel, setAlertDel] = useState(false)
    const [alert, setAlert] = useState(false)
    const [title, setTitle] = useState()
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

    useEffect (()=>{
        setForm({
            name:{
                value:item.name,
                error: false
            },
            phone:{
                value:item.phone,
                error: false
            },
            phone2:{
                value:item.phone2,
                error: false
            },
            phone3:{
                value:item.phone3,
                error: false
            },
            maritalStatus:{
                value:item.maritalStatus,
                error: false
            },
            profession:{
                value:item.profession,
                error: false
            },
            nationality:{
                value:item.nationality,
                error: false
            },
            birth:{
                value:item.birth,
                error: false
            },
            email:{
                value:item.email,
                error: false
            },
            cpf:{
                value:item.cpf,
                error: false
            },
            rg:{
                value:item.rg,
                error: false
            },
        })
    },[])
    
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

    const handleSubmit = async (e) => {               
        e.preventDefault()       
        const data = {
            id: item.id,
            name: form.name.value,
            phone: form.phone.value,
            phone2: form.phone2.value,
            phone3: form.phone3.value,
            maritalStatus:form.maritalStatus.value,
            profession:form.profession.value,
            nationality:form.nationality.value,
            birth:form.birth.value,
            email: form.email.value,
            cpf: form.cpf.value,  
            rg:form.rg.value,
        }
        const response = await changeRenter(data)        
        if(response.status === 200){
            setTitle("Atualizado com sucesso!")  
            setAlert(true)                      
        } 
    }

    const handleAlertDel = () => {
        setRenterControl(item)
        setTitle("Tem certeza que deseja excluir esse proprietário?")
        setAlertDel(true)
    }

    
    return(
        <div className="containerEdit">
            <div className="wrapperEdit"> 
                {
                    alertDel &&
                    <AlertDelete
                    title={title}
                    view={view}
                    setView={setView}
                    handle={handleDelete}
                    item={renterControl}
                    />
                } 
                {
                    alert && 
                    <Alert title={title} view={view} setView={setView} handle={handle} />
                }
                <form>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Nome</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nome"
                                value={form.name.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telefone</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Telefone"
                                value={form.phone.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telefone 2</label>
                            <input
                                type="text"
                                name="phone2"
                                placeholder="Telefone"
                                value={form.phone2.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Telefone 3</label>
                            <input
                                type="text"
                                name="phone3"
                                placeholder="Telefone"
                                value={form.phone3.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Estado Civil</label>
                            <input
                                type="text"
                                name="maritalStatus"
                                placeholder="Estado Civil"
                                value={form.maritalStatus.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Profissão</label>
                            <input
                                type="text"
                                name="profession"
                                placeholder="Profissão"
                                value={form.profession.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Nacionalidade</label>
                            <input
                                type="text"
                                name="nationality"
                                placeholder="Nacionalidade"
                                value={form.nationality.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Nascimento</label>
                            <input
                                type="text"
                                name="birth"
                                placeholder="Nascimento"
                                value={form.birth.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={form.email.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </div>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Cpf</label>
                            <input
                                type="text"
                                name="cpf"
                                placeholder="Cpf"
                                value={form.cpf.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>RG</label>
                            <input
                                type="text"
                                name="rg"
                                placeholder="RG"
                                value={form.rg.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </div>
                </form> 
                <div className="controls">
                    <ButtonControl                        
                    onClick={handleSubmit}                        
                    >
                        Salvar
                    </ButtonControl>
                    <ButtonControl 
                    onClick={()=>setView(!view)
                    }                        
                    >
                        Cancelar
                    </ButtonControl>
                    <ButtonControl 
                    onClick={()=>handleAlertDel()
                    }                        
                    >
                        Deletar
                    </ButtonControl>
                </div>
            </div>
        </div>
    )
}

export default FormEdit
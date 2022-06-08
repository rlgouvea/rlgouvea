import { useState } from "react"
import { changeOwner, deleteProp } from "../../../Services/routes"
import { ButtonControl, FormGroup } from "../GlobalStyles"
import AlertDelete from "../AlertDelete"
import Alert from "../Alert"
import "./styleFormEdit.scss"


const FormEdit = ({view, setView, item, handle}) => {    
    const [ownerControl, setOwnerControl] = useState()
    const [alertDel, setAlertDel] = useState(false)
    const [alert, setAlert] = useState(false)
    const [title, setTitle] = useState()
    const [form, setForm] = useState({
        name:{
            value:item[0].name
        },
        email:{
            value:item[0].email
        },
        phone:{
            value:item[0].phone
        },
        cpf:{
            value:item[0].cpf
        }
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

    const handleSubmit = async (e) => {               
        e.preventDefault()       
        const data = {
            id: item[1].id,
            name: form.name.value,
            email: form.email.value,
            phone: form.phone.value,
            cpf: form.cpf.value
        }
        const response = await changeOwner(data)        
        if(response.status === 200){
            setTitle("Atualizado com sucesso!")  
            setAlert(true)                      
        } 
    }

    const handleAlertDel = () => {
        setOwnerControl(item)
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
                    view={alertDel}
                    setView={setAlertDel}
                    handle={handle}
                    item={ownerControl}
                    />
                } 
                {
                    alert && 
                    <Alert title={title} view={view} setView={setView} handle={handle} />
                }
                <form>
                    <FormGroup>
                        <label>Nome</label>
                        <input type='text' name="name" value={form.name.value} onChange={handleChange} />
                    </FormGroup>    
                    <FormGroup>
                        <label>Email</label>
                        <input type='email' name="email" value={form.email.value} onChange={handleChange} />
                    </FormGroup>
                    <FormGroup>
                        <label>Telefone</label>
                        <input type='text' name="phone" value={form.phone.value} onChange={handleChange} />                        
                    </FormGroup>
                    <FormGroup>
                        <label>CPF</label>
                        <input type='text' name="cpf" value={form.cpf.value} onChange={handleChange} /> 
                    </FormGroup>
                             
                    
                </form> 
                <div className="controls">
                    <ButtonControl                        
                    onClick={handleSubmit}                        
                    >
                        Ok
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
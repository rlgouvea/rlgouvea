import { useState } from "react"
import { changeOwner } from "../../../Services/routes"
import { ButtonControl, FormGroup } from "../GlobalStyles"
import "./styleFormEdit.scss"


const FormEdit = ({view, setView, handle, item}) => {
    
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
            alert("Atualizado com sucesso!")
            setView(!view)
            handle()
        } 
    }
    return(
        <div className="containerAlert">
            <div className="wrapperAlert">  
                <form onSubmit={handleSubmit}>
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
                             
                    <div className="controls">
                        <ButtonControl 
                        //onClick={()=>handle(item)}
                        type="submit"                        
                        >
                            Ok
                        </ButtonControl>
                        <ButtonControl 
                        onClick={()=>setView(!view)
                        }                        
                        >
                            Cancelar
                        </ButtonControl>
                    </div>
                </form> 
            </div>
        </div>
    )
}

export default FormEdit
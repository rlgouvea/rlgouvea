import { useEffect, useState } from "react"
import { changeUser } from "../../../Services/routes"
import { ButtonControl, FormGroup } from "../GlobalStyles"
import AlertDelete from "../AlertDelete"
import Alert from "../Alert"
import "./styleFormEdit.scss"


const FormEditAdmin = ({view, setView, item, handle, handleDelete}) => {   
    console.log(item) 
    const [userControl, setUserControl] = useState()
    const [alertDel, setAlertDel] = useState(false)
    const [alert, setAlert] = useState(false)
    const [title, setTitle] = useState()
    const [form,setForm] = useState({
        login:{
            value:"",
            error: false
        },
        senha:{
            value:"",
            error: false
        },
    })

    useEffect (()=>{
        setForm({
            login:{
                value:item.login,
                error: false
            },
            senha:{
                value:item.senha,
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
            login: form.login.value,
            senha: form.senha.value,
        }
        const response = await changeUser(data)        
        if(response.status === 200){
            setTitle("Atualizado com sucesso!")  
            setAlert(true)                      
        } 
    }

    const handleAlertDel = () => {
        setUserControl(item)
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
                    item={userControl}
                    />
                } 
                {
                    alert && 
                    <Alert title={title} view={view} setView={setView} handle={handle} />
                }
                <form>
                    <div className="formFlex">
                        <FormGroup>
                            <label>Login</label>
                            <input
                                type="text"
                                name="login"
                                placeholder="Login"
                                value={form.login.value}
                                onChange={handleChange}
                            />
                        </FormGroup>
                        <FormGroup>
                            <label>Senha</label>
                            <input
                                type="text"
                                name="senha"
                                placeholder="Senha"
                                value={form.senha.value}
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
                    onClick={()=>handleDelete(item)
                    }                        
                    >
                        Deletar
                    </ButtonControl>
                </div>
            </div>
        </div>
    )
}

export default FormEditAdmin
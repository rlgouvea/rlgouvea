import { useState } from "react"
import { deleteProp } from "../../../Services/routes"
import Alert from "../Alert"
import { ButtonControl } from "../GlobalStyles"
import "./styleAlertDel.scss"


const AlertDelete = ({title, handle, view, setView, item}) => {
    const [alert, setAlert] = useState(false)
    const [titleAlert, setTitleAlert] = useState()


    const handleDelete = async () => {                
        const response = await deleteProp(item[1].id)        
        if(response.status === 200){
            setTitleAlert("Deletado com sucesso!")  
            setAlert(true)                        
        }
    }
    return(
        <div className="containerAlert">
            <div className="wrapperAlertDel">
                {
                    alert &&
                    <Alert
                        title={titleAlert}
                        handle={handle}
                    />
                }
                <h3>{title}</h3>
                <div className="controlsDelete">
                    <ButtonControl 
                    onClick={()=>handleDelete()}                    
                    >
                        Ok
                    </ButtonControl>
                    <ButtonControl 
                    onClick={()=>setView(!view)}                                        
                    >
                        Cancelar
                    </ButtonControl>
                </div>
            </div>
        </div>
    )
}

export default AlertDelete
import { useState } from "react"
import Alert from "../Alert"
import { ButtonControl } from "../GlobalStyles"
import "./styleAlertDel.scss"


const AlertDelete = ({title, handle, view, setView, item}) => {
    const [alert, setAlert] = useState(false)
    const [titleAlert, setTitleAlert] = useState()
    
    return(
        <div className="containerAlert">
            <div className="wrapperAlertDel">
                {/* {
                    alert &&
                    <Alert
                        title={titleAlert}
                        handle={handle}
                        view={view}
                        setView={setView}
                    />
                } */}
                <h3>{title}</h3>
                <div className="controlsDelete">
                    <ButtonControl 
                    onClick={()=>handle()}                    
                    >
                        Sim
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
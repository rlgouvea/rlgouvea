import { ButtonControl } from "../GlobalStyles"
import "./styleAlert.scss"


const Alert = ({title,view, setView, handle}) => {
    return(        
        <div className="wrapperAlert">
            <h3>{title}</h3>
            
            <ButtonControl 
            onClick={()=>handle()}            
            >
                Ok
            </ButtonControl>                    
            
        </div>       
    )
}

export default Alert
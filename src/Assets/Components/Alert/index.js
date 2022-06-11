import { ButtonControl } from "../GlobalStyles"
import "./styleAlert.scss"


const Alert = ({title,view, setView, handle}) => {
    window.scrollTo(0, 10)
    const handleSubmit = () => {
        handle()
        setView(!view)
    }
    return(        
        <div className="wrapperAlert">
            <h3>{title}</h3>
            
            <ButtonControl 
            onClick={()=>handleSubmit()}            
            >
                Ok
            </ButtonControl>                    
            
        </div>       
    )
}

export default Alert
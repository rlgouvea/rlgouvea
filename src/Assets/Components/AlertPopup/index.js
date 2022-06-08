import { useEffect } from "react"
import "./styleAlertPopup.scss"


const AlertPopup = ({title,view, setView}) => {
    useEffect(()=>{
        setTimeout(()=>{
            setView(!view)
        },3000)
    },[])
    return(        
        <div className="wrapperAlertPopup">
            <p>{title}</p>                                                       
        </div>       
    )
}

export default AlertPopup
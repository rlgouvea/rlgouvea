import { useEffect } from "react"
import "./styleAlertPopup.scss"


const AlertPopup = ({title,view, setView, handle}) => {
    useEffect(()=>{
        setTimeout(()=>{
            if(handle){
                handle()
            }
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
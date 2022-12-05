import { useEffect } from "react"
import "./styleAlertPopup.scss"


const AlertPopup = ({title,view, setView, handle, status}) => {
    useEffect(()=>{
        setTimeout(()=>{
            if(handle){
                handle()
            }
            setView(!view)
        },3000)
    },[])
    return(        
        <div className="wrapperAlertPopup" 
        style={{
            backgroundColor: status === 'success' ? 'rgb(35, 182, 16)' :
            'red'
        }}
        >
            <p>{title}</p>                                                       
        </div>       
    )
}

export default AlertPopup
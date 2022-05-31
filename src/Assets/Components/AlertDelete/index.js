import { ButtonControl } from "../GlobalStyles"
import "./styleAlertDel.scss"


const AlertDelete = ({title, handle, view, setView, item}) => {
    return(
        <div className="containerAlert">
            <div className="wrapperAlert">
                <h3>{title}</h3>
                <div className="controls">
                    <ButtonControl 
                    onClick={()=>handle(item)}
                    style={{
                        position: 'absolute',
                        bottom: '1px',
                        left: '20%',
                        margin: '0 10px',
                    }}
                    >
                        Ok
                    </ButtonControl>
                    <ButtonControl 
                    onClick={()=>setView(!view)
                    }
                    style={{
                        position: 'absolute',
                        bottom: '1px',
                        margin: '0 10px',
                        right: '20%',
                    }}
                    >
                        Cancelar
                    </ButtonControl>
                </div>
            </div>
        </div>
    )
}

export default AlertDelete
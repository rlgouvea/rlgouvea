import "./stylesMenu.scss"
import {useNavigate} from 'react-router-dom'

const Menu = ({open, setOpen}) => {
    const navigate = useNavigate()
    return(
        <div onClick={()=>setOpen(false)} className="containerMenu">
            <div className="wrapperMenu">
                <ul>
                    <li onClick={() => navigate('/')}>                    
                        Início                    
                    </li>
                    <li onClick={() => navigate('/renters')}>                    
                        Inquilinos                    
                    </li>
                    <li onClick={() => navigate('/owners')}>                    
                        Proprietários                    
                    </li>
                    <li onClick={() => navigate('/properties')}>                    
                        Imóveis                    
                    </li>
                    <li onClick={() => navigate('/newContract')}>                    
                        Gerar Contrato                    
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Menu
import "./stylesMenu.scss"
import {useNavigate} from 'react-router-dom'

// importei react, firebase/auth e FirebaseConfig
import { useState } from 'react'
import { 
    signOut,
} from 'firebase/auth'
import { auth } from '../../../Configs/FirebaseConfig'

const Menu = ({open, setOpen}) => {

    // adicionei user e userDetail
    const [user, setUser] = useState(false)
    const [userDetail, setUserDetail] = useState({})

    const navigate = useNavigate()

    // adicionei função fazerLogout
    async function fazerLogout(){
        await signOut(auth)
        setUser(false)
        setUserDetail({})
    }
    
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
                    <li onClick={() => navigate('/reports')}>                    
                        Relatórios                    
                    </li>
                    <li onClick={() => navigate('/survey')}>                    
                        Vistorias                    
                    </li>
                    <li onClick={() => fazerLogout()}>                    
                        Sair                    
                    </li>
                    {/* <li onClick={() => navigate('/newContract')}>                    
                        Gerar Contrato                    
                    </li> */}
                </ul>
            </div>
        </div>
    )
}

export default Menu
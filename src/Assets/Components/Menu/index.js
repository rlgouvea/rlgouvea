import "./stylesMenu.scss"
import {useNavigate} from 'react-router-dom'

// importei react, firebase/auth e FirebaseConfig
import { useState, useContext } from 'react'
import { 
    signOut,
} from 'firebase/auth'
import { auth } from '../../../Configs/FirebaseConfig'
import {Context} from '../../../Private'

const Menu = ({open, setOpen}) => {
    const { userRole } = useContext(Context);
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
                    <li onClick={() => navigate('/teste')}>                    
                        Teste                    
                    </li>
                    {userRole === 'admin' &&
                        <li onClick={() => navigate('/admin')}>                    
                            Gerenciar Usuários                    
                        </li>
                    }
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
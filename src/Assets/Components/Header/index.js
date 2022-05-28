import './styleHeader.scss'
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    return(
        <div className="header">
            <h3>RLgouvea</h3>
            <ul>
                <li onClick={() => navigate('/')}>Home</li>
                <li onClick={() => navigate()}>Clientes</li>
                <li onClick={() => navigate('/owners')}>Proprietários</li>
                <li onClick={() => navigate()}>Imóveis</li>
            </ul>
        </div>
    )
}

export default Header
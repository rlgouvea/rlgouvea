import './styleHeader.scss'
import {useNavigate} from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
    return(
        <div className="header">
            <h3>R.L.Gouvea</h3>
            <ul>
                <li onClick={() => navigate('/')}>Home</li>
                <li onClick={() => navigate('/renters')}>Inquilinos</li>
                <li onClick={() => navigate('/owners')}>Proprietários</li>
                <li onClick={() => navigate('/properties')}>Imóveis</li>
            </ul>
        </div>
    )
}

export default Header
import './styleHeader.scss'
import {useNavigate} from 'react-router-dom'
import Menu from "../Menu"
import {FaWarehouse} from "react-icons/fa"
import { useState } from 'react'

const Header = () => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false)
    return(
        <div className="header">
            <h3 onClick={() => navigate('/')}>R.L.Gouvea</h3>
            {/* <ul>
                <li onClick={() => navigate('/')}>Home</li>
                <li onClick={() => navigate('/renters')}>Inquilinos</li>
                <li onClick={() => navigate('/owners')}>Proprietários</li>
                <li onClick={() => navigate('/properties')}>Imóveis</li>
            </ul> */}
            <FaWarehouse 
            style={{
                cursor: 'pointer'
            }}
            size='2rem' 
            onClick={()=>setOpen(!open)}
            />
            {
                open &&
                <Menu open={open} setOpen={setOpen} />
            }
        </div>
    )
}

export default Header
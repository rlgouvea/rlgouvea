import './styleTemplate.scss'
import Header from '../Components/Header'
import Footer from '../Components/Footer'


const Template = ({children}) => {
    return(
        <div className='conteinerDefault'>
            <Header/>
            <div className='children'>
                {children}
            </div>
            <Footer/>
        </div>
    )
}

export default Template
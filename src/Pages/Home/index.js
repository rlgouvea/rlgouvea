import './styleHome.scss'
import ReactTypingEffect from 'react-typing-effect'

export const Home = () => {
    return(
        <div className="containerHome">
            <h1>
            <ReactTypingEffect 
            speed={'200'} 
            eraseSpeed={'100'}
            eraseDelay={'400'}
            typingDelay={'300'}
            text={["R.L.GOUVEA","A SUA MELHOR IMOBILIÁRIA!"]} 
            /> 
            </h1>
        </div>
    )
}

export default Home
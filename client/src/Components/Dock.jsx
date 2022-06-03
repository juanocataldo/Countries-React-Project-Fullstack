import '../Styles/dock.css'
import Logo from '../Assets/logo.png'

export function Dock(){
    return <div className='visual'>
        <div className="dock">
            <div className="logo">
                <img src={Logo} alt="" />
            </div>
        </div>
    </div>
}
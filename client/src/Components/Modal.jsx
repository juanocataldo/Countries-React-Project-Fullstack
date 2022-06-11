import ok from '../Assets/ok.png'
import '../Styles/modal.css'

export function Modal({show, onClose}){

    if(!show)
        return null

    
    function loadModal(){
        const modal = document.getElementById('modal')
        modal.style.opacity = "1"
    }

    return <div className='modal' id='modal' onLoad={loadModal} >
        <div className="modal-content">
            <div className="modal-header">
                <div className="modal-title">
                    <span>Activity saved successfully</span>
                    <img  src={ok} alt="ok-icon" />
                </div>
                <div className="modal-body">
                    <h5>You now can see the activity in the filters of the home section.</h5>
                </div>
                <div className="modal-footer">
                    <button onClick={()=> onClose()}>Close</button>
                </div>
                
            </div>
        </div>
    </div>
}
import { NavLink } from "react-router-dom";
import '../Styles/landing.css'

export function Landing() {
    return <div className="wallpaper">
        <div className="landing">
            <h1 id=''>Welcome to Activity Manager</h1>
            
            <div className="youWIll">
                <div class="Iam">
                    <p>You will</p>
                    <b>
                        <div class="innerIam">
                            find countries<br />
                            read countries details<br />
                            create activities in countries<br />
                            filter by activities<br />
                            learn something
                        </div>
                    </b>
                </div>
            </div>
            <p style={{marginTop:"30px"}}>To enter, please click <NavLink className='landHome' to='/home'> here</NavLink></p>

        </div>
    </div>
}
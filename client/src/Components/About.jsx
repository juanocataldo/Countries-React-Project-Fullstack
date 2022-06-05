import '../Styles/about.css'
import github from '../Assets/github.png'
import linkedin from '../Assets/linkedin.png'
import instagram from '../Assets/instagram.png'

export function About() {
    return <div>
        <div className="visual">





            <div className="filter">
                <div className="page-dock">
                <h1 className='title'>About</h1>
                </div>
            </div>


            <div className="countrySpace">
                <div className="countryContainer">
                    <span style={{ padding: "20px", color: "white" }}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Explicabo dolorem recusandae, maxime necessitatibus natus minus tenetur id aperiam expedita voluptatibus, sint laboriosam atque maiores consequatur adipisci aliquam magni ipsa unde!</span>
                    <div className="filter">


                    </div>
                </div>
            </div>

            <div className="filter">
                <div className="filter-dock">
                    <span>Contact</span>

                </div>
                <div className="inner-about">
                    <div className="social-row">

                        <a href="https://github.com/juanocataldo?tab=repositories">
                            <img src={github} alt="github-icon" className='social-media' />
                        </a>
                    
                        <a href="https://www.linkedin.com/in/juan-manuel-cataldo-pavan-a68a9720">
                            <img src={linkedin} alt="linkedin-icon" className='social-media' />
                        </a>
                        
                        <a href="https://instagram.com/juanocataldo">
                            <img src={instagram} alt="instagram-icon" className='social-media' />
                        </a>
                    </div>
                </div>

            </div>



        </div>
    </div>
}
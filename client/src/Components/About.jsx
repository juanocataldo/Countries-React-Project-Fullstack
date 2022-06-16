import '../styles/about.css'
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
                <div className="aboutContainer">
                    <span style={{ padding: "20px", color: "hsl(0, 0%, 78%)" }}>This app was built with the next technologies: 
                    <br />Frontend: <br />
                    <ul>
                        <li>React / Redux</li>
                        <li>HTML + CSS (no external frameworks like bootstrap were allowed)</li>                        
                    </ul> 
                    Backend: <br />
                    <ul>
                        <li>Node / ExpressJS</li>
                        <li>Postgres</li>
                        <li>Sequelize</li>
                    </ul>
                    
                    This was an individual final project of the Henry's bootcamp.                    
                    The tematic is about creating activities in countries, using search filters and saving all the changes in the database. <br />
                    </span>
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
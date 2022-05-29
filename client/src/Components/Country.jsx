import '../styles/country.css'

export function Country({name, flag, continent}){
    return <div className="country">
        <img src={flag} alt="" className="flag" />
        <h5>{name}</h5>
        <h5>{continent}</h5>
    </div>
}
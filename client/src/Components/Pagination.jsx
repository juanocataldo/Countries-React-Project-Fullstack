import '../Styles/pagination.css'

export function Pagination({ postsPerPage, totalPosts, paginate }){
    const pageNumbers = []


    let maxPags = Math.ceil(totalPosts / postsPerPage )

    if(maxPags > 25)
        maxPags = 25

    for (let i = 1; i <= maxPags; i++) {
        pageNumbers.push(i)        
    }

    function a(number){
        console.log(number)
    }
   
    return <nav className="pagination">
        <ul>
            {pageNumbers.map( number => (
                <span key={number}>
                    <button onClick={() => {paginate(number);a(number)}} >
                        {number}   
                    </button>
                </span>
            ))}
        </ul>
    </nav>
}
import '../Styles/pagination.css'

export function Pagination({ postsPerPage, totalPosts, paginate, currentPage }){
    const pageNumbers = []


    let maxPags = Math.ceil(totalPosts / postsPerPage )

    // if(maxPags > 25)
    //     maxPags = 25

    for (let i = 1; i <= maxPags; i++) {
        pageNumbers.push(i)        
    }

    
   
    return <nav className="pagination">
        <ul>
            {pageNumbers.map( number => (
                <>
            
                <span className={currentPage === number ? 'active' : ''}  key={number}>
                    <button className={currentPage === number ? 'active' : ''} onClick={() => {paginate(number)}} >
                        {number}   
                    </button>
                </span>        
        </>))}
        </ul>
    </nav>
}
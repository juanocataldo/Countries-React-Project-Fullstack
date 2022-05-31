import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCountries } from "../Redux/actions"
import { Countries } from "./Countries"
import { Pagination } from "./Pagination"

export function Home2({countries}){

    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const [posts , setPosts] = useState(null)

    const allCountries = useSelector(store => store.fullCountryList)
    
    const currentPosts = allCountries.slice(indexOfFirstPost, indexOfLastPost).sort(compare)

    useEffect(() =>{
        dispatch(getCountries())
        
    },[])


    useEffect(() => {

    //     if(currentPage === 1)
    //     setCountriesPerPage(9)
    // else
    //     setCountriesPerPage(10)

    },[currentPage])

    const indexOfLastPost = currentPage * countriesPerPage;
    const indexOfFirstPost = indexOfLastPost - countriesPerPage;
    
    function compare( a, b ) {
        if ( a.last_nom < b.last_nom ){
          return -1;
        }
        if ( a.last_nom > b.last_nom ){
          return 1;
        }
        return 0;
      }
    

    
    //Change Page
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    return <div>
        {/* {allCountries && allCountries.map(c => <p>{c.country_name}</p>)} */}
        <Countries posts={currentPosts} />
        <Pagination postsPerPage={countriesPerPage} totalPosts={allCountries.length} paginate={paginate}/>
    </div>
}
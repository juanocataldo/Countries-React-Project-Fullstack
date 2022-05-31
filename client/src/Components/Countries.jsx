export function Countries({posts}){
    
    return <div>
        {posts && posts.map(c => <p>{c.country_name}</p>)}
    </div>
}
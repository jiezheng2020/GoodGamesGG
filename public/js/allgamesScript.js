
window.addEventListener('DOMContentLoaded', async(event)=>{

    let res = await fetch(`http://localhost:8080/games/api`,{
        method: 'POST',
        body: JSON.stringify({filter:'rating', orderType: 'overallRating'}),
        headers: {
            "Content-Type": "application/json",
        }
    })

    let games = await res.json()

    console.log(games)

    const sidebarFilter = document.querySelector('.main__sidebar-filter')

    sidebarFilter.addEventListener('click', async(event)=>{
        if(event.target.className==='main__sidebar-filter-rating' || event.target.className==='main__sidebar-filter-console'){
            let res = await fetch(`http://localhost:8080/games/api`,{
                method: 'POST',
                body: JSON.stringify({filter:event.target.id}),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            let games = await res.json()
            console.log(value)

        }
    })
})
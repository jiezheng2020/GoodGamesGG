
window.addEventListener('DOMContentLoaded', async(event)=>{
    const sidebarFilter = document.querySelector('.main__sidebar-filter')

    sidebarFilter.addEventListener('click',async(event)=>{
        if(event.target.className==='main__sidebar-filter-rating' || event.target.className==='main__sidebar-filter-console'){
            let res = await fetch(`http://localhost:8080/games/api/${event.target.id}`);
            let value = await res.json()
            console.log(value)

        }
    })
})
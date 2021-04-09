

/***************************** DOMCONTENTLOADED *****************************/
window.addEventListener('DOMContentLoaded', async (event) => {


    /******** SELECTS ALL/PLAYED/NOT PLAYED/WANT TO PLAY LIBRARIES ********/
    /*
    get library options
    listen for a click on one of the options
    check the target to decide what to render
    iterate through response and render appropriate games
    */
   
   
   
   const libraries = document.querySelectorAll('.main__sidebar-library')
   libraries.forEach((library) => {
       library.addEventListener('click', async (event) => {
           const name = (library.getAttribute('name'))
        //    console.log(name)
           if (name === 'all') {
               let res = await fetch(`http://localhost:8080/mygames/api`)
               let json = await res.json()
               games = json.games
               let gamesDiv = document.querySelector('.main__games-list')
               games.forEach(game => {
                //    gamesDiv.innerHTML =
                //        "each game in games
                //    div(class= 'main__games-info')
                //    img(class= 'main__games-img' src = `${game.imageHref}`)
                //    a(class= 'main__games-name' href = `/games/${game.id}`) = game.title
                //    select(class= 'main__sidebar-status')
                //    option(class= 'main__sidebar-status-option')-- Played Status--
                //    option(class= 'main__sidebar-status-option') Played
                //    option(class= 'main__sidebar-status-option') Currently Playing
                //    option(class= 'main__sidebar-status-option') Want to Play
                //    each library in libraries
                //    option(class= 'main__sidebar-status-option') #{ library.name }
                //    p(class= 'main__games-body') #{ game.description }"
               }) 
               // return await res.json();
            //    return games;
            }

    })
    // console.log(library)
    })

    /************************* SELECTS USER LIBRARIES *************************/
    const userLibraries = document.querySelectorAll('main__sidebar-user-library')
    // userLibraries.addEventListener('click', async (event) => )
})


// /***************************** DOMCONTENTLOADED *****************************/
// window.addEventListener('DOMContentLoaded', async (event) => {


//     /******** SELECTS ALL/PLAYED/NOT PLAYED/WANT TO PLAY LIBRARIES ********/
//     /*
//     get library options
//     listen for a click on one of the options
//     check the target to decide what to render
//     iterate through response and render appropriate games
//     */
   
   
   
//    const libraries = document.querySelectorAll('.main__sidebar-library')
//    libraries.forEach((library) => {
//        library.addEventListener('click', async (event) => {
//            const name = (library.getAttribute('name'))
//         //    console.log(name)
//            if (name === 'all') {
//                let res = await fetch(`http://localhost:8080/mygames/api`)
//                let json = await res.json()
//                games = json.games
//                let gamesDiv = document.querySelector('.main__games-list')
//                games.forEach(game => {
//                 //    gamesDiv.innerHTML =
//                 //        "each game in games
//                 //    div(class= 'main__games-info')
//                 //    img(class= 'main__games-img' src = `${game.imageHref}`)
//                 //    a(class= 'main__games-name' href = `/games/${game.id}`) = game.title
//                 //    select(class= 'main__sidebar-status')
//                 //    option(class= 'main__sidebar-status-option')-- Played Status--
//                 //    option(class= 'main__sidebar-status-option') Played
//                 //    option(class= 'main__sidebar-status-option') Currently Playing
//                 //    option(class= 'main__sidebar-status-option') Want to Play
//                 //    each library in libraries
//                 //    option(class= 'main__sidebar-status-option') #{ library.name }
//                 //    p(class= 'main__games-body') #{ game.description }"
//                }) 
//                // return await res.json();
//             //    return games;
//             }

//     })
//     // console.log(library)
//     })

//     /************************* SELECTS USER LIBRARIES *************************/
//     const userLibraries = document.querySelectorAll('main__sidebar-user-library')
//     // userLibraries.addEventListener('click', async (event) => )
// })

/***************************** FUNCTIONS *****************************/


// Populate The Games
function populateGames(games, limit, pageNum) {
    let gamesUl = games.slice(limit * (pageNum - 1), limit * pageNum).map((game) => {
        const imageHref = (game.imageHref) ? game.imageHref : '/images/not-found.png';
        return `<div class="main__games-info">
                    <a href="/games/${game.id}">
                        <img class="main__games-img" src="${imageHref}">
                    </a>
                    <a class="main__games-name" href="/games/${game.id}">${game.title}</a>
                    <div>
                        <div class="main__ratings-stars">
                            <div class="main__ratings-stars-empty"></div>
                            <div class="main__ratings-stars-full" style="width:${((game.overallRating / 5).toFixed(1)) * 100}%"></div>
                        </div>
                    </div>
                    <p class="main__games-body">${game.description}</p>
                </div>`
    })

    document.querySelector('.main__games-list').innerHTML = gamesUl.join('')
}


// Merge Sort Function For Ordering
function merge(leftArray, rightArray, type) {
    let result = []

    while (leftArray.length && rightArray.length) {
        if (leftArray[0][type] < rightArray[0][type]) {
            if (type === 'title') { result.push(leftArray.shift()) }
            else { result.push(rightArray.shift()) }

        } else if (leftArray[0][type] > rightArray[0][type]) {
            if (type === 'title') { result.push(rightArray.shift()) }
            else { result.push(leftArray.shift()) }

        } else {
            if (leftArray[0].title < rightArray[0].title) {
                result.push(leftArray.shift())
            } else {
                result.push(rightArray.shift())
            }
        }
    }

    while (leftArray.length) {
        result.push(leftArray.shift())
    }

    while (rightArray.length) {
        result.push(rightArray.shift());
    }

    return result;
}

function mergeSort(array, type) {
    if (array.length <= 1) { return array }

    let leftArray = array.slice(0, array.length / 2)
    let rightArray = array.slice(array.length / 2)

    let mergedLeft = mergeSort(leftArray, type)
    let mergedRight = mergeSort(rightArray, type)

    return merge(mergedLeft, mergedRight, type)
}

// File Wide Limit Set
let limit = 12;

// Initialize Current Game List
let currGameList;

/***************************** DOMCONTENTLOADED  *****************************/
window.addEventListener('DOMContentLoaded', async (event) => {


    let res = await fetch(`http://localhost:8080/mygames/api`, {
        method: 'POST',
        body: JSON.stringify({ filter: 'all', orderType: 'overallRating' }),
        headers: {
            "Content-Type": "application/json",
        }
    })

    let { games } = await res.json()
    currGameList = games;

    /***************************** Sidebar Orders  *****************************/
    const sidebarOrder = document.querySelector('.main__sidebar-order')

    sidebarOrder.addEventListener('click', (event) => {
        const sortedGameList = mergeSort(currGameList, event.target.id)
        const currPage = document.querySelector('.main__games-page--current')

        const pageNum = parseInt(currPage.id.slice(-1));

        populateGames(sortedGameList, limit, pageNum)
        currGameList = sortedGameList;
    })

    /***************************** Sidebar Filters  *****************************/
    const sidebarFilter = document.querySelector('.main__sidebar-filter')
    sidebarFilter.addEventListener('click', async (event) => {
        if (event.target.className.match(/main__sidebar-filter-(all|rating|console)$/)) {
            let res = await fetch(`http://localhost:8080/mygames/api`, {
                method: 'POST',
                body: JSON.stringify({ filter: event.target.id, orderType: 'overallRating' }),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            const { games } = await res.json()

            currGameList = games;

            populateGames(games, limit, 1)

            const pageNums = document.querySelector('.main__games-pages')
            pageNums.innerHTML = ''
            const pageCount = Math.ceil(currGameList.length / limit);
            for (let i = 0; i < pageCount; i++) {
                if (i === 0) {
                    pageNums.innerHTML += `<div class="main__games-page main__games-page--current" id="page${i + 1}">${i + 1}</div>`
                } else {
                    pageNums.innerHTML += `<div class="main__games-page" id="page${i + 1}">${i + 1}</div>`
                }
            }
        }
    })


    // /***************************** Page Selector  *****************************/
    // const pageNums = document.querySelector('.main__games-pages')

    // pageNums.addEventListener('click', async (event) => {
    //     const currPage = document.querySelector('.main__games-page--current')
    //     const pageNum = (event.target.id.match(/\d+/)) ? parseInt(event.target.id.slice(-1)) : null;

    //     if (!pageNum || currPage.id === event.target.id) { return }

    //     populateGames(currGameList, limit, pageNum)

    //     currPage.classList.remove('main__games-page--current')

    //     event.target.classList.add('main__games-page--current')

    // })


})
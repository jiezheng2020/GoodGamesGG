/***************************** FUNCTIONS *****************************/
function hideAddCreateEdit(rating, username){

    const addRatingDiv = document.querySelector('.main__game-ratings-add')
    addRatingDiv.classList.add('main__game--hidden');

    const editRatingDiv = document.querySelector('.main__game-ratings-edit')
    editRatingDiv.classList.remove('main__game--hidden')

    const userRating = document.querySelector('.main__game-ratings-user')

    userRating.innerHTML =
        `
        <div class="main__game-ratings-user-username_and_stars">
            <h4 class="main__game-ratings-user-username">${username}</h4>
            <div>
                <div class="main__game-ratings-user-stars main__ratings-stars">
                    <div class="main__ratings-stars-empty"></div>
                    <div class="main__ratings-stars-full" style="width:${((rating.overall/5).toFixed(2))*100}%"></div>
                </div>
            </div>
        </div>
        <div class="main__game-ratings-user-review">${rating.body}</div>`
}

function loadStarRating(numberOfStars){
    const stars = document.querySelector('.main__game-ratings-add-stars')
    let string=''

    for(let i=5;i>0;i--){
        if(i<=numberOfStars){
            string+=`<span class='main__game-ratings-add-star${i}' style='color:cyan'>★</span>`
        } else {
            string+=`<span class='main__game-ratings-add-star${i}'>★</span>`
        }
    }
    stars.innerHTML = string
    document.querySelector('.main__game-ratings-error').innerHTML=''

}

function updateOverallRating(overallRating){
    const starRating = document.querySelector('.main__ratings-stars-full')
    starRating.style = `width:${((overallRating/5).toFixed(2))*100}%`
}

const stars = document.querySelector('.main__game-ratings-add-stars')

/***************************** DOMCONTENTLOADED  *****************************/
window.addEventListener('DOMContentLoaded', async(event)=>{
    // // Check to see if user is logged in
    if(!document.querySelector('.req__exists')){return}

    /***************************** Loads User's Ratings and Played Status if Exists  *****************************/
    const gameId = parseInt(window.location.href.match(/(\d+)$/g)[0])

    let res = await fetch(`/games/${gameId}/api`);

    // if(res.ok){
    if(res.ok){
        let { rating, username} = await res.json()
        hideAddCreateEdit(rating, username)
        document.querySelector('.main__game-ratings-add-review').innerHTML = rating.body
        loadStarRating(rating.overall)
    }



    /***************************** Select Rating Functionality *****************************/
    const stars = document.querySelector('.main__game-ratings-add-stars')
    if(stars){
        stars.addEventListener('click', (event)=>{
            let num = event.target.className.slice(-1)

            if(num.match(/\d+/)){
                num = parseInt(num)
                loadStarRating(num)
            }
        })
    }

    /***************************** Submit A Rating *****************************/
    const submitButton = document.querySelector('.main__game-ratings-add-button')
    submitButton.addEventListener('click', async (event)=>{
        let overall = stars.innerHTML.match(/style/g)

        if(overall){overall=overall.length}
        else {overall=null}

        const body = document.querySelector('.main__game-ratings-add-review').value

        try {
            const res = await fetch(`/games/${gameId}`,{
                method: submitButton.name,
                body: JSON.stringify({overall, body}),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            // if (!res.ok){
            if (!res.ok){
                throw res
            }


            const {rating, username, overallRating}= await res.json()

            document.querySelector('.main__game-ratings-add-review').innerHTML = rating.body
            loadStarRating(rating.overall)

            hideAddCreateEdit(rating, username)

            updateOverallRating(overallRating)


        } catch(err){
            const { errors } = await err.json()
            const errorSpan = document.querySelector('.main__game-ratings-error')
            errorSpan.innerHTML=errors.join("")

        }


    })


    /***************************** Edit A Rating *****************************/
    const editButton = document.querySelector('.main__game-ratings-edit-button')
    editButton.addEventListener('click', async (event)=>{
        const submitHeader = document.querySelector('.main__game-ratings-add-header')
        submitHeader.innerHTML = 'Edit Rating/Review'

        const submitRatingDiv = document.querySelector('.main__game-ratings-add')
        submitRatingDiv.classList.remove('main__game--hidden')

        const submitButton = document.querySelector('.main__game-ratings-add-button')
        submitButton.name = 'PUT'

    })

    /***************************** Delete A Rating *****************************/
    const deleteButton = document.querySelector('.main__game-ratings-delete-button')
    deleteButton.addEventListener('click', async (event)=>{
        try {
            const res = await fetch(`/games/${gameId}`,{
                method: 'DELETE'
            })

            if (!res.ok){
                throw res
            }

            const {overallRating} = await res.json()

            const review = document.querySelector('.main__game-ratings-add-review')
            review.value=''

            loadStarRating(0)

            const addRatingDiv = document.querySelector('.main__game-ratings-add')
            addRatingDiv.classList.remove('main__game--hidden');

            const editRatingDiv = document.querySelector('.main__game-ratings-edit')
            editRatingDiv.classList.add('main__game--hidden')

            const submitButton = document.querySelector('.main__game-ratings-add-button')
            submitButton.name = 'POST'

            const existingRating = document.querySelector('.main__game-ratings-user')
            existingRating.innerHTML =''

            updateOverallRating(overallRating)

        } catch(err){
            window.location.href = '/error'
        }
    })




    /***************************** Edit Played Status *****************************/
    const playedStatus = document.querySelector('.main__sidebar-status-select')
    playedStatus.addEventListener('change', async(event)=>{
        const playedNums= {
            'Played': 2,
            'Currently Playing': 1,
            'Want to Play': 0,
        }

        const  playedStats={
            2: 'Played',
            1: 'Currently Playing',
            0: 'Want to Play',
        }

        if (event.target.value in playedNums){
            const played = playedNums[event.target.value]
            try {
                const playStatus = document.querySelector('.main__sidebar-status-played')
                const status = playStatus.innerHTML
                playStatus.innerHTML = 'Loading ⧗'
                playStatus.style.color = 'white'

                let res;
                let newPlayStatus;

                if(status in playedNums){
                    res = await fetch(`/mygames/${gameId}/played`,{
                        method: 'PUT',
                        body: JSON.stringify({played}),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    const {newPlayed}=await res.json()
                    newPlayStatus = (newPlayed) ? newPlayed.played : null
                } else {
                    res = await fetch(`/mygames/${gameId}/add`,{
                        method: 'POST',
                        body: JSON.stringify({played}),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })
                    const {mygame}=await res.json()
                    newPlayStatus=(mygame) ? mygame.played : null;

                }

                if(newPlayStatus !== null){
                    document.querySelector('.main__sidebar-status-container').classList.remove('main__game--hidden')
                    playStatus.innerHTML = playedStats[newPlayStatus]
                    playStatus.style.color = 'cyan'
                }

            } catch(err){
                // window.location.href = '/error'
            }

        } else {

            if(event.target.value==='-- Played Status --'){return}

            document.querySelector('.main__sidebar-library-container').classList.remove('main__game--hidden')
            const libraryStatus = document.querySelector('.main__sidebar-library-status')
            libraryStatus.innerHTML = 'Loading ⧗'
            libraryStatus.style.color = 'white'

            const allOptions = document.querySelectorAll('.main__sidebar-status-option')
            let id;
            allOptions.forEach((option)=>{
                if(option.value===event.target.value){
                    id=option.id
                }
            })

            try {
                let res = await fetch(`/mygames/libraries/${id}/${gameId}/add`,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const {exists, libraryGame, mygame} = await res.json()

                if(exists){
                    libraryStatus.innerHTML = `Game Already Exists In ${libraryGame.name}`
                    libraryStatus.style.color = 'cyan'
                    return
                }

                libraryStatus.innerHTML = `Successfully Added To ${libraryGame.name}`
                libraryStatus.style.color = 'cyan'

                document.querySelector('.main__sidebar-status-container').classList.remove('main__game--hidden')
                const playStatus = document.querySelector('.main__sidebar-status-played')
                playStatus.innerHTML = playedStats[mygame.played]
                playStatus.style.color = 'cyan'



            } catch(err){
                window.location.href = '/error'
            }
        }
    })

})
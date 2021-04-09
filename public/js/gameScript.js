/***************************** FUNCTIONS *****************************/
function hideAddCreateEdit(rating, username){

    const addRatingDiv = document.querySelector('.main__game-ratings-add')
    addRatingDiv.classList.add('main__game--hidden');

    const editRatingDiv = document.querySelector('.main__game-ratings-edit')
    editRatingDiv.classList.remove('main__game--hidden')

    const existingRating = document.querySelector('.main__game-ratings-existing')

    existingRating.innerHTML =
        `<p>${username}</p>
        <div>
            <div class="main__ratings-stars">
                <div class="main__ratings-stars-empty"></div>
                <div class="main__ratings-stars-full" style="width:${((rating.overall/5).toFixed(2))*100}%"></div>
            </div>
        </div>
        <div class="main__game-ratings-review">${rating.body}</div>`
}6

function loadStarRating(numberOfStars){
    const stars = document.querySelector('.main__game-ratings-add-stars')
    let string=''

    for(let i=5;i>0;i--){
        if(i<=numberOfStars){
            string+=`<span class='main__game-ratings-add-star${i}' style='color:black'>★</span>`
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

    // Check to see if user is logged in
    let reqExists = document.querySelector('.main__game-ratings-add')
    if(!reqExists){return}

    /***************************** Loads User's Ratings and Played Status if Exists  *****************************/
    const gameId = parseInt(window.location.href.match(/(\d+)$/g)[0])

    let res = await fetch(`/games/${gameId}/api`);
    let {rating, username} = await res.json()
    if(res.ok){
        hideAddCreateEdit(rating, username)
        document.querySelector('.main__game-ratings-add-review').innerHTML = rating.body
        loadStarRating(rating.overall)
    }

    /***************************** Select Rating Functionality *****************************/
    const stars = document.querySelector('.main__game-ratings-add-stars')
    stars.addEventListener('click', (event)=>{
        let num = event.target.className.slice(-1)

        if(num.match(/\d+/)){
            num = parseInt(num)
            loadStarRating(num)
        }
    })

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
            const errorMessage = errors.map((error,i)=>{
                return `${i+1}.${error}`
            })

            errorSpan.innerHTML=errorMessage.join("")

        }


    })


    /***************************** Edit A Rating *****************************/
    const editButton = document.querySelector('.main__game-ratings-edit-button')
    editButton.addEventListener('click', async (event)=>{
        const submitHeader = document.querySelector('.main__game-ratings-add-h3')
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

            const existingRating = document.querySelector('.main__game-ratings-existing')
            existingRating.innerHTML =''

            updateOverallRating(overallRating)

        } catch(err){
            // const { errors } = await err.json()
        }
    })




    /***************************** Edit Played Status *****************************/
    const playedStatus = document.querySelector('.main__sidebar-status')

    playedStatus.addEventListener('change', async(event)=>{
        const pStats= {
            'Played': 2,
            'Currently Playing': 1,
            'Want to Play': 0,
        }
        const played = pStats[event.target.value]

        if (played){
            try {
                let res = await fetch(`/mygames/${gameId}/add`,{
                    method: 'POST',
                    body: JSON.stringify({played}),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const {exists} = await res.json()

                if (exists){
                    res = await fetch(`/mygames/${gameId}/played`,{
                        method: 'PUT',
                        body: JSON.stringify({played}),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })

                    const newStatus = await res.json()


                } else {
                    const newStatus = await res.json()
                }


            } catch(err){
                const { errors } = await err.json()
            }

        } else {
            if(event.target.value==='-- Played Status --'){return}
            const allOptions = document.querySelectorAll('.main__sidebar-status-option')
            let id;
            allOptions.forEach((option)=>{
                if(option.value===event.target.value){
                    id=option.id
                }
            })
            try {
                let res = await fetch(`/libraries/${id}/${id}/add`,{
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const {exists} = await res.json()

                if(exists){
                    return
                }

            } catch(err){
                console.log(err)
            }




        }


    })

})
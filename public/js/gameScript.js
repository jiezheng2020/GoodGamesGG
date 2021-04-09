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
                <div class="main__ratings-stars-full" style="width:${((rating.overall/5).toFixed(1))*100}%"></div>
            </div>
        </div>
        <div class="main__game-ratings-review">${rating.body}</div>`
}

function loadStarRating(numberOfStars){
    const stars = document.querySelector('.main__game-ratings-add-stars')
    let string = '<span id="main__game-ratings-error"></span>';

    for(let i=5;i>0;i--){
        if(i<=numberOfStars){
            string+=`<span class='main__game-ratings-add-star${i}' style='color:black'>★</span>`
        } else {
            string+=`<span class='main__game-ratings-add-star${i}'>★</span>`
        }
    }
    stars.innerHTML = string
}

function updateOverallRating(overallRating){
    const starRating = document.querySelector('.main__ratings-stars-full')
    starRating.style = `width:${((overallRating/5).toFixed(1))*100}%`
}

const stars = document.querySelector('.main__game-ratings-add-stars')


/***************************** DOMCONTENTLOADED  *****************************/
window.addEventListener('DOMContentLoaded', async(event)=>{


    /***************************** Loads User's Ratings if Exists  *****************************/
    const gameId = parseInt(window.location.href.match(/(\d+)$/g)[0])

    let res = await fetch(`http://localhost:8080/games/${gameId}/api`);
    let {rating, username} = await res.json()
    if(res.ok){
        hideAddCreateEdit(rating, username)
    }

    /***************************** Select Rating Functionaliy *****************************/
    const stars = document.querySelector('.main__game-ratings-add-stars')
    stars.addEventListener('click', (event)=>{
        let num = event.target.className.slice(-1)

        if(num.match(/\d+/)){
            num = parseInt(num)
            loadStarRating(num)
        }
    })

    /***************************** Submit a Rating *****************************/
    const submitButton = document.querySelector('.main__game-ratings-add-button')
    submitButton.addEventListener('click', async (event)=>{
        let overall = stars.innerHTML.match(/style/g)
        if(overall){overall=overall.length}
        else {overall=null}
        const body = document.querySelector('.main__game-ratings-add-review').value

        try {
            const res = await fetch(`http://localhost:8080/games/${gameId}`,{
                method: submitButton.name,
                body: JSON.stringify({overall, body}),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            if (!res.ok){
                throw res
            }


            const {rating,username, overallRating}= await res.json()

            // console.log(rating, username)

            hideAddCreateEdit(rating, username)

            updateOverallRating(overallRating)


        } catch(err){
            const { errors } = await err.json()
            console.log(errors)
            const errorSpan = document.querySelector('.main__game-ratings-error')
            const errorMessage = errors.map((error,i)=>{
                return `${i+1}.${error}`
            })

            errorSpan.innerHTML=errorMessage.join("")

        }


    })


    /***************************** Edit a Rating *****************************/
    const editButton = document.querySelector('.main__game-ratings-edit-button')
    editButton.addEventListener('click', async (event)=>{
        const submitHeader = document.querySelector('.main__game-ratings-add-h3')
        submitHeader.innerHTML = 'Edit Rating/Review'

        const submitRatingDiv = document.querySelector('.main__game-ratings-add')
        submitRatingDiv.classList.remove('main__game--hidden')

        const submitButton = document.querySelector('.main__game-ratings-add-button')
        submitButton.name = 'PUT'

        const submitReview = document.querySelector('.main__game-ratings-add-review')
        submitReview.value=rating.body

    })

    /***************************** Delete a Rating *****************************/
    const deleteButton = document.querySelector('.main__game-ratings-delete-button')
    deleteButton.addEventListener('click', async (event)=>{
        try {
            const res = await fetch(`http://localhost:8080/games/${gameId}`,{
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
            console.log(err)
        }
    })




    /***************************** Edit Played Status *****************************/
    const playedStatus = document.querySelector('.main__sidebar-status')
    playedStatus.addEventListener('change', async(event)=>{
        const pStats= {
            '-- Played Status --': 3,
            'Played': 2,
            'Currently Playing': 1,
            'Want to Play': 0,
        }
        const played = pStats[event.target.value]

        if (played<3 && played>=0){
            try {
                let res = await fetch(`http://localhost:8080/mygames/${gameId}/add`,{
                    method: 'POST',
                    body: JSON.stringify({played}),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const {exists} = await res.json()

                console.log(exists)
                if (exists){
                    res = await fetch(`http://localhost:8080/mygames/${gameId}/played`,{
                        method: 'PUT',
                        body: JSON.stringify({played}),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })

                    const newStatus = await res.json()
                    console.log(newStatus)


                } else {
                    const newStatus = await res.json()
                    console.log(newStatus)
                }


            } catch(err){
                const { errors } = await err.json()
                console.log(errors)
            }

        } else if(played===3){
            try {
                let res = await fetch(`http://localhost:8080/mygames/libraries/:libraryId(\\d+)/:gameId(\\d+)/delete`,{
                    method: 'DELETE',
                    body: JSON.stringify({played}),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                const {exists} = await res.json()

                console.log(exists)
                if (exists){
                    res = await fetch(`http://localhost:8080/mygames/${gameId}/played`,{
                        method: 'PUT',
                        body: JSON.stringify({played}),
                        headers: {
                            "Content-Type": "application/json",
                        }
                    })

                    const newStatus = await res.json()
                    console.log(newStatus)


                } else {
                    const newStatus = await res.json()
                    console.log(newStatus)
                }


            } catch(err){
                const { errors } = await err.json()
                console.log(errors)
            }

        } else {
            const libraries = event.target.value
        }


    })

})
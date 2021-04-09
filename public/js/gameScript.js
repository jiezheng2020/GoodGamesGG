
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
            let string = '<span id="main__game-ratings-error"></span>';

            for(let i=5;i>0;i--){
                if(i<=num){
                    string+=`<span class='main__game-ratings-add-star${i}' style='color:black'>★</span>`
                } else {
                    string+=`<span class='main__game-ratings-add-star${i}'>★</span>`
                }
            }

            stars.innerHTML = string
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
                    Authorization: `Bearer ${localStorage.getItem("TWITTER_LITE_ACCESS_TOKEN")}`
                }
            })

            if (!res.ok){
                throw res
            }


            const {rating,username}= await res.json()

            // console.log(rating, username)

            hideAddCreateEdit(rating, username)

        } catch(err){
            let error = err.json()
            console.log(error)
        }


    })


    /***************************** Edit a Rating *****************************/
    const editButton = document.querySelector('.main__game-ratings-edit-button')
    editButton.addEventListener('click', async (event)=>{
        document.querySelector('.main__game-ratings-add-h3').innerHTML = 'Edit Rating/Review'
        document.querySelector('.main__game-ratings-add').classList.remove('main__game--hidden')
        document.querySelector('.main__game-ratings-add-button').name = 'PUT'
        document.querySelector('.main__game-ratings-add-review').value=rating.body

    })

    /***************************** Delete a Rating *****************************/
    const deleteButton = document.querySelector('.main__game-ratings-delete-button')
    deleteButton.addEventListener('click', async (event)=>{

    })

})
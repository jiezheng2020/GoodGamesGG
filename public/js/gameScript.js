window.addEventListener('DOMContentLoaded', async(event)=>{

    const res = await fetch(`http://localhost:8080/games/${gameId}/api`);

6



    const stars = document.querySelector('.main__game-ratings-add-stars')
    stars.addEventListener('click', (event)=>{
        let num = event.target.className.slice(-1)

        if(num.match(/\d+/)){
            num = parseInt(num)
            let string = '<span class="main__game--hidden" id="main__game-ratings-error">Please enter a rating!</span>';

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

    const submitButton = document.querySelector('.main__game-ratings-add-button')
    submitButton.addEventListener('click', async (event)=>{
        let overall = stars.innerHTML.match(/style/g)
        if(overall){overall=overall.length}
        else {overall=null}
        const body = document.querySelector('.main__game-ratings-add-review').value

        const gameId = parseInt(window.location.href.match(/(\d+)$/g)[0])

        try {
            const res = await fetch(`http://localhost:8080/games/${gameId}`,{
                method: 'POST',
                body: JSON.stringify({overall, body}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("TWITTER_LITE_ACCESS_TOKEN")}`
                }
            })

            if (!res.ok){
                throw res
            }

            const {rating, username} = await res.json()

            document.querySelector('.main__game-ratings-add').classList.toggle('main__game--hidden')

            const newRating =
                `<h3>Your Rating/Review</h3>
                <button class='main__game-ratings-edit-button'>Edit</button>
                <button class='main__game-ratings-delete-button'>Delete</button>
                <div class="main__game-ratings-single">
                    <p>${username}</p>
                    <div>
                        <div class="main__ratings-stars">
                            <div class="main__ratings-stars-empty"></div>
                            <div class="main__ratings-stars-full" style="width:${((rating.overall/5).toFixed(1))*100}%"></div>
                        </div>
                    </div>
                    <div class="main__game-ratings-review">${rating.body}</div>
                </div>`;

            const editRating = document.querySelector('.main__game-ratings-edit')
            editRating.classList.toggle('main__game--hidden')
            editRating.innerHTML = newRating

        } catch(err){
            const errorSpan = document.querySelector('#main__game-ratings-error')
            errorSpan.classList.toggle('main__game--hidden')
        }
    })

    const editButton = document.querySelector('.main__game-ratings-edit-button')
    editButton.addEventListener('click', async (event)=>{
        let overall = stars.innerHTML.match(/style/g)
        if(overall){overall=overall.length}
        else {overall=null}
        const body = document.querySelector('.main__game-ratings-add-review').value

        const gameId = parseInt(window.location.href.match(/(\d+)$/g)[0])

        try {
            const res = await fetch(`http://localhost:8080/games/${gameId}`,{
                method: 'POST',
                body: JSON.stringify({overall, body}),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("TWITTER_LITE_ACCESS_TOKEN")}`
                }
            })

            if (!res.ok){
                throw res
            }

            const {rating, username} = await res.json()

            document.querySelector('.main__game-ratings-add').classList.toggle('main__game--hidden')

            const newRating =
                `<h3>Your Rating/Review</h3>
                <button class='main__game-ratings-edit-button'>Edit</button>
                <button class='main__game-ratings-delete-button'>Delete</button>
                <div class="main__game-ratings-single">
                    <p>${username}</p>
                    <div>
                        <div class="main__ratings-stars">
                            <div class="main__ratings-stars-empty"></div>
                            <div class="main__ratings-stars-full" style="width:${((rating.overall/5).toFixed(1))*100}%"></div>
                        </div>
                    </div>
                    <div class="main__game-ratings-review">${rating.body}</div>
                </div>`;

            const editRating = document.querySelector('.main__game-ratings-edit')
            editRating.classList.toggle('main__game--hidden')
            editRating.innerHTML = newRating

        } catch(err){
            const errorSpan = document.querySelector('#main__game-ratings-error')
            errorSpan.classList.toggle('main__game--hidden')
        }
    })

    const deleteButton = document.querySelector('.main__game-ratings-delete-button')
    deleteButton.addEventListener('click', async (event)=>{

    })

})
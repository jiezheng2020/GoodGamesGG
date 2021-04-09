const fetch = require('node-fetch')



const getGames = async () => {
  // const data = await fetch('https://api.rawg.io/api/games?dates=2019-01-01,2019-12-31&ordering=-added?key=26ac0f3d2391457087937165a3fbeceb');
  // const data = await fetch('https://api.rawg.io/api/publishers?key=26ac0f3d2391457087937165a3fbeceb');
  const data = await fetch('https://api.rawg.io/api/games?key=26ac0f3d2391457087937165a3fbeceb&page_size=3');
  const { results } = await data.json()
  console.log(results)
  //
}
getGames()

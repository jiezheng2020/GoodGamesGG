
const fetch = require('node-fetch');


async function getGames() {
  const data = await fetch('http://api.rawg.io/api/games?key=26ac0f3d2391457087937165a3fbeceb');
  const { results } = await data.json();
  console.log(data)
  console.log(results);
}

getGames()

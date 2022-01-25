const PLANETS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

const getPlanets = () => fetch(PLANETS_API)
  .then((response) => response.json())
  .then((data) => data);

export default getPlanets;

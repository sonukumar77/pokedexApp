import axios from "axios";

const pokedex = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
  timeout: 2000
});
export { pokedex };

import { Routes, Route } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Search from "./components/Search/Search";
import "./styles.css";
import Pokemons from "./components/Pokemons/Pokemons";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";

export default function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/details/:id" element={<PokemonDetails />} />
      </Routes>
      
    </div>
  );
}

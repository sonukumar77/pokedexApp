import "./Nav.css";
import { Link } from "react-router-dom";
const Nav = () => {
  return (
    <div className="nav-container">
      <div className="nav-left">
        <Link to="/" className="brandName">
          {" "}
          Pokedex App
        </Link>
      </div>
      <div className="nav-right">
        <div className="nav-menu">
          <Link to="/"> Search</Link>
        </div>
        <div className="nav-menu">
          <Link to="/pokemons"> Pokemons</Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;

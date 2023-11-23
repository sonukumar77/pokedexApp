import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { pokedex } from "../../utils";
import "./Search.css";
const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [list, setList] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (keyword === "") {
      return;
    }
    setIsLoading(true);
    (async () => {
      try {
        const resp = await pokedex.get(`/${keyword}`);
        // console.log(resp.data);
        setList(resp.data);
        navigate(`/details/${resp.data.id}`);
        setIsLoading(false);
        setError("");
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setError("Something went wrong,Try again later!");
      }
    })();
  }, [keyword]);

  const btnRef = useRef();
  const inputRef = useRef();
  const formHandler = (e) => {
    e.preventDefault();
    setKeyword(inputRef.current.value);
  };

  // console.log(keyword, list);
  return (
    <div className="searchContainer">
      <div className="formContainer">
        <form onSubmit={formHandler}>
          <input
            type="text"
            ref={inputRef}
            placeholder="Search pokemon name eg: ditto,metapod"
          />
          <button ref={btnRef} className="searchBtn">
            Search
          </button>
        </form>
        {isLoading ? "Loading...." : ""}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default Search;

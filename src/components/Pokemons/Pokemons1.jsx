import "./Pokemons.css";
import { useEffect, useState } from "react";
import SingleCard from "../SingleCard/SingleCard";
import { pokedex } from "../../utils";

const Pokemons = () => {
  const [product, setProduct] = useState([]);
  const [offset, setOffset] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setIsLoading(true);
    setError("");
    try {
      const resp = await pokedex.get(`/?offset=${offset}&limit=20"`);
      // console.log(resp.data);
      setProduct(resp.data.results);
      setIsLoading(false);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Something went wrong.Try again later!");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const loadMoreBtnHandler = async () => {
    setOffset((prev) => prev + 10);
    const resp = await pokedex.get(`/?offset=${offset}&limit=10"`);
    console.log("l", resp.data);

    setProduct((prev) => [...prev, ...resp.data.results]);
  };
  // console.log("product", product);

  return (
    <>
      <div className="product-container">
        {error && <p>{error}</p>}
        {isLoading
          ? "Loading..."
          : product.map((element, i) => {
              element.id = i + 1;

              return <SingleCard key={i} {...element} />;
            })}
      </div>
      {isLoading ? (
        "Loading..."
      ) : (
        <button onClick={loadMoreBtnHandler} className="loadMore">
          load more...
        </button>
      )}
    </>
  );
};

export default Pokemons;

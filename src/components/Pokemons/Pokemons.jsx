import "./Pokemons.css";
import { useEffect, useState, useCallback } from "react";
import SingleCard from "../SingleCard/SingleCard";
import { pokedex } from "../../utils";

const Pokemons = () => {
  const [product, setProduct] = useState([]);
  const [offset, setOffset] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const resp = await pokedex.get(`/?offset=${offset}&limit=20"`);
        console.log(resp.data);

        setProduct(resp.data.results);
        setIsLoading(false);
        setError("");
      } catch (err) {
        console.log(err);
        setError("Something went wrong.Try again later!");
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const fetchData = useCallback(async () => {
    if (isLoading) return;

    setIsLoading(true);

    setOffset((prev) => prev + 10);
    const resp = await pokedex.get(`/?offset=${offset}&limit=10"`);
    setProduct((prev) => [...prev, ...resp.data.results]);

    setIsLoading(false);
  }, [offset, isLoading]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 20) {
        fetchData();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchData]);

  return (
    <>
      <div className="product-container">
        {error && <p className="error">{error}</p>}
        {isLoading
          ? "Loading..."
          : product.map((element, i) => {
              element.id = i + 1;

              return <SingleCard key={i} {...element} />;
            })}
      </div>
    </>
  );
};

export default Pokemons;

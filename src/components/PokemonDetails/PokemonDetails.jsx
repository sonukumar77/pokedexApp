import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PokemonDetails.css";
import { pokedex } from "../../utils";

const PokemonDetails = () => {
  const [detail, setDetail] = useState({});
  const [isBookmark, setIsBookmark] = useState(false);
  // const [bookmarkList, setBookmarkList] = useState([]);
  const pokemonId = useParams();

  useEffect(() => {
    (async () => {
      try {
        const resp = await pokedex.get(`/${pokemonId.id}/`);
        // console.log(resp.data);
        setDetail(resp.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const toogleBookmark = () => {
    if (isBookmark) {
      setIsBookmark(false);
    } else {
      setIsBookmark(true);
    }
  };

  return (
    <div className="detailContainer">
      <div>
        <div>
          <strong>Name : </strong>
          {detail?.name}
        </div>

        <div className="bookmarkContainer">
          {!isBookmark ? (
            <span onClick={toogleBookmark} className="bookmark">
              🤍
            </span>
          ) : (
            <span onClick={toogleBookmark} className="bookmark">
              🧡
            </span>
          )}
        </div>
      </div>
      <div>
        <strong>Order : </strong>
        {detail?.order}
      </div>
      <div>
        <strong>Experince :</strong> {detail?.base_experience}
      </div>
      <div>
        <strong>Height : </strong>
        {detail?.height}
      </div>
      <div>
        <strong>Weight : </strong>
        {detail?.weight}
      </div>
      <div>
        <strong>Moves :</strong>
        <ul className="movesList">
          {detail?.moves?.map((e, i) => {
            return (
              <li key={i} className="movesItems">
                {e.move.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PokemonDetails;

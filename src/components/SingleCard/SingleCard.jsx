import "./SingleCard.css";
import { Link } from "react-router-dom";
const SingleCard = ({ name, url, id, props }) => {
  return (
    <div className="card">
      <Link to={`/details/${id}`}>
        <div className="card-header"></div>
        <div className="card-body">
          <h3>{name}</h3>
        </div>
      </Link>
    </div>
  );
};

export default SingleCard;

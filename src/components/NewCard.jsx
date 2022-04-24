import React from "react";
// import { onSnapshot, collection, query, where } from "@firebase/firestore";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

// import { db } from "../config/firebase-config";

const NewCard = (props) => {
  // const [user, setUser] = useState([]);

  // // Tìm user giống author

  // useEffect(() => {
  //   if (props.author) {
  //     onSnapshot(
  //       query(collection(db, "Account"), where("user", "==", props.author)),
  //       (snapshot) =>
  //         setUser(
  //           snapshot.docs.filter((doc) => ({
  //             ...doc.data(),
  //             id: doc.id,
  //           }))
  //         )
  //     );
  //   }
  // }, [props.author]);

  return (
    <div className="new-card-in-depth">
      <div className="new-card-in-depth__image">
        <Link to={`/article/?id=${props.id}`}>
          <img src={props.image} alt="" />
        </Link>
        <Link
          to={`/article/?id=${props.id}`}
          className="new-card-in-depth__title"
        >
          {props.name}
        </Link>
      </div>
    </div>
  );
};

NewCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.bool,
};

export default NewCard;

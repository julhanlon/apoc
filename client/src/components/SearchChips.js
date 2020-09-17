import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";

const SearchChips = (props) => {
  const [recentCities, setCities] = useState([]);

  React.useEffect(() => {
    function getFromLocalStorage() {
      let mapStorage = localStorage.getItem("mapStorage");
      return mapStorage ? JSON.parse(mapStorage) : [];
    }

    setCities(getFromLocalStorage());
  }, []);

  const handleDelete = (index) => {
    var arr = recentCities;

    arr.splice(index, 1);
    setCities(arr);
  };

  const handleClick = (e) => {
    let { city, state_name, county, lat, lng } = recentCities[
      e.currentTarget.dataset.index
    ];
    props.buttonSubmit({ city, state_name, county, lat, lng });
  };

  // let uniq = [...new Set(recentCities)];
  // console.log(uniq);
  let chips = recentCities.map((item, index) => {
    return (
      <div key={index} style={{ size: "sizeSmall" }}>
        <Chip
          size="small"
          data-index={index}
          label={`${item.city}, ${item.state_name}`}
          // icon={<FaceIcon />}
          onClick={handleClick}
          //onDelete={() => handleDelete(index)}
          color="primary"
          variant="outlined"
        />
      </div>
    );
  });
  return chips;
};

export default SearchChips;

// const [suggestions, setSuggestionsData] = useState(null);

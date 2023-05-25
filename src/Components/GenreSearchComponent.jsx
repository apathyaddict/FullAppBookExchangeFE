import React from "react";

const GenreSearchComponent = ({
  ischeckedSearch,
  setSelectedGenre,
  selectedGenre,
}) => {
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
  };

  return ( 
    <div>
      <>
        <span className="search-type">search by genre:</span> 
        <select value={selectedGenre} onChange={handleGenreChange}>
          <option disabled>Select a genre</option>
          <option value="">All</option>
          <option value="Poetry">Poetry</option>
          <option value="Fiction">Fiction</option>
          <option value="Children">Children's</option>
          <option value="Historical fiction">Historical Fiction</option>
          <option value="Non-fiction">Non-fiction</option>
        </select>
      </>
    </div>
  );
};

export default GenreSearchComponent;

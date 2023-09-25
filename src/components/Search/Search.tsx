import React from "react";

const Search: React.FC = (inp) => {
  return (
    <>
      <div>
        <input
          type="text"
          style={{ maxWidth: "100%" }}
          placeholder="Search"
          name="search"
        />
      </div>
    </>
  );
};

export default Search;

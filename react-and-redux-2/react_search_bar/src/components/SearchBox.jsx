import React from "react";

const SearchBox = ({ searchTerm, onSearchChange }) => {
  return (
    <input
      type="text"
      placeholder="Search players..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  );
};

export { SearchBox };
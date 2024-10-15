import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function SearchBar({ searchQuery, handleSearchChange, handleSearchSubmit, searchMethod }) {
  return (
    <>
      <Form.Group controlId="search" className="mb-3">
        <Form.Control
          type="text"
          placeholder={searchMethod}
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form.Group>
      <Button onClick={handleSearchSubmit} disabled={!searchQuery}>
        Search
      </Button>
    </>
  );
}

export default SearchBar;

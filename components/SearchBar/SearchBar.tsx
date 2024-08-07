"use client";

const SearchBar = () => {
  const handleSubmit = () => {};

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mt-12 ">
      <input
        type={"text"}
        className={"searchbar-input"}
        placeholder={"Enter Product Link"}
      />

      <button type={"submit"} className="searchbar-btn">
        {"Search"}
      </button>
    </form>
  );
};

export default SearchBar;

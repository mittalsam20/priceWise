"use client";

import { ChangeEvent, FormEvent, useState } from "react";

const getIsLinkValid = ({ url }: { url: string }) => {
  try {
    const parsedUrl = new URL(url);
    const hostName = parsedUrl.hostname;
    const isAmazonLink =
      hostName.includes("amazon.com") ||
      hostName.includes("amazon.") ||
      hostName.endsWith("amazon");

    if (isAmazonLink) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
  return false;
};

const SearchBar = () => {
  const [searchPrompt, setSearchPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const isLinkValid = getIsLinkValid({ url: searchPrompt });
    if (!isLinkValid) return alert("Please provide a valid Amazon link");

    try {
      setIsLoading(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchBar = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchPrompt(value);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mt-12 ">
      <input
        type={"text"}
        value={searchPrompt}
        onChange={handleSearchBar}
        className={"searchbar-input"}
        placeholder={"Enter Product Link"}
      />

      <button
        type={"submit"}
        className={"searchbar-btn"}
        disabled={searchPrompt === ""}
      >
        {isLoading ? "Searching" : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;

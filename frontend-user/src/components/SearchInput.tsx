import React, { ChangeEvent } from "react";

type SearchInputProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({
  searchValue,
  setSearchValue,
}) => {
  return (
    <input
      type="text"
      className="input input-md input-bordered rounded-none max-sm:w-3/4 md:w-96 py-1.5 px-3 md:ml-1.5"
      value={searchValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setSearchValue(e.target.value)
      }
      placeholder="Search by last name"
      autoFocus
    />
  );
};

export default SearchInput;

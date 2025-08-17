import React, { ChangeEvent } from "react";

type SearchInputProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  keyword: string;
  resetPageNumber: () => void;
  resetSuccessMessage: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchValue,
  setSearchValue,
  keyword,
  resetPageNumber,
  resetSuccessMessage,
}) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    resetSuccessMessage();
    resetPageNumber();
    setSearchValue(event.target.value);
  };
  return (
    <input
      type="text"
      className="input input-sm input-bordered rounded-none max-sm:w-3/4 md:w-96 py-1.5 px-3"
      value={searchValue}
      onChange={handleOnChange}
      placeholder={`Search by ${keyword}`}
      autoFocus
    />
  );
};

export default SearchInput;

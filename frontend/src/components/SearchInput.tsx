import React, { ChangeEvent } from "react";

interface SearchInputProps {
  searchValue: string;
  setSearchValue: (value: string) => void;
  keyword: string;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  resetSuccessMessage: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchValue,
  setSearchValue,
  keyword,
  currentPage,
  setCurrentPage,
  resetSuccessMessage,
}) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (currentPage !== 1) setCurrentPage(1);
    resetSuccessMessage();
    setSearchValue(event.target.value);
  };
  return (
    <input
      type="text"
      className="input input-sm input-bordered rounded-none w-96 py-1.5 px-3 mx-1.5"
      value={searchValue}
      onChange={handleOnChange}
      placeholder={`Search by ${keyword}`}
      autoFocus
    />
  );
};

export default SearchInput;

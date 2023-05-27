import React, { useState } from 'react';
import {
  SearchButton,
  Searchbar,
  SearchForm,
  SearchFormInput,
} from './Searchbar.styled';
import { VscSearch } from 'react-icons/vsc';
import PropTypes from 'prop-types';

const SearchBar = ({ onSubmit }) => {
  const [searchText, setSearchText] = useState('');

  function clearForm() {
    setSearchText('');
  }
  const onChangeInput = e => {
    setSearchText(e.target.value);
  };
  const onSubmitSearch = e => {
    e.preventDefault();
    if (searchText.trim() === '') {
      clearForm();
      return;
    }
    onSubmit(searchText.trim());
    clearForm();
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={onSubmitSearch}>
        <SearchFormInput
          onChange={onChangeInput}
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchText}
        />
        <SearchButton type="submit">
          <span>
            <VscSearch />
          </span>
        </SearchButton>
      </SearchForm>
    </Searchbar>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  searchText: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

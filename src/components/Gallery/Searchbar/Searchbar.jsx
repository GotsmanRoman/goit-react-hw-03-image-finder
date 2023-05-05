import { React } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
} from './Searchbar.module';

const Searchbar = ({ onSubmit }) => {
  return (
    <Header>
      <SearchForm onSubmit={onSubmit()}>
        <SearchFormButton type="submit">
          <SearchFormButtonLabel></SearchFormButtonLabel>
          <AiOutlineSearch />
        </SearchFormButton>

        <SearchFormInput
          name="search"
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </Header>
  );
};

export { Searchbar };

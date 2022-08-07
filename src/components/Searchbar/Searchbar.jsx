import { Component } from 'react';
import styled from 'styled-components';
import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
// import { toast } from 'react-toastify';
// import icon from '../../icon/search.svg';

class Searchbar extends Component {
  state = {
    query: '',
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleQueryChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    // if (this.state.query.trim() === '') {
    //   toast.warn('Nothing to search');
    //   return;
    // }

    this.props.onSubmit(this.state.query);
    this.setState({ query: '' });
  };

  render() {
    return (
      <StylerdSearchbar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <BsSearch size={20} />

            {/* <BsSearch size={20} /> */}
          </SearchFormButton>

          <SearchFormInput
            onChange={this.handleQueryChange}
            value={this.state.query}
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </StylerdSearchbar>
    );
  }
}

// --------Styles-------

const StylerdSearchbar = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding-right: 24px;
  padding-left: 24px;
  padding-top: 12px;
  padding-bottom: 12px;
  color: #fff;
  background-color: #3f51b5;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2),
    0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12);
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
`;

const SearchFormButton = styled.button`
  display: inline-block;
  width: 48px;
  height: 48px;
  border: 0;
  /* background-image: url('https://image.flaticon.com/icons/svg/149/149852.svg'); */
  /* background-image: url('../../icon/search.svg'); */
  background-size: 40%;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 1;
    color: #14880c;
    /* size: 30; */
  }
`;

const SearchFormInput = styled.input`
  display: inline-block;
  width: 100%;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;

  &::placeholder {
    font: inherit;
    font-size: 18px;
  }
`;

export default Searchbar;

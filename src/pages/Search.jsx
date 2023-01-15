import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    disabled: true,
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    const minLength = 2;
    if (value.length >= minLength) {
      this.setState({
        disabled: false,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  render() {
    const { disabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <input
          type="text"
          data-testid="search-artist-input"
          onChange={ this.onInputChange }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ disabled }
        >
          Pesquisar
        </button>
      </div>
    );
  }
}

export default Search;

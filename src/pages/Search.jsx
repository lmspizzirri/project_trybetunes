import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';

class Search extends React.Component {
  state = {
    disabled: true,
    searchName: undefined,
    name: '',
    loading: false,
    albumPrint: [''],
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { searchName } = this.state;
    this.setState({
      name: searchName,
      loading: true,
    });
    const albums = await searchAlbumsAPI(searchName);
    this.setState({
      searchName: '',
      loading: false,
      albumPrint: albums,
    });
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    const minLength = 2;
    if (value.length >= minLength) {
      this.setState({
        disabled: false,
        searchName: value,
      });
    } else {
      this.setState({
        disabled: true,
      });
    }
  };

  render() {
    const { disabled, searchName, albumPrint, loading, name } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <h1>Search</h1>
        <input
          name="searchName"
          type="text"
          data-testid="search-artist-input"
          onChange={ this.onInputChange }
          value={ searchName }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          disabled={ disabled }
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        { loading ? <Loading /> : (
          <>
            <p>{ `Resultado de álbuns de: ${name}` }</p>
            { albumPrint.length === 0 ? 'Nenhum álbum foi encontrado' : ''}
            { albumPrint.map((element) => (
              <Link
                key={ element.collectionId }
                data-testid={ `link-to-album-${element.collectionId}` }
                to={ `/album/${element.collectionId}` }
              >
                <img src={ element.artworkUrl100 } alt={ element.collectionName } />
                <h3>{ element.collectionName }</h3>
                <h4>{ element.artistName }</h4>
              </Link>
            ))}
          </>
        )}
      </div>
    );
  }
}

export default Search;

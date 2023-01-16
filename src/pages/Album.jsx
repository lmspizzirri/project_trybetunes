import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    name: '',
    album: '',
    albumList: '',
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);
    this.setState({
      name: data[0].artistName,
      album: data[0].collectionName,
      albumList: data,
    });
  }

  render() {
    const { name, album, albumList } = this.state;
    return (
      <>
        <div data-testid="page-album">
          { this.favoriteSongs }
          <Header />
          <h1>Album</h1>
          <p data-testid="artist-name">{ name }</p>
          <p data-testid="album-name">{ album }</p>
        </div>
        <div>
          {Object.values(albumList).filter((element) => element.trackId)
            .map((element) => (
              <MusicCard
                key={ element.trackId }
                { ...element }
              />
            ))}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.objectOf(
    PropTypes.string,
  ),
}.isRequired;

export default Album;

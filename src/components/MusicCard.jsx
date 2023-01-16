import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  state = {
    loading: false,
    check: false,
  };

  async componentDidMount() {
    this.favoriteSongs();
  }

  handleChange = ({ target: { checked } }) => {
    this.setState({
      loading: true,
      check: checked,
    }, async () => {
      await addSong(checked);
      this.setState({
        loading: false,
      });
    });
  };

  favoriteSongs = async () => {
    const { trackName } = this.props;
    const favorite = await getFavoriteSongs();
    this.setState({
      check: favorite.some((element) => element.trackName === trackName),
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { check, loading } = this.state;
    return (
      <div>
        { loading ? <Loading /> : (
          <div>
            { this.favoriteSongs}
            <p>{ trackName }</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId }>
              <input
                type="checkbox"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleChange }
                checked={ check }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;

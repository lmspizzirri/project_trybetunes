import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  state = {
    user: '',
    loading: true,
  };

  async componentDidMount() {
    const user = await getUser();
    this.setState({
      user: user.name,
      loading: false,
    });
  }

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <Loading /> : (
          <>
            <p data-testid="header-user-name">{ user }</p>
            <Link data-testid="link-to-search" to="/search">Search</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Favorites</Link>
            <Link data-testid="link-to-profile" to="/profile">Profile</Link>
          </>
        )}
      </header>
    );
  }
}

export default Header;

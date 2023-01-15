import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import Link from 'react-router-dom'

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
            <Link data-test-id="link-to-search" to="/pages/Search">Search</Link>
          </>
        )}
      </header>
    );
  }
}

export default Header;

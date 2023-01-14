import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends React.Component {
  state = {
    name: '',
    disabled: true,
    login: false,
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { name } = this.state;
    const { history } = this.props;
    this.setState({
      login: true,
    });
    await createUser({ name });
    history.push('./search');
  };

  onInputChange = ({ target }) => {
    const { value } = target;
    this.setState({
      name: value,
    }, () => {
      const minLength = 3;
      if (value.length >= minLength) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: true,
        });
      }
    });
  };

  render() {
    const { disabled, login } = this.state;

    return (
      <div data-testid="page-login">
        <h1>Login</h1>
        { login ? <Loading /> : (
          <>
            <input
              id="input-login"
              name="login"
              type="text"
              data-testid="login-name-input"
              onChange={ this.onInputChange }
            />
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ disabled }
              onClick={ this.handleClick }
            >
              Entrar
            </button>
          </>
        )}
      </div>
    );
  }
}

export default Login;

Login.propTypes = {
  history: PropTypes.func,
}.isRequired;

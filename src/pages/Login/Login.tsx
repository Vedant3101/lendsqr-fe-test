import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import './Login.scss';

export const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/dashboard');
  };

  return (
    <main className="login-page">
      <section className="login-page__left" aria-label="Lendsqr product illustration">
        <img alt="lendsqr" className="login-page__logo login-page__logo--hero" src={logo} />
        <div className="login-page__illustration">
          <div className="login-page__screen" />
        </div>
      </section>
      <section className="login-page__right">
        <div className="login-page__form-wrap">
          <img alt="lendsqr" className="login-page__logo login-page__logo--form" src={logo} />
          <h1>Welcome!</h1>
          <p>Enter details to login.</p>
          <form onSubmit={handleSubmit}>
            <label className="login-page__field">
              <span className="sr-only">Email</span>
              <input required placeholder="Email" type="email" />
            </label>
            <label className="login-page__field">
              <span className="sr-only">Password</span>
              <input required placeholder="Password" type={showPassword ? 'text' : 'password'} />
              <button type="button" onClick={() => setShowPassword(value => !value)}>
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </label>
            <button className="login-page__forgot" type="button">
              Forgot password?
            </button>
            <button className="primary-button login-page__submit" type="submit">
              Log In
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

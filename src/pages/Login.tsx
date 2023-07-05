import { ChangeEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState, userState } from '../atoms';
import { postLogin } from '../apis';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const setLogined = useSetRecoilState(loginState);
  const setUserInfo = useSetRecoilState(userState);

  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    // TODO : 유효성 검사 + 로그인 관련 예외 처리
    event.preventDefault();
    const { user } = await postLogin({ email, password });
    localStorage.setItem('token', user.token);
    setLogined(true);
    setUserInfo(user);
    navigate('/');
  };

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign in</h1>
            <p className="text-xs-center">
              <Link to="/">Need an account?</Link>
            </p>

            <ul className="error-messages">
              <li>That email is already taken</li>
            </ul>

            <form onSubmit={handleSubmit}>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </fieldset>
              <fieldset className="form-group">
                <input
                  className="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </fieldset>
              <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

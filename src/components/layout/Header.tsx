import { Link, NavLink } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { loginState, userState } from '../../atoms';

function Header() {
  const userInfo = useRecoilValue(userState);
  const logined = useRecoilValue(loginState);
  const activeTabClass = ({ isActive }: { isActive: boolean }) =>
    (isActive ? 'active' : '').concat(' ', 'nav-link');

  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>
        {logined ? (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink className={activeTabClass} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={activeTabClass} to="/editor">
                {' '}
                <i className="ion-compose" />
                &nbsp;New Article{' '}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={activeTabClass} to="/settings">
                {' '}
                <i className="ion-gear-a" />
                &nbsp;Settings{' '}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={activeTabClass} to={`/@${userInfo.username}`}>
                {' '}
                <img className="user-pic" src={userInfo.image} alt="user-img" />
                &nbsp;{userInfo.username}{' '}
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className="nav navbar-nav pull-xs-right">
            <li className="nav-item">
              <NavLink className={activeTabClass} to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={activeTabClass} to="/login">
                Sign in
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className={activeTabClass} to="/register">
                Sign up
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Header;

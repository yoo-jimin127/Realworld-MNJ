import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <Link className="navbar-brand" to="/">
          conduit
        </Link>

        <ul className="nav navbar-nav pull-xs-right">
          <li className="nav-item">
            <Link className="nav-link active" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/editor">
              {' '}
              <i className="ion-compose" />
              &nbsp;New Article{' '}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/settings">
              {' '}
              <i className="ion-gear-a" />
              &nbsp;Settings{' '}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Sign in
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;

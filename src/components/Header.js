import { Outlet, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Header() {
  return (
    <div>
      <header className="header">
        <div className="logo-div">
          <img src={logo} alt="logo" className="logo" />
          <h1>Space Travelers Hub</h1>
        </div>
        <div>
          <nav>
            <NavLink className="link-item1" to="/">Rockets</NavLink>
            <NavLink className="link-item2" to="missions">Missions</NavLink>
            <NavLink className="link-item3" to="profile">Profile</NavLink>
          </nav>
        </div>
      </header>
      <main>
        <Outlet />
      </main>

    </div>
  );
}

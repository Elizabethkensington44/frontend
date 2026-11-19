import { NavLink } from "react-router";

import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const { token, logout } = useAuth();

  return (
    <header id="navbar">
      <NavLink id="brand" to="/">
        Dance Studio
      </NavLink>
      <nav>
        <NavLink to="/classes">Classes</NavLink>
        <NavLink to="/teachers">Teachers</NavLink>
        {token && <NavLink to="/account">Account</NavLink>}
        {token ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <NavLink to="/login">Log in</NavLink>
        )}
      </nav>
    </header>
  );
}

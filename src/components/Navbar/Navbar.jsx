import { NavLink } from "react-router-dom";
import { FaBrain } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Simulator", path: "/simulator" },
    { name: "History", path: "/history" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <div className="logo">
          <div className="logo-icon">
            <FaBrain />
          </div>

          <div>
            <h2>FutureSim AI</h2>
            <span>AI Decision Simulator</span>
          </div>
        </div>

        <ul className="nav-links">
          {links.map((item) => (
            <li key={item.name}>
              <NavLink to={item.path}>{item.name}</NavLink>
            </li>
          ))}
        </ul>

        <button className="nav-btn">Start Simulation</button>
      </nav>
    </header>
  );
}

export default Navbar;

import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import logo from '../assets/logo.png'; // Update with your actual logo path

const Navbar = ({ user, handleLogout }) => {
  const buttonClass =
    "px-4 py-2 rounded-lg hover:bg-teal-700 transition"; // Common button class

  return (
    <header className="flex justify-between items-center bg-background p-4 text-primary shadow-md">
      {/* Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-12 h-12 mr-2" />
        <h1 className="text-xl font-semibold text-primary">HomeStock</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex space-x-6">
        <Link to="/" className="hover:text-accent transition">Home</Link>
        <Link to="/inventory" className="hover:text-accent transition">Inventory</Link>
        <Link to="/shopping-list" className="hover:text-accent transition">Shopping List</Link>
      </nav>

      {/* User & Logout */}
      {user ? (
        <div className="flex items-center space-x-4">
          <span className="text-primary">{user.email}</span>
          <button
            onClick={handleLogout}
            className="flex items-center hover:text-accent transition"
          >
            <LogoutIcon className="mr-1" /> Logout
          </button>
        </div>
      ) : (
        <div className="flex space-x-4"> {/* This will create space between the buttons */}
          <Link
            to="/login"
            className={`bg-accent text-background ${buttonClass}`}
          >
            Login
          </Link>
          <Link
            to="/signup"
            className={`bg-background text-accent ${buttonClass}`}
          >
            Signup
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;



import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo.jpeg";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InventoryIcon from "@mui/icons-material/Inventory";
import WarningIcon from "@mui/icons-material/Warning";
import StarIcon from "@mui/icons-material/Star";
import StoreIcon from "@mui/icons-material/Store";
import InsightsIcon from "@mui/icons-material/Insights";
import FeedbackIcon from "@mui/icons-material/Feedback";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const navItems = [
  { path: "/dashboard", label: "Dashboard", icon: <DashboardIcon /> },
  { path: "/inventory", label: "Inventory", icon: <InventoryIcon /> },
  { path: "/shopping-list", label: "Shopping List", icon: <ShoppingCartIcon /> },
  { path: "/feedback", label: "Feedback", icon: <FeedbackIcon /> },
  { path: "/wastage", label: "Wastage Tracker", icon: <WarningIcon /> },
  { path: "/brand-suggestions", label: "Brand Suggestions", icon: <StarIcon /> },
  { path: "/nearby-stores", label: "Nearby Stores", icon: <StoreIcon /> },
  { path: "/shopping-insights", label: "Shopping Insights", icon: <InsightsIcon /> },
];

const MainNavbar = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 w-60 bg-background h-full text-primary px-4 font-sans overflow-y-auto shadow-md flex flex-col justify-between">
      {/* Logo Section */}
      <div>
        <div className="flex justify-center items-center ">
          <img src={logo} alt="HomeStock Logo" width="160px" height="50px" />
        </div>

        {/* Navigation Links */}
        <nav className="text-sm border-t-2 pt-4 border-accent">
          {navItems.map(({ path, label, icon }) => (
            <Link key={path} to={path}>
              <div
                className={`flex items-center my-3 px-3 py-2 rounded-md transition-all ${
                  location.pathname === path ? "bg-accent text-white" : "hover:bg-accent hover:text-white"
                }`}
              >
                {icon}
                <h1 className="pl-2">{label}</h1>
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout Button */}
      <div className="mt-auto pb-4">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-3 py-1 rounded-md transition-all  text-white "
        >
          <ExitToAppIcon />
          <span className="pl-2">Logout</span>
        </button>
      </div>
    </header>
  );
};

export default MainNavbar;

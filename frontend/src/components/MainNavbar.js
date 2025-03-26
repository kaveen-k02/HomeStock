import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/Logo.jpg';

import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import InventoryIcon from '@mui/icons-material/Inventory';
import HistoryIcon from '@mui/icons-material/History';
import FeedbackIcon from '@mui/icons-material/Feedback';
import InsightsIcon from '@mui/icons-material/Insights';
import StoreIcon from '@mui/icons-material/Store';
import StarIcon from '@mui/icons-material/Star';
import WarningIcon from '@mui/icons-material/Warning';

const MainNavbar = ({ setFilter }) => {
  const [activeLink, setActiveLink] = useState('/'); // Default active link is the homepage

  const handleClick = (link) => {
    setActiveLink(link); // Set clicked link as active
  };

  return (
    <header>
      <div className="fixed flex flex-col top-0 left-0 w-60 bg-background h-full text-primary px-4 py-2 font-sans overflow-y-auto">
        <div className="flex justify-center items-center py-4">
          <img src={logo} alt="HomeStock Logo" width="50px" height="50px" />
        </div>
        <div className="text-sm border-t-2 pt-4 border-accent">
          <Link to="/" onClick={() => handleClick('/')}>
            <div
              className={`flex items-center my-3 px-3 py-2 rounded-md ${activeLink === '/' ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <HomeIcon />
              <h1 className="pl-2">Home</h1>
            </div>
          </Link>
          <Link to="/inventory" onClick={() => handleClick('/inventory')}>
            <div
              className={`flex items-center my-3 px-3 py-2 rounded-md ${activeLink === '/inventory' ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <InventoryIcon />
              <h1 className="pl-2">Inventory</h1>
            </div>
          </Link>
          <Link to="/shopping-list" onClick={() => handleClick('/shopping-list')}>
            <div
              className={`flex items-center my-3 px-3 py-2 rounded-md ${activeLink === '/shopping-list' ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <ShoppingCartIcon />
              <h1 className="pl-2">Shopping List</h1>
            </div>
          </Link>
          <Link to="/usage-history" onClick={() => handleClick('/usage-history')}>
            <div
              className={`flex items-center my-3 px-3 py-2 rounded-md ${activeLink === '/usage-history' ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <HistoryIcon />
              <h1 className="pl-2">Usage History</h1>
            </div>
          </Link>
          <Link to="/feedback" onClick={() => handleClick('/feedback')}>
            <div
              className={`flex items-center my-3 px-3 py-2 rounded-md ${activeLink === '/feedback' ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <FeedbackIcon />
              <h1 className="pl-2">Feedback</h1>
            </div>
          </Link>
          <Link to="/wastage-tracker" onClick={() => handleClick('/wastage-tracker')}>
            <div
              className={`flex items-center my-3 px-3 py-2 rounded-md ${activeLink === '/wastage-tracker' ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <WarningIcon />
              <h1 className="pl-2">Wastage Tracker</h1>
            </div>
          </Link>
          <Link to="/brand-suggestions" onClick={() => handleClick('/brand-suggestions')}>
            <div
              className={`flex items-center my-3 px-3 py-2 rounded-md ${activeLink === '/brand-suggestions' ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <StarIcon />
              <h1 className="pl-2">Brand Suggestions</h1>
            </div>
          </Link>
          <Link to="/nearby-stores" onClick={() => handleClick('/nearby-stores')}>
            <div
              className={`flex items-center my-3 px-3 py-2 rounded-md ${activeLink === '/nearby-stores' ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <StoreIcon />
              <h1 className="pl-2">Nearby Stores</h1>
            </div>
          </Link>
          <Link to="/shopping-insights" onClick={() => handleClick('/shopping-insights')}>
            <div
              className={`flex items-center my-3 px-3 py-2 rounded-md ${activeLink === '/shopping-insights' ? 'bg-accent' : 'hover:bg-accent'}`}
            >
              <InsightsIcon />
              <h1 className="pl-2">Shopping Insights</h1>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default MainNavbar;


import React from 'react';
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
    return (
        <header>
            <div className="fixed flex flex-col top-0 left-0 w-60 bg-background h-full text-primary px-4 py-2 font-sans overflow-y-auto">
                <div className="flex justify-center items-center py-4">
                    <img src={logo} alt="HomeStock Logo" width="50px" height="50px" />
                </div>
                <div className="text-sm border-t-2 pt-4 border-accent">
                    <Link to="/">
                        <div className='flex items-center my-3 hover:bg-accent px-3 py-2 rounded-md'>
                            <HomeIcon />
                            <h1 className='pl-2'>Home</h1>
                        </div>
                    </Link>
                    <Link to="/inventory">
                        <div className='flex items-center my-3 hover:bg-accent px-3 py-2 rounded-md'>
                            <InventoryIcon />
                            <h1 className='pl-2'>Inventory</h1>
                        </div>
                    </Link>
                    <Link to="/shopping-list">
                        <div className='flex items-center my-3 hover:bg-accent px-3 py-2 rounded-md'>
                            <ShoppingCartIcon />
                            <h1 className='pl-2'>Shopping List</h1>
                        </div>
                    </Link>
                    <Link to="/usage-history">
                        <div className='flex items-center my-3 hover:bg-accent px-3 py-2 rounded-md'>
                            <HistoryIcon />
                            <h1 className='pl-2'>Usage History</h1>
                        </div>
                    </Link>
                    <Link to="/feedback">
                        <div className='flex items-center my-3 hover:bg-accent px-3 py-2 rounded-md'>
                            <FeedbackIcon />
                            <h1 className='pl-2'>Feedback</h1>
                        </div>
                    </Link>
                    <Link to="/wastage-tracker">
                        <div className='flex items-center my-3 hover:bg-accent px-3 py-2 rounded-md'>
                            <WarningIcon />
                            <h1 className='pl-2'>Wastage Tracker</h1>
                        </div>
                    </Link>
                    <Link to="/brand-suggestions">
                        <div className='flex items-center my-3 hover:bg-accent px-3 py-2 rounded-md'>
                            <StarIcon />
                            <h1 className='pl-2'>Brand Suggestions</h1>
                        </div>
                    </Link>
                    <Link to="/nearby-stores">
                        <div className='flex items-center my-3 hover:bg-accent px-3 py-2 rounded-md'>
                            <StoreIcon />
                            <h1 className='pl-2'>Nearby Stores</h1>
                        </div>
                    </Link>
                    <Link to="/shopping-insights">
                        <div className='flex items-center my-3 hover:bg-accent px-3 py-2 rounded-md'>
                            <InsightsIcon />
                            <h1 className='pl-2'>Shopping Insights</h1>
                        </div>
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default MainNavbar;

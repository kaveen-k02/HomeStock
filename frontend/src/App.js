import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeStockLanding from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MainNavbar from "./components/MainNavbar";
//import BrandSuggestions from "./pages/BrandSuggestions";
import ShoppingListDisplay from "./pages/ShoppingListDisplay";


function App() {

  const [filter, setFilter] = useState("");

  return (
    <Router>
      <div className="App">
        {/* Main Navbar (fixed at the top) */}
        <MainNavbar />
        
        {/* Routes */}
        <div className="ml-60"> {/* Apply margin-left to move content right */}
          <Routes>
            <Route path="/" element={<HomeStockLanding />} />
            <Route
              path="/*"
              element={
                <>
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard filter={filter} />} />
                    <Route path="/shopping-list" element={<ShoppingListDisplay />} />

                    
                  </Routes>
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

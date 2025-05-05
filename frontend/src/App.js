import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomeStockLanding from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MainNavbar from "./components/MainNavbar";
import ShoppingListDisplay from "./pages/ShoppingListDisplay";
import NearbyStores from "./pages/NearbyStores";
import BrandSuggestionsPage from "./pages/BrandSuggestionsPage";
import InventoryManagement from "./pages/InventoryManagement";
import WastagePage from "./pages/WastagePage";
import ShoppingInsights from "./pages/ShoppingInsights";

function AppContent() {
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/login", "/signup"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <div className="App">
      {shouldShowNavbar && <MainNavbar />}
      <div className={shouldShowNavbar ? "ml-60" : ""}>
        <Routes>
          <Route path="/" element={<HomeStockLanding />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shopping-list" element={<ShoppingListDisplay />} />
          <Route path="/nearby-stores" element={<NearbyStores />} />
          <Route path="/brand-suggestions" element={<BrandSuggestionsPage />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/wastage" element={<WastagePage />} />
          <Route path="/shopping-insights" element={<ShoppingInsights />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

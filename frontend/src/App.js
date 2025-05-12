import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "leaflet/dist/leaflet.css";



import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import HomeStockLanding from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import MainNavbar from "./components/MainNavbar";
import ShoppingListDisplay from "./pages/ShoppingListDisplay";
import BrandSuggestionsPage from "./pages/BrandSuggestionsPage";
import InventoryManagement from "./pages/InventoryManagement";
import WastagePage from "./pages/WastagePage";
import ShoppingInsights from "./pages/ShoppingInsights";
import FeedbackForm from "./components/FeedbackForm";
import FeedbackList from "./components/FeedbackList";
import UserFeedback from "./components/UserFeedback";
import NearbyStoresPage from "./pages/NearbyStoresPage";

function AppContent() {
  const location = useLocation();

  // List of routes where MainNavbar should NOT be shown
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
          <Route path="/brand-suggestions" element={<BrandSuggestionsPage />} />
          <Route path="/nearby-stores" element={<NearbyStoresPage />} />
          <Route path="/inventory" element={<InventoryManagement />} />
          <Route path="/wastage" element={<WastagePage />} />
          <Route path="/shopping-insights" element={<ShoppingInsights />} />
          <Route path="/feedback" element={<FeedbackList />} />
          <Route path="/feedback/new" element={<FeedbackForm />} />
          <Route path="/feedback/user/:userId" element={<UserFeedback />} />
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

import "./Header.module.css";

import React from "react";

const Header = ({ isAuthenticated, setIsAuthenticated }) => {
  // const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-left">
        {/* <img src={logo} alt="Evangadi Logo" onClick={() => navigate("/")} /> */}
      </div>
      <nav className="header-right">
        <a to="/">Home</a>
        <a to="/how-it-works">How It Works</a>

        {!isAuthenticated ? (
          <>
            <a to="/login">Sign In</a>
            <a to="/register">Join Now</a>
          </>
        ) : (
          <button onClick={handleLogout}>Logout</button>
        )}
      </nav>
    </header>
  );
};

export default Header;

import { NavLink, Outlet, useNavigate } from "react-router-dom";

const SiteLayout = () => {
  const navigate = useNavigate();

  //  LOGOUT FUNCTION (INSIDE COMPONENT)
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const token = localStorage.getItem("token");

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="container header-row">

          {/* BRAND */}
          <div className="brand">
            <span className="brand-badge">DL</span>
            <div>
              <h1>Daily Life Organizer</h1>
              <p>Plan your day, protect your mood</p>
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="main-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/tasks">Tasks</NavLink>
            <NavLink to="/mood">Mood</NavLink>
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/reports">Reports</NavLink>

            {/* AUTH BUTTONS */}
            {!token ? (
              <>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
              </>
            ) : (
              <button onClick={logout} className="logout-btn">
                Logout
              </button>
            )}
          </nav>

        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="page-main">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="container footer-row">
          <p>Daily Life Organizer with Mood Tracking</p>
          <p>Build habits, stay productive, stay balanced.</p>
        </div>
      </footer>
    </div>
  );
};

export default SiteLayout;
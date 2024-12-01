import "../styles/home-page.scss";
import useAuthRedirect from "../utils/useAuthRedirect";

const HomePage = () => {
  useAuthRedirect();
  const language = "en";
  return (
    <div className="home-page">
      {/* Hero Background */}
      <div className="hero-background"></div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top">
        <div className="container">
          <a className="navbar-brand" href="/">
            <img
              src="ass.png"
              width="50"
              height="50"
              alt="Stacey Gymnastique"
            />
            STACEY GYMNASTIQUE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/classes">
                  Classes
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/schedule">
                  Schedule
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="languageDropdown"
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-globe me-1"></i>
                  {language === "en" ? "English" : "Français"}
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <a className="dropdown-item" href="?lang=en">
                      English
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="?lang=fr">
                      Français
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Floating Gymnastics Elements */}
      <div className="gym-element element-1"></div>
      <div className="gym-element element-2"></div>
      <div className="gym-element element-3"></div>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10 hero-content">
              <h1 className="mb-4">Welcome to Stacey Gymnastique</h1>
              <p className="lead">
                Elevate Your Potential, Transform Your Body. 
                Join our world-class gymnastics training and unlock 
                your inner athlete with expert coaching and state-of-the-art facilities.
              </p>
              <div className="mt-5 d-flex gap-3 justify-content-center">
                <a href="/register" className="btn btn-primary">
                  <i className="fas fa-user-plus me-2"></i> Join Now
                </a>
                <a href="/classes" className="btn btn-secondary">
                  <i className="fas fa-dumbbell me-2"></i> View Classes
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container text-center">
          <p className="m-0">
            © 2024 Stacey Gymnastique. All Rights Reserved.
          </p>
          <div className="social-links mt-3">
            <a href="#" className="mx-2"><i className="fab fa-facebook"></i></a>
            <a href="#" className="mx-2"><i className="fab fa-instagram"></i></a>
            <a href="#" className="mx-2"><i className="fab fa-twitter"></i></a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
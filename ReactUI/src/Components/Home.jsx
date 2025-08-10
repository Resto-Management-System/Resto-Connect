import React from "react";
import "../CSS/home.css";

const Home = () => {
  return (
    <div className="home-container">

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="main-title">Welcome to RestoConnect</h1>
          <p className="subtitle">
            Bridging Restaurants & Customers with Ease and Style
          </p>
          <div className="cta-buttons">
            <a href="/register" className="cta-button primary">Register as Owner</a>
            <a href="#join-us" className="cta-button secondary">Learn More</a>
          </div>
        </div>
      </section>

      {/* Info Panels */}
      <section className="info-panels">

        {/* Customer Section */}
        <div className="panel customer-panel">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Happy Customers"
            className="panel-image"
          />
          <div className="panel-content">
            <h2 className="panel-title">For Customers</h2>
            <p className="panel-text">
              Discover new restaurants, browse menus, and enjoy delicious meals from the comfort of your home. Our mobile app makes ordering fast and easy.
            </p>
            <a href="https://play.google.com/store" className="panel-cta-button">
              Download the App
            </a>
          </div>
        </div>

        {/* Owner Section */}
        <div className="panel owner-panel">
          <img
            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5"
            alt="Restaurant Owners"
            className="panel-image"
          />
          <div className="panel-content">
            <h2 className="panel-title">For Restaurant Owners</h2>
            <p className="panel-text">
              Manage your restaurant effortlessly. From menu updates to customer orders — all in one place, accessible via our powerful web platform.
            </p>
            <a href="/register" className="panel-cta-button">
              Register Your Restaurant
            </a>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section id="join-us" className="join-us-section">
        <div className="join-us-content">
          <h2 className="join-us-title">Join the RestoConnect Family Today</h2>
          <p className="join-us-text">
            Whether you’re a food lover or a restaurant owner, we’ve got something special for you. Let’s grow together!
          </p>
          
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        &copy; {new Date().getFullYear()} RestoConnect. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;

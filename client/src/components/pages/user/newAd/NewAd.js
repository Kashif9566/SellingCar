import React, { useState } from "react";
import "./NewAd.css";
import SignupModal from "../../../authentication/Signup/SignupModal";
import LoginModal from "../../../authentication/Login/LoginModal";
import { useSelector } from "react-redux";
import Navbar from "../../../nav/Navbar";
import Footer from "../../../footer/Footer";
import { useNavigate } from "react-router-dom";

const NewAd = () => {
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const naviagte = useNavigate();
  const user = useSelector((state) => state.user);

  const isLoggedIn = user && user.isLoggedIn;
  const handlePostAdClick = () => {
    if (isLoggedIn) {
      naviagte("/ad-form");
    } else {
      setShowLoginModal(true);
    }
  };
  const handleLoginClick = () => {
    setShowLoginModal(true);
    setShowSignupModal(false);
  };
  const handleSignupClick = () => {
    setShowSignupModal(true);
    setShowLoginModal(false);
  };
  return (
    <div>
      <Navbar />
      <section className="first-section-sell">
        <h1>Sell Your Car Online in Pakistan Instantly!</h1>
        <div className="card">
          <h2>Post your Ad on Sell My Car</h2>
          <img src="https://wsa2.pakwheels.com/assets/postad-img-58f5eb96777aff56872a2ee71b6475fd.png"></img>
          <p>Post your Ad for Free in 3 Easy Steps</p>
          <p>Get Genuine offers from Verified Buyers</p>
          <p> Sell your car Fast at the Best Price</p>
          <button
            to={"/ad-form"}
            className="btn btn-primary"
            onClick={handlePostAdClick}
          >
            Post an Ad
          </button>
          {showSignupModal && (
            <SignupModal
              onClose={() => setShowSignupModal(false)}
              handleLoginClick={handleLoginClick}
            />
          )}
          {showLoginModal && (
            <LoginModal
              onClose={() => setShowLoginModal(false)}
              handleSignupClick={handleSignupClick}
            />
          )}
        </div>
      </section>
      <div className="row">
        <section className="second-section-sell">
          <h1>Why Sell Your Car On PakWheels?</h1>
          <div className="cards">
            <div className="card">
              <div className="card-body">
                <p>Pakistan’s #1 automotive marketplace</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <p>5 lac+ visitors daily</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <p>3 million+ cars sold</p>
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <p>80% cars sold within 48 hours</p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="third-section-sell">
        <h1>3 Simple Steps To Sell Your Car</h1>
        <div className="steps">
          <div>
            <i className="fas fa-user"></i>
            <h1>Signup</h1>
            <p>Register yourself on SellMyCar.com to post an ad.</p>
          </div>
          <div>
            <i className="fas fa-mobile-alt"></i>
            <h1>Create your ad</h1>
            <p>
              Provide necessary details about your used car and make sure to
              upload clear photos.
            </p>
          </div>
          <div>
            <i className="fas fa-car"></i>
            <h1>Get Instant Offers</h1>
            <p>Relax & get ready for instant offers from genuine buyers.</p>
          </div>
        </div>
      </section>
      <section className="fourth-section-sell">
        <h1>Interesting Tips</h1>
        <div className="cards">
          <div className="card">
            <div className="glowbulb-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <p>
              Get your car repaired and fix any minor defects to increase its
              resale value
            </p>
          </div>
          <div className="card">
            <div className="glowbulb-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <p>
              Set up a reasonable price as it will determine how long it will
              take for your car to sell
            </p>
          </div>
          <div className="card">
            <div className="glowbulb-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <p>
              Beware of unrealistic offers and carry out safe transactions to
              avoid being defrauded
            </p>
          </div>
          <div className="card">
            <div className="glowbulb-icon">
              <i className="fas fa-lightbulb"></i>
            </div>
            <p>Get your car inspected to get premium rates</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NewAd;

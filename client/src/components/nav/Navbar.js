import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Logo from "./Logo.png";
import { clearUser } from "../../redux/slice/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginModal from "../authentication/Login/LoginModal";
import SignupModal from "../authentication/Signup/SignupModal";
import ConfirmationModal from "../modal/ConfirmationModal";
const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    dispatch(clearUser());
    setShowModal(false);
    window.location.reload();
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
    <div className="main-container">
      <nav>
        <a href="/">
          <img className="logo-nav" src={Logo} alt="Logo" />
        </a>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/my-ad">My Ad</a>
          </li>
          {user.isLoggedIn ? (
            <li>
              <a href="#" onClick={() => setShowModal(true)}>
                Logout
              </a>
              <ConfirmationModal
                showModal={showModal}
                handleClose={handleCloseModal}
                handleConfirm={handleLogout}
                title="Are you sure to Logout?"
              />
            </li>
          ) : (
            <li>
              <a href="#" onClick={handleLoginClick}>
                Sign In
              </a>
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
            </li>
          )}
          <Link to={"/post-an-ad"}>
            <button className="btn btn-warning">Post an Ad</button>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;

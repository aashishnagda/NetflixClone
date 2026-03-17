import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.svg";
import bell_icon from "../../assets/bell_icon.svg";
import profile_img from "../../assets/profile_img.png";
import caret_img from "../../assets/caret_icon.svg";

const Navbar = () => {
  const navRef = useRef();  // used to reference the navbar element
  //useRef is used to directly access and manipulate DOM elements without causing re-renders.
  const navigate = useNavigate(); // used to navigate between pages

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {       //checks if the navbar element exists
        if (window.scrollY >= 80) {  //Number of pixels page has been scrolled vertically.
          navRef.current.classList.add("nav-dark"); //adds the dark class if the page is scrolled
        } else {  //removes the dark class if the page is not scrolled
          navRef.current.classList.remove("nav-dark");
        } //  
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll); //removes the event listener when the component unmounts
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token"); //removes the token from the local storage
    localStorage.removeItem("user"); //removes the user from the local storage
    navigate("/login"); //navigates to the login page
  };








  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & popular</li>
          <li>My Lists</li>
          <li>Browse by Languages</li>
        </ul>
      </div>

      <div className="navbar-right">
        <img src={search_icon} alt="" className="icons" />
        <p>Children</p>
        <img src={bell_icon} alt="" className="icons" />

        <div className="navbar-profile">
          <img src={profile_img} alt="" className="profile" />
          <img src={caret_img} alt="" />
          <div className="dropdown">
            <p onClick={handleLogout}>Sign out of Netflix</p>




          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

import React from "react";
import "./Footer.css"; // Custom CSS for styling

const Footer = () => {
  return (
    <footer className="cu-footer">
      <div className="container">
        {/* About Section */}
        <div className="footer-section about">
          <h2>Chandigarh University</h2>
          <p>Leading in academic programs, research, and innovation.</p>
        </div>

        {/* Social Media Links */}
        <div className="footer-section social">
          <h3>Follow Us</h3>
          <ul className="social-icons">
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Chandigarh University. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

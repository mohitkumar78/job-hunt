import React from "react";
import "./Footer.css"; // Custom CSS for styling

const Footer = () => {
  return (
    <footer className="cu-footer">
      <div className="container">
        <div className="footer-content">
          {/* About Section */}
          <div className="footer-section about">
            <h2>Chandigarh University</h2>
            <p>
              Chandigarh University is a leading educational institution known
              for providing high-quality academic programs and a strong emphasis
              on research and innovation.
            </p>
          </div>

          {/* Links Section */}
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/courses">Courses</a>
              </li>
              <li>
                <a href="/admissions">Admissions</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                <a href="/careers">Careers</a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Chandigarh University, Punjab</p>
            <p>Phone: +91 9876543210</p>
            <p>Email: info@cumail.com</p>
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
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
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
      </div>
    </footer>
  );
};

export default Footer;
